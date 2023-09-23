import Image from "next/image";
import { getUser } from '@/fake-db';

export default function CreatePost() {

  const user = getUser('Brett');

  return (
    <div className="post-container w-[75%] mx-auto my-4 p-4 rounded-lg shadow-md">
      <div className="flex justify-center items-center">
        <Image
          src={user?.avatar || "/placeholder.png"}
          alt="User Image"
          width={75}
          height={75}
          className="rounded-full border-slate-500 border-[1px] mt-4 object-cover  min-h-[75]"
        />

        <form>

          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="py-2 px-2 border rounded-lg w-full"
              required
            />
          </div>

          {/* Content Input */}
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              className="py-2 px-2 border rounded-lg w-full"
              required
            ></textarea>
          </div>

          {/* Image Input (Optional) */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image (optional)
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="py-2 px-2"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}