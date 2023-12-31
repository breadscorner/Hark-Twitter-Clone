"use client";

import { Post } from "@/db/queries/postFeed";
import Image from "next/image";
import PostIcons from "@/app/components/molecules/post-icons";
import React, { useState } from "react";
import PostModal from "../components/molecules/post-modal";
import { deletePost } from "./actions";

export default function PostFeed({ posts }: { posts: Post[] }) {
  const [currentPosts, setPosts] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  const handleDelete = async (id: number) => {
    // Call the deletePost function from actions.ts
    try {
      // Await the promise to resolve and capture any value it might return
      await deletePost(id);

      // If the promise resolves without error, filter out the deleted post
      setPosts(currentPosts.filter((post) => post.id !== id));
      console.log(`Post ${id} deleted successfully.`);
    } catch (error) {
      // If there's an error in the deletion process, log it to the console
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="text-center">
      <div>
        {/* Map Posts */}
        {posts.map((post) => (
          <div
            className="post-container w-[90%] md:w-[75%] mx-auto my-4 px-4 border rounded-lg shadow-lg"
            key={post.id}
          >
            {/* Post Modal Action */}
            <div className="cursor-pointer" onClick={() => openModal(post)}>
              <div className="flex items-center">
                <div
                  className="relative w-[100px] h-[100px] rounded-full object-cover overflow-hidden mt-4 border-slate-500 border-[1px]"
                  style={{ width: "125px", height: "125px" }}
                >
                  {/* Can't use ProfileImage Component due to client side page */}
                  <Image
                    src={post.user.profileImage || "../placeholder.png"}
                    alt="Post Image"
                    layout="fill"
                    className="object-cover"
                  />
                </div>

                {/* Post Header */}
                <div className="flex flex-col text-left ml-8">
                  <h2 className="mt-4 font-semibold text-[2em]">
                    {post.title}
                  </h2>
                  <p className="mt-2 italic text-[1em]">{post.user.username}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="border-t md:ml-[165px] md:mr-8">
                <p className="mt-2 md:mt-4 text-left">{post.content}</p>
              </div>
            </div>

            {/* Post Media */}
            {post.media?.url ? (
              <div className="flex justify-center items-center">
                <Image
                  src={post.media?.url || "../placeholder.png"}
                  alt="Post Image"
                  width={post.media?.width || 125}
                  height={post.media?.height || 125}
                  className="border-slate-500 border-[1px] mt-2 md:mt-4"
                />
              </div>
            ) : null}

            {/* Post Icons */}
            <div className="p-4">
              <PostIcons onDelete={() => handleDelete(post.id)} />
            </div>
          </div>
        ))}
      </div>
      <PostModal
        post={selectedPost}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
}
