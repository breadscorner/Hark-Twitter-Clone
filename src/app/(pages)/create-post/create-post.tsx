'use client'

export default function Create({profileImage}: {profileImage: React.ReactNode}) {

  // use state here, two state variables for the two inputs in the form

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!")
    // grab the values here and send them to the server
    // create a server action in a different file then call it here
    // await createPost(title, content, image)
  }

  return (
    <form onSubmit={handleSubmit} method="POST" className="flex flex-col w-[75%] items-center">

      {profileImage}

      {/* Title Input */}
      <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        className="p-2 border rounded-lg w-full mb-4"
        placeholder="Add a title..."
        required
      />

      {/* Content Input */}
      <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
        Content
      </label>
      <textarea
        id="content"
        name="content"
        className="py-2 px-2 border rounded-lg w-full mb-4"
        placeholder="Create a post..."
        required
      ></textarea>

      {/* Image Input (Optional) */}
      <label htmlFor="image" className="block text-gray-700 text-sm font-bold">
        Image (optional)
      </label>
      <div className="flex justify-center items-center border rounded-lg w-full pt-4 m-4">

        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
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