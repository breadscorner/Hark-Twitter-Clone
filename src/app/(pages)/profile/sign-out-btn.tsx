"use client"

export default function SignoutButton({signOut} : {signOut: () => void}) {
  return (
    <button
      className="text-white hover:text-neutral-700 hover:bg-slate-200 py-2 px-4 border rounded-lg"
      onClick={() => {
        signOut()
      }}
    >
      Sign Out
    </button>
  )
}