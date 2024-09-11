'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Quill editor CSS

// Form validation schema using Zod
const pageSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  content: z.string().min(1, { message: 'Content is required' }),
  tags: z.string().optional(),
  visibility: z.enum(['public', 'private', 'followers']),
});

type PageFormValues = z.infer<typeof pageSchema>;

const NewPage = () => {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageFormValues>({
    resolver: zodResolver(pageSchema),
  });

  const onSubmit = async (data: PageFormValues) => {
    const newPage = {
      ...data,
      content,
    };
    console.log(newPage); // This is where you'd save to the database

    // Simulating a save and redirecting
    router.push('/dashboard');
    alert('Page saved successfully!');
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Create New Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            {...register('title')}
            className="mt-1 block w-full"
            placeholder="Enter the title of your page"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Rich Text Editor */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          {!isPreview ? (
            <ReactQuill
              value={content}
              onChange={setContent}
              className="h-64"
              placeholder="Write your thoughts here..."
            />
          ) : (
            <div className="p-4 bg-gray-100">
              <SyntaxHighlighter language="javascript" style={docco}>
                {content}
              </SyntaxHighlighter>
            </div>
          )}
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        {/* Tags/Category Input */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium">
            Tags/Category (Comma separated)
          </label>
          <Input
            id="tags"
            {...register('tags')}
            className="mt-1 block w-full"
            placeholder="e.g., coding, fitness, career"
          />
        </div>

        {/* Visibility Settings */}
        <div>
          <label className="block text-sm font-medium">Visibility</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <Input
                type="radio"
                value="public"
                {...register('visibility')}
              />
              <span className="ml-2">Public</span>
            </label>
            <label className="flex items-center">
              <Input
                type="radio"
                value="private"
                {...register('visibility')}
              />
              <span className="ml-2">Private</span>
            </label>
            {/* <label className="flex items-center">
              <Input
                type="radio"
                value="followers"
                {...register('visibility')}
              />
              <span className="ml-2">Followers only</span>
            </label> */}
          </div>
          {errors.visibility && <p className="text-red-500 text-sm">{errors.visibility.message}</p>}
        </div>

        {/* Preview and Save Buttons */}
        <div className="flex space-x-4">
          <Button type="button" onClick={() => setIsPreview(!isPreview)}>
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button type="submit">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPage;
