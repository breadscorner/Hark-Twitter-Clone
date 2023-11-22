import LikeIcon from '../atoms/posts/like-icon';
import CommentIcon from '../atoms/posts/comment-icon';
import RTIcon from '../atoms/posts/rt-icon';
import ShareIcon from '../atoms/posts/share-icon';

export default function PostIcons() {

  return (
    <div className="flex justify-center items-center md:ml-[100px] md:justify-start">
      <LikeIcon />
      <CommentIcon />
      <RTIcon />
      <ShareIcon />
    </div>

  )
}