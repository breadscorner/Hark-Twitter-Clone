import ProfileImage from "@/app/components/atoms/profile-image";
import CreatePost from "./create-post";
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";

export default async function CreatePostPage() {

  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/create-post")
  }

  return (
    <div className="w-[65%] mx-auto mb-4 p-4 rounded-lg border shadow-md flex justify-center items-center">
      <CreatePost profileImage={<ProfileImage imageUrl={session.user.image} />} />
    </div>
  );
}
