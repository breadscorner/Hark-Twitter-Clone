import ProfileImage from "@/app/components/molecules/profile-image";
import CreatePost from "./create-post";
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const session = await auth();

  if (!session || !session.user) {
    // Redirect if session or user is not available
    redirect("/api/auth/signin?callbackUrl=/create-post");
    return;
  }

  return (
    <div className="w-[65%] mx-auto mb-4 p-4 rounded-lg border shadow-md flex justify-center items-center">
      <CreatePost profileImage={<ProfileImage imageUrl={session?.user?.image} />} />
    </div>
  );
}
