import Image from 'next/image'

export default async function ProfileImage({ imageUrl }: { imageUrl?: string | null }) {

  return (
    <div className="relative overflow-hidden rounded-full border-slate-500 border-[1px] my-4"
      style={{ width: '150px', height: '150px' }}>
      <Image
        src={imageUrl || "/placeholder.png"}
        alt="User Image"
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  )
}