import Image from 'next/image'
import { db, eq } from '@/db'
import { users as userTable } from '@/db/schema/users'

export default async function ProfileImage() {

    // Get User Info
    const users = await db.select().from(userTable)
    .where(eq(userTable.username, 'breadscorner'));

  if (users.length === 0) {
    return <div>404</div>
  }

  const user = users[0];

  return (
    <div className="relative overflow-hidden rounded-full border-slate-500 border-[1px] my-4"
    style={{ width: '150px', height: '150px' }}>
    <Image
      src={user.profileImage || "/placeholder.png"}
      alt="User Image"
      layout="fill"
      objectFit="cover"
      className="rounded-full"
    />
  </div>
  )
}