import LikeIcon from '../atoms/nav-like-icon';
import CommentIcon from '../atoms/post-comment-icon';
import PostLikeIcon from '../atoms/post-like-icon';
import RTIcon from '../atoms/post-rt-icon';
import ShareIcon from '../atoms/post-share-icon';

export default function PostIcons() {

  return (
    <div className="ml-[100px] flex items-center">
      <PostLikeIcon />
      <CommentIcon />
      <RTIcon />
      <ShareIcon />
    </div>
  )
}