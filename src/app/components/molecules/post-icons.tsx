import LikeIcon from '../atoms/like-icon';
import CommentIcon from '../atoms/comment-icon';
import RTIcon from '../atoms/rt-icon';
import ShareIcon from '../atoms/share-icon';

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