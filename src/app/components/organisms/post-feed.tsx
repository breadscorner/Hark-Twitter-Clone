'use client'

import { Post } from '@/fake-db';
import Image from 'next/image';
import PostIcons from '@/app/components/molecules/post-icons';
import React, { useState } from 'react';
import { Post } from '@/fake-db';
import * as fakeDB from '@/fake-db';

export default function PostFeed({ posts}: { posts: Post[]}) {

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
          <div className="post-container w-[90%] md:w-[75%] mx-auto my-4 px-4 border rounded-lg shadow-md" key={post.id}>
            <div className="cursor-pointer" onClick={() => openModal(post)}>
              <div className='flex items-center'>
                <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mt-4 border-slate-500 border-[1px]">
                  <Image
                    src={post.user?.avatar || "../placeholder.png"}
                    alt="Post Image"
                    width={75}
                    height={75}
                    className="object-cover"
                  />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[1em]'>{post.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='mt-2 md:mt-4 text-left lg:ml-[100px] md:ml-[100px]'>{post.content}</p>
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
                  className="border-slate-500 border-[1px] mt-2 md:mt-4"
                />
              </div>
            ) : null}
            <div className='mt-2  ml-[100px] md:mt-4 pb-4 text-left font-semibold flex items-center'>
              <p className='flex items-center'>{post.likes} Likes</p>
              <p className='ml-4 flex items-center'>{post.user.followers} Followers</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedPost && (
        <div className="flex fixed top-0 justify-center h-screen w-full mx-auto my-4 px-4 backdrop-blur-xl cursor-pointer" onClick={() => closeModal()}>
          <div className="w-full m-auto lg:w-[65%] max-h-[55%] bg-white bg-opacity-10 overflow-y-scroll px-4 border rounded-lg shadow-md" key={selectedPost.id}>
            <div>
              <div className='flex items-center'>
                <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mt-4 border-slate-500 border-[1px]">
                  <Image
                    src={selectedPost.user?.avatar || "../placeholder.png"}
                    alt="Post Image"
                    width={75}
                    height={75}
                    className="object-cover"
                  />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[1em]'>{selectedPost.user?.username || "Anonymous User"}</h2>
              </div>
              <p className='mt-2 ml-[100px] md:mt-4 text-left'>{selectedPost.content}</p>
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
                  className="border-slate-500 border-[1px] mt-2 md:mt-4"
                />
              </div>
            ) : null}
            <div className='mt-2 ml-[100px] md:mt-4 pb-4 justify-center md:justify-start font-semibold flex'>
              <p className='flex items-center'>{selectedPost.likes} Likes</p>
              <p className='ml-4 flex items-center'>{selectedPost.user.followers} Followers</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
