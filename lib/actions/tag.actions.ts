'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '../mongoose';
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from './shared.types';
import Tag, { ITag } from '@/database/tag.model';
import Question from '@/database/question.model';
import { FilterQuery } from 'mongoose';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error('User not found');

    // Find all interactions for the user and group by tags...

    return [
      { id: '1', name: 'tag1' },
      { id: '2', name: 'tag2' },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = searchQuery
      ? {
          $or: [{ name: { $regex: new RegExp(searchQuery, 'i') } }],
        }
      : {};

    const tags = await Tag.find(query);

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: 'question',
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: 'i' } }
        : {},
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag },
        { path: 'author', model: User },
      ],
    });

    if (!tag) {
      throw new Error('Tag not found');
    }

    const questions = tag.question;

    return { tagTitle: tag.name, questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getHotTags() {
  try {
    connectToDatabase();

    const hotTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: '$question' } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return hotTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
