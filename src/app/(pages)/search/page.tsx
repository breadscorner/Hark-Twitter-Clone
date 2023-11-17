'use client'

import React, { useState, useEffect } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  likes: number;
}

// Replace this with your actual posts array
const posts: Post[] = [
  // ... your posts
];

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Filter posts based on the search term if searchTerm is not empty,
    // otherwise reset to empty array to not display any posts by default
    const results = searchTerm
      ? posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];
    setFilteredPosts(results);
  }, [searchTerm]);

  return (
    <div className="w-[65%] mx-auto px-4 py-4 rounded-lg border shadow-md text-center">
      <form className="flex flex-row items-center" onSubmit={(e) => e.preventDefault()}>
        <button className="flex items-center justify-center bg-black border-black border-[1px] rounded-l-lg p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              stroke="#ffffff"
              fill="#ffffff" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow border-black border-[1px] border-l-0 rounded-r-lg p-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>

      {/* Display filtered posts */}
      <div>
      {filteredPosts.map((post) => (
          <div key={post.id} className="my-4 p-4 border rounded">
            <h3 className="text-lg font-bold">{post.title}</h3>
            {post.image && (
              <div className="my-2">
                <img
                  src={post.image}
                  alt={`Image for ${post.title}`}
                  width={100} 
                  height={100}                 
                  className="rounded"
                />
              </div>
            )}
            <p className="my-2">{post.content}</p>
            <div className="my-2">Likes: {post.likes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
