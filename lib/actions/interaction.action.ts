'use server';

import mongoose from 'mongoose';
import { ViewQuestionParams } from './shared.types';
import { connectToDatabase } from '../mongoose';
import Question from '@/database/question.model';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    if (!mongoose.connection.readyState) {
      await connectToDatabase();
    }

    const { questionId, userId } = params;

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        question: questionId,
      });

      if (existingInteraction)
        return console.log('User has already viewed question');

      // Update view count for the question
      await Question.findByIdAndUpdate(questionId, {
        $inc: { views: 1 },
      });

      await Interaction.create({
        user: userId,
        question: questionId,
        action: 'view',
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
