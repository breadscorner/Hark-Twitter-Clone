'use client'

import * as fakeDB from '@/fake-db';
import { Post } from '@/fake-db';
import Image from 'next/image';
import PostIcons from '@/app/components/molecules/post-icons';
import React, { useState } from 'react';

export default function PostFeed() {

  const posts = fakeDB.getPosts();

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: Post | null) => {
    if (post) {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  return (

    <div className="text-center">
      <div>
        {posts.map((post) => (
          <div className="post-container w-[65%] mx-auto my-4 px-4 border rounded-lg shadow-md" key={post.id}>
            <div className="cursor-default" onClick={() => openModal(post)}>
              <div className='flex items-center'>
                <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mt-4 border-slate-500 border-[1px]">
                  <Image
                    src={post.user?.avatar || "../placeholder.png"}
                    alt="Post Image"
                    fill={true}
                    className="object-cover"
                  />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[1em]'>{post.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='flex ml-[100px] text-left'>{post.content}</p>
              <PostIcons />
            </div>

            {/* Likes & followers */}
            {post.media?.url ? (
              <div className="flex justify-center items-center">
                <Image
                  src={post.media?.url || "../placeholder.png"}
                  alt="Post Image"
                  width={post.media?.width || 75}
                  height={post.media?.height || 75}
                  className="border-slate-500 border-[1px] mt-4"
                />
              </div>
            ) : null}
            <div className='flex ml-[100px] mt-4 pb-4 text-left font-semibold'>
              <p>{post.likes} likes</p>
              <p className='ml-4'>{post.user.followers} followers</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPost && (
        <div className="flex fixed top-0 justify-center h-screen w-full backdrop-blur-sm cursor-default" onClick={() => closeModal()}>
          <div className="post-container w-[85%] m-auto max-h-[55%] overflow-y-scroll px-4 bg-white border rounded-lg shadow-md" key={selectedPost.id}>
            <div>
              <div className='flex items-center'>
                <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mt-4 border-slate-500 border-[1px]">
                  <Image
                    src={selectedPost.user?.avatar || "../placeholder.png"}
                    alt="Post Image"
                    fill={true}
                    className="object-cover"
                  />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[1em]'>{selectedPost.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='flex ml-[100px] text-left'>{selectedPost.content}</p>
              <PostIcons />

              {/* Likes & followers & images */}
            </div>
            {selectedPost.media?.url ? (
              <div className="flex justify-center items-center">
                <Image
                  src={selectedPost.media?.url || "../placeholder.png"}
                  alt="Post Image"
                  width={selectedPost.media?.width || 75}
                  height={selectedPost.media?.height || 75}
                  className="border-slate-500 border-[1px] mt-4"
                />
              </div>
            ) : null}
            <div className='flex ml-[100px] mt-4 pb-4 text-left font-semibold'>
              <p>{selectedPost.likes} Likes</p>
              <p className='ml-4'>{selectedPost.user.followers} Followers</p>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}