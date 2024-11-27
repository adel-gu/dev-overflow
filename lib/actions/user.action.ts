'use server';
import { connectToDatabase } from '../mongoose';
import User from '@/database/user.model';
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from './shared.types';
import { revalidatePath } from 'next/cache';
import Question from '@/database/question.model';

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
    await User.findByIdAndUpdate({ clerkId }, updateData, { new: true });

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
