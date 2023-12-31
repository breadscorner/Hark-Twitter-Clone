import React from 'react';
import { Post } from '@/db/queries/postFeed';
import Image from 'next/image';

interface PostModalProps {
  post: Post | null;
  isModalOpen: boolean;
  closeModal: () => void;
}

export default function PostModal({ post, isModalOpen, closeModal }: PostModalProps) {

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return isModalOpen && post !== null && (
    <div className="flex fixed top-0 justify-center md:h-screen w-full mx-auto my-4 px-4 backdrop-blur-xl cursor-pointer" onClick={handleBackdropClick}>
      <div className="w-full m-auto lg:w-[85%] lg:max-h-[70%] bg-white bg-opacity-10 overflow-y-scroll px-4 border rounded-lg shadow-md" key={post.id} onClick={(e) => e.stopPropagation()}>
        <div>
          <div className='flex items-center'>
            <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden mt-4 border-slate-500 border-[1px]"
            style={{ width: '175px', height: '175px' }}>
              <Image
                src={post.user.profileImage || "../placeholder.png"}
                alt="User Image"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h2 className='mt-4 ml-5 font-semibold text-[3em]'>{post.user.username || "Anonymous User"}</h2>
          </div>
          <p className='mt-2 ml-[100px] md:mt-4 text-[1.5em] text-left'>{post.content}</p>
          
          {/* Likes & followers & images */}
        </div>
        {post.media?.url ? (
          <div className="flex justify-center items-center">
            <Image
              src={post.media.url || "../placeholder.png"}
              alt="Post Image"
              width={post.media?.width || 75}
              height={post.media?.height || 75}
              className="border-slate-500 border-[1px] mt-2 md:my-4"
            />
          </div>
        ) : null}

        {/* <div className='mt-2 ml-[100px] md:mt-4 pb-4 justify-center md:justify-start font-semibold flex'>
          <p className='flex items-center'>{post.likes} Likes</p>
          <p className='ml-4 flex items-center'>{post.user.followers} Followers</p>
        </div> */}
      </div>
    </div>
  );
}
