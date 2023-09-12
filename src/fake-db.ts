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
  rePosts: number
  views: number
  replyId?: number
  media?: Media
}

const users: User[] = [
  {
    id: 1,
    username: "Brett Gill",
    avatar: "https://www.gravatar.com/avatar/?d=mp",
    firstName: "John",
    lastName: "Doe",
    followers: 100,
  },
  {
    id: 2,
    username: "Jun Choi",
    avatar: "https://www.gravatar.com/avatar/?d=mp",
    firstName: "Jane",
    lastName: "Doe",
    followers: 100,
  },
  {
    id: 3,
    username: "Sam Meech-Ward",
    avatar: "https://images.clerk.dev/uploaded/img_2UwOmQYFLO3AhjoORmTygZ7OM8Y.png",
    firstName: "saM",
    lastName: "saM",
    followers: 100,
  },
]

const posts: Post[] = [
  {
    id: 1,
    user: users[0],
    date: "2022-01-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 2,
    rePosts: 1,
    views: 100,
  },
  {
    id: 2,
    replyId: undefined,
    user: users[1],
    date: "2023-08-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: undefined,
  },
  {
    id: 3,
    replyId: undefined,
    user: users[2],
    date: "2024-01-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: {
      id: 1,
      type: "image",
      url: "https://picsum.photos/seed/picsum/200/300",
      width: 200,
      height: 300,
    },
  },
  {
    id: 4,
    replyId: undefined,
    user: users[1],
    date: "2023-08-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: {
      id: 2,
      type: "image",
      url: "https://picsum.photos/seed/picsum/300/300",
      width: 200,
      height: 300,
    },
  },
  {
    id: 5,
    replyId: undefined,
    user: users[0],
    date: "2022-01-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: undefined,
  },
  {
    id: 6,
    replyId: 1,
    user: users[0],
    date: "2022-01-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: undefined,
  },
  {
    id: 7,
    replyId: 1,
    user: users[1],
    date: "2023-08-01T12:00:00.000Z",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
    likes: 10,
    replies: 0,
    rePosts: 1,
    views: 100,
    media: {
      id: 2,
      type: "image",
      url: "https://picsum.photos/seed/picsum/500/500",
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