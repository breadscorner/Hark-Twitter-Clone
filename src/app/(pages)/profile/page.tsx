import { userPostsQuery } from "@/db/queries/postFeed"
import Profile from "./profile"
import Image from "next/image"
// import Modal from "react-modal"
// import PostModal from "@/app/components/molecules/post-modal"
// import { useState } from "react"
import { auth } from "@/utils/auth"
import { redirect } from "next/navigation"
// import { Post } from "@/db/schema/posts";


export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile")
  }

  const posts = await userPostsQuery.execute({ userId: session.user.id });

  // // Modal
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // const openModal = (thisPost: Post | null) => {
  //   if (thisPost) {
  //   setSelectedPost(thisPost);
  //   setModalIsOpen(true);
  //   }
  // }  

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setSelectedPost(null);
  // }

  return (
    <div>
      <Profile user={session.user} />

      <div className="w-[90%] md:w-[75%] mx-auto my-4">
        <div>
          <div className="font-[1.5em]">Posts</div>
          {posts?.map((post) => (
            <div 
              className="w-full mx-auto mt-4 p-4 border shadow-md rounded-lg cursor-pointer"
              key={post.id}
              // key={post.id}
              // onClick={() => openModal(selectedPost)}
            >
              {/* Post Title */}
              <h2 className="text-lg font-bold">{post.title}</h2>

              {/* Post Content */}
              <p className="mt-2">{post.content}</p>

              {/* Render Images if media is of type image */}
              {post.media?.type === 'image' && (
                <div className="flex justify-center my-4"
                key={post.id}>
                  <Image
                    src={post.media.url}
                    alt="Post Image"
                    width={post.media.width || 250}
                    height={post.media.height || 250}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* <PostModal post={selectedPost} isModalOpen={modalIsOpen} closeModal={closeModal} /> */}
    </div>
  )
}
