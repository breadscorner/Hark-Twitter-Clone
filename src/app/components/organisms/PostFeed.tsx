'use client';

import { Post } from '@/db/queries/postFeed';
import Image from 'next/image';
import PostIcons from '@/app/components/molecules/post-icons';
import React, { useState } from 'react';
import PostModal from '../molecules/post-modal';


export default function PostFeed({ posts }: { posts: Post[]; }) {

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
          <div className="post-container w-[90%] md:w-[75%] mx-auto my-4 px-4 border rounded-lg shadow-lg" key={post.id}>
            <div className="cursor-pointer" onClick={() => openModal(post)}>
              <div className='flex items-center'>
                <div className="relative w-[100px] h-[100px] rounded-full object-cover overflow-hidden mt-4 border-slate-500 border-[1px]"
                  style={{ width: '125px', height: '125px' }}>
                  <Image
                    src={post.user.profileImage || "../placeholder.png"}
                    alt="Post Image"
                    layout="fill"
                    className="object-cover" />
                </div>
                <h2 className='mt-4 ml-5 font-semibold text-[2em]'>{post.user.username || "Anonymous User"}</h2>
              </div>
              <p className='mt-2 md:mt-4 text-left lg:ml-[100px] md:ml-[100px]'>{post.content}</p>
              <PostIcons />
            </div>

            {/* Post Media */}
            {post.media?.url ? (
              <div className="flex justify-center items-center mb-4">
                <Image
                  src={post.media?.url || "../placeholder.png"}
                  alt="Post Image"
                  width={post.media?.width || 125}
                  height={post.media?.height || 125}
                  className="border-slate-500 border-[1px] mt-2 md:my-4" />
              </div>
            ) : null}
            {/* <div className='mt-2  ml-[100px] md:mt-4 pb-4 text-left font-semibold flex items-center'>
                      <p className='flex items-center'>{post.likes} Likes</p>
                      <p className='ml-4 flex items-center'>{post.user.followers} Followers</p>
                    </div> */}
          </div>
        ))}
      </div>

      <PostModal post={selectedPost} isModalOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}
