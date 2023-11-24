'use client'

import { useState } from 'react';
import { createPost } from './action';
import { getCustomSignedUrl } from './action';
import { Redirect } from 'next';

export default function Create({ profileImage }: { profileImage: React.ReactNode }) {

  // use state here, two state variables for the two inputs in the form
  const [title, setTitle] = useState<string | undefined>();
  const [content, setContent] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [fileUrl, setFileUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatusMessage("Creating...")
    setLoading(true)

    try {
    let mediaId: number | undefined = undefined
      if (file) {
        setStatusMessage("Uploading image...")
        const checkSum = await computeSHA256(file)
        const signedUrlResult = await getCustomSignedUrl(file.type, file.size, checkSum)

        if (signedUrlResult.failure !== undefined) {
          setStatusMessage("Failed")
          throw new Error("Failed to get signed url")
        }
        const { url } = signedUrlResult.success;
        mediaId = signedUrlResult.success.mediaId

        await fetch(url, {
          method: 'PUT',
          body: file,
          headers: {
            'Content-Type': file.type
          }
        })
      }

    } catch (e) {
      setStatusMessage("Failed")
      console.error(e)

    } finally {
      setLoading(false)
    }

    if (!title || !content) {
      return
    }
    await createPost(title, content).then((res) => {
      console.log("Form submitted!")
    })

    setStatusMessage("Created.")
    setLoading(false)

    // Clear the form
    event.currentTarget.reset();
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    setFile(file)

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl)
    }

    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
    } else {
      setFileUrl(undefined)
    }
  }

  const removePreview = () => {
    setFile(undefined)
    setFileUrl(undefined)
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="flex flex-col w-[75%] items-center">

      {profileImage}

      {fileUrl && file && (
        <div className="flex flex-col justify-center items-center border rounded-lg w-full pt-4 m-4">
          <img src={fileUrl} alt="preview" className="w-1/2" />
          <button
            type="button"
            onClick={removePreview}
            className="bg-blue-700 text-white p-2 rounded mt-4"
          >
            Remove Image
          </button>
        </div>
      )}

      {/* Title Input */}
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        id="title"
        name="title"
        className="p-2 text-[#001d3d] border rounded-lg w-full mb-4"
        placeholder="Add a title..."
        required
      />

      {/* Content Input */}
      <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
        Content
      </label>
      <textarea
        onChange={(event) => setContent(event.target.value)}
        id="content"
        name="content"
        className="py-2 px-2 text-[#001d3d] border rounded-lg w-full mb-4"
        placeholder="Create a post..."
        required
      ></textarea>

      {/* Image Input (Optional) */}
      <label htmlFor="image" className="block text-gray-700 text-sm font-bold">
        Image (optional)
      </label>
      <div className="flex justify-center items-center border rounded-lg w-full pt-4 m-4">
        <input
          onChange={handleChange}
          type="file"
          id="image"
          name="media"
          accept="image/jpeg, image/png, image/gif, image/webp, image/svg+xml, image/apng, image/avif"
          className=" p-2 mb-4"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-slate-500 text-white px-4 py-2 rounded-lg">
        Create Post
      </button>
    </form>
  );
}