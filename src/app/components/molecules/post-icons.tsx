import LikeIcon from '../atoms/posts/like-icon';
// import CommentIcon from '../atoms/posts/comment-icon';
// import RTIcon from '../atoms/posts/rt-icon';
// import ShareIcon from '../atoms/posts/share-icon';
import DeleteIcon from '../atoms/posts/delete-icon';

type Props = {
  // onLike: () => void
  // onComment: () => void
  // onRepost: () => void
  // onShare: () => void
  onDelete: () => void
}

export default function PostIcons({ onDelete }: Props) {

  return (
    <div className="flex justify-center items-center md:ml-[100px] md:justify-start">
      <div>
      <LikeIcon />
      </div>
      {/* <div>
      <CommentIcon />
      </div> */}
      {/* <div>
      <RTIcon />
      </div> */}
      {/* <div>
      <ShareIcon />
      </div> */}
      <div onClick={() => onDelete()}>
      <DeleteIcon />
      </div>
    </div>

  )
}