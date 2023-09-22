import LikeIcon from '../atoms/like-icon';
import CommentIcon from '../atoms/comment-icon';
import RTIcon from '../atoms/rt-icon';
import ShareIcon from '../atoms/share-icon';

export default function PostIcons() {

  return (
    <div className="ml-[100px] flex items-center">
      <LikeIcon />
      <CommentIcon />
      <RTIcon />
      <ShareIcon />
    </div>
  )
}