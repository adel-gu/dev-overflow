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

    const { searchQuery, filter, page = 1, pageSize = 10 } = params;

    const query: FilterQuery<typeof Tag> = searchQuery
      ? {
          $or: [{ name: { $regex: new RegExp(searchQuery, 'i') } }],
        }
      : {};

    let sortOptions = {};

    switch (filter) {
      case 'popular':
        sortOptions = { question: -1 };
        break;
      case 'recent':
        sortOptions = { createdOn: -1 };
        break;
      case 'name':
        sortOptions = { name: 1 };
        break;
      case 'old':
        sortOptions = { name: 1 };
        break;
      default:
        sortOptions = { createdOn: -1 };
        break;
    }

    const skip = (page - 1) * pageSize;

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const totalTags = await Tag.countDocuments(query);

    return { tags, totalPages: Math.ceil(totalTags / pageSize) };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const skip = (page - 1) * pageSize;

    const tag = await Tag.findOne(tagFilter);

    if (!tag) {
      throw new Error('Tag not found');
    }

    const questions = await Question.find({
      tags: tag._id,
      ...(searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {}),
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .populate([
        { path: 'tags', model: Tag },
        { path: 'author', model: User },
      ]);

    const totalQuestions = await Question.countDocuments({
      tags: tag._id,
      ...(searchQuery ? { title: { $regex: searchQuery, $options: 'i' } } : {}),
    });

    return {
      tagTitle: tag.name,
      questions,
      totalPages: Math.ceil(totalQuestions / pageSize),
    };
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
