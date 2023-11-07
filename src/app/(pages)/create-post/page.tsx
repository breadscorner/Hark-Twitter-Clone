import Image from "next/image";
import { db, eq } from "@/db";
import { posts as postTable } from "@/db/schema/posts";
import { users as userTable } from "@/db/schema/users";

export default async function CreatePost() {

  // Get User Info
  const users = await db.select().from(userTable)
    .where(eq(userTable.username, 'breadscorner'));

  if (users.length === 0) {
    return <div>404</div>
  }

  const user = users[0];

  // Get Posts From Single User
  const postsList = await db.select().from(postTable)
    .where(eq(postTable.userId, users[0].id));
  return (
    <div className="w-[65%] mx-auto mb-4 p-4 rounded-lg border shadow-md flex justify-center items-center">
      <form action="/create-post" method="POST" className="flex flex-col w-[75%] items-center">
        <div className="relative overflow-hidden rounded-full border-slate-500 border-[1px] my-4"
          style={{ width: '150px', height: '150px' }}>
          <Image
            src={user.profileImage || "/placeholder.png"}
            alt="User Image"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>



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
