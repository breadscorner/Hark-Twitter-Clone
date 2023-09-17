import Image from "next/image";
import { getUser, getPostsForUser } from '@/fake-db';

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
      </div>

      {/* create a form with a single input */}
      <form>
        <input type="text" className="py-2 px-2" />
      </form>

    </div>
  );
}