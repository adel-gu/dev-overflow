'use server';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '../mongoose';
import { FilterQuery } from 'mongoose';
import User from '@/database/user.model';
import Question from '@/database/question.model';
import Tag from '@/database/tag.model';
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from './shared.types';
import Answer from '@/database/answer.model';

export async function getUserById(params: GetUserByIdParams) {
  try {
    await connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    return user;
  } catch (error) {
    console.log('Error fetching a user: ', error);
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const user = await User.create(params);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();

    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error('User not found');
    }

    const userQuestionsIds = await Question.find({ author: user._id }).distinct(
      '_id',
    );

    await Question.deleteMany({ author: user._id });

    const deletedUser = await User.findByIdAndDelete(user._id);

    return deletedUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();

    // TODO: setup filtering, pagination, searchQuery
    // page = 1, pageSize = 1, filter,
    const { searchQuery } = params;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, 'i') } },
        { username: { $regex: new RegExp(searchQuery, 'i') } },
      ];
    }
    const users = await User.find(query).sort({ joinedAt: -1 });

    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    await connectToDatabase();

    const { userId, questionId, hasSaved, path } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (hasSaved) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { saved: questionId } },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { saved: questionId } },
        { new: true },
      );
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    await connectToDatabase();

    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, 'i') } }
      : {};

    const user = await User.findOne({ clerkId }).populate({
      path: 'saved',
      match: query,
      options: {
        sort: { createdAt: -1 },
      },
      populate: [
        { path: 'tags', model: Tag },
        { path: 'author', model: User },
      ],
    });

    if (!user) {
      throw new Error('User not found');
    }

    const savedQuestions = user.saved;

    return { questions: savedQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserInfo(params: GetUserByIdParams) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error('User not found');

    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });

    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserQuestions(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const userQuestions = await Question.find({ author: userId })
      .populate('tags', '_id name')
      .populate('author', '_id clerkId name picture')
      .sort({ views: -1, upvotes: -1 });

    return { totalQuestions, questions: userQuestions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const userAnswers = await Answer.find({ author: userId })
      .populate('question', '_id title')
      .populate('author', '_id clerkId name picture')
      .sort({ upvotes: -1 });

    return { totalAnswers, answers: userAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function name(params:type) {
//   try {
//     connectToDatabase()
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
