'use client'

import { useState } from 'react';
import { createPost } from './action';

export default function Create({profileImage}: {profileImage: React.ReactNode}) {

  // use state here, two state variables for the two inputs in the form
  const [title, setTitle] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [image, setImage] = useState<File | undefined>();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!title || !content){
      return
    }
    await createPost(title, content).then((res) => {
      console.log(res)
      console.log("Form submitted!")
    })   
    // Clear the form
    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="flex flex-col w-[75%] items-center">

      {profileImage}

      {/* Title Input */}
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        id="title"
        name="title"
        className="p-2 text-[#001d3d] border rounded-lg w-full mb-4"
        placeholder="Add a title..."
        required
      />

      {/* Content Input */}
      <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
        Content
      </label>
      <textarea
        onChange={(event) => setContent(event.target.value)}
        id="content"
        name="content"
        className="py-2 px-2 text-[#001d3d] border rounded-lg w-full mb-4"
        placeholder="Create a post..."
        required
      ></textarea>

      {/* Image Input (Optional) */}
      <label htmlFor="image" className="block text-gray-700 text-sm font-bold">
        Image (optional)
      </label>
      <div className="flex justify-center items-center border rounded-lg w-full pt-4 m-4">

        <input
          onChange={(event) =>{
            if(event?.target?.files){
              setImage(event.target.files[0])}
            }
          } 
          type="file"
          id="image"
          name="image"
          accept="image/jpeg, image/png"
          className=" p-2 mb-4"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded-lg">
        Create Post
      </button>
    </form>
  );
}