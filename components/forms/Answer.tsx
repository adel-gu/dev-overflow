'use client';
import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { AnswerSchema } from '@/lib/validations';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/context/Theme';
import { createAnswer } from '@/lib/actions/answer.action';

interface AnswerProps {
  question: string;
  questionId: string;
  authorId: string;
}

const Answer = ({ questionId, authorId }: AnswerProps) => {
  const pathname = usePathname();
  const { mode } = useTheme();
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmittingAI, setIsSubmittingAI] = useState(false);
  // const router = useRouter();

  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: '',
    },
  });

  async function onSubmit(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);
    try {
      // Make an async call to the API -> create a question with all the data submitted
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });

      form.reset();
      if (editorRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const editor = editorRef.current as any;

        editor.setContent('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // const generateAIAnswer = async () => {
  //   if (!authorId) return;

  //   setIsSubmittingAI(true);

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chatgpt`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({ question }),
  //       },
  //     );

  //     const aiAnswer = await response.json();

  //     alert(aiAnswer.reply);
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   } finally {
  //     setIsSubmittingAI(false);
  //   }
  // };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>

        <Button
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none"
          onClick={() => {}}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="Star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI answer
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(_evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'codesample',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'codesample bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist',
                      content_style:
                        'body { font-family:Inter; font-size:16px }',
                      skin: mode === 'dark' ? 'oxide-dark' : 'oxide',
                      content_css: mode === 'dark' ? 'dark' : 'light',
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit !text-light-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? <>Posting...</> : <>Post Answer</>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default Answer;
