import Image from "next/image";
import { getUser } from '@/fake-db';

export default function CreatePost() {
  
  const user = getUser('Brett');

  return (
    <div className="w-[65%] mx-auto mb-4 p-4 rounded-lg border shadow-md flex justify-center items-center">
      <form action="/create-post" method="POST" className="flex flex-col w-[75%] items-center">
        <Image
          src={user?.avatar || "/placeholder.png"}
          alt="User Image"
          width={100}
          height={100}
          className="rounded-full border-slate-500 border-[1px] my-4 object-cover"
        />

        {/* Title Input */}
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="p-2 border rounded-lg w-full mb-4"
          placeholder="Add a title..."
          required
        />

        {/* Content Input */}
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          className="py-2 px-2 border rounded-lg w-full mb-4"
          placeholder="Create a post..."
          required
        ></textarea>

        {/* Image Input (Optional) */}
        <label htmlFor="image" className="block text-gray-700 text-sm font-bold">
          Image (optional)
        </label>
        <div className="flex justify-center items-center border rounded-lg w-full pt-4 m-4">

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className=" p-2 mb-4"
          />
          </div>

        {/* Submit Button */}
        <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded-lg">
          Create Post
        </button>
      </form>
    </div>
  );
}
