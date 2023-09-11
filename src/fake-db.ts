export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  avatar: string
  followers: number
}

export type Media = {
  id: number
  type: "image" | "video"
  url: string
  width: number
  height: number
}

export type Post = {
  id: number
  user: User
  date: string
  content: string
  likes: number
  replies: number
  replyId?: number
  media?: Media
}

const users: User[] = [
  {
    id: 1,
    username: "sam",
    avatar:
      "https://images.clerk.dev/uploaded/img_2UwOmQYFLO3AhjoORmTygZ7OM8Y.png",
    firstName: "saM",
    lastName: "saM",
    followers: 100,
  },
]

const posts: Post[] = [
  {
    id: 1,
    user: users[1],
    date: "2024-01-01T12:00:00.000Z",
    content:
      "Just some content to get us started. This is a post with some content. It's not very interesting, but it's a post.",
    likes: 10,
    replies: 0,
  },
  {
    id: 1,
    user: users[1],
    date: "2024-01-01T12:00:00.000Z",
    content: "This one is slightly more interesting. It has an image.",
    likes: 10,
    replies: 0,
    media: {
      id: 1,
      type: "image",
      url: "https://picsum.photos/seed/picsum/200/300",
      width: 200,
      height: 300,
    },
  },
]

export function getPosts(): Post[] {
  return posts.filter((post) => !post.replyId)
}

export function getPost(id: number): Post | undefined {
  return posts.find((post) => post.id === id)
}

export function getPostResponses(id: number): Post[] {
  return posts.filter((post) => post.replyId === id)
}

export function getUser(username: string): User | undefined {
  return users.find((user) => user.username === username)
}

export function getPostsForUser(username: string): Post[] {
  return posts.filter((post) => post.user.username === username)
}