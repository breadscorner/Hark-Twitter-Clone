// import Image from "next/image";

import { db } from '@/db'
import { users as usersList } from '@/db/schema/users'

export default async function CreatePost() {

  const users = await db.select().from(usersList);

  return (
    <div className="w-[65%] mx-auto mb-4 p-4 rounded-lg border shadow-md flex justify-center items-center">
      <form className="flex flex-col w-[75%] items-center">
        {/* Why can't I use <Image component */}
        <img
          src={users[0].profileImage || "/placeholder.png"}
          alt="User Image"
          width={75}
          height={75}
          className="rounded-full border-slate-500 border-[1px] mt-4 object-cover"
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
          Submit
        </button>
      </form>
    </div>
  );
}
