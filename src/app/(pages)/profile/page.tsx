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
    return;
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
          <div className="flex justify-center text-3xl font-semibold pb-4">{session.user.name}&apos;s Posts</div>
          {posts?.map((post) => (
            <div className="post-container w-[90%] md:w-full mx-auto my-4 px-4 border rounded-lg shadow-lg" key={post.id}>
              <div className='flex items-center'>
                <div className="relative w-[100px] h-[100px] rounded-full object-cover overflow-hidden mt-4 border-slate-500 border-[1px]"
                  style={{ width: '125px', height: '125px' }}>
                  {/* Can't use ProfileImage Component due to client side page */}
                  <Image
                    src={post.user.profileImage || "../placeholder.png"}
                    alt="Post Image"
                    layout="fill"
                    className="object-cover" />
                </div>
                {/* Post Header */}
                <div className='flex flex-col text-left ml-8'>
                  <h2 className='mt-4 font-semibold text-[2em]'>{post.title}</h2>
                  <p className='mt-2 italic text-[1em]'>{post.user.username}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className='border-t md:ml-[165px] md:mr-8'>
                <p className='mt-2 md:mt-4 text-left'>{post.content}</p>
              </div>

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
        {/* <PostModal post={selectedPost} isModalOpen={modalIsOpen} closeModal={closeModal} /> */}
      </div>
    </div>
  )
}
