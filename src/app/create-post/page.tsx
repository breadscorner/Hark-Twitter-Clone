export default function CreatePost() {
  return (
    <div className="text-center">
      <h1 className="text-lg">Create Post</h1>
      <p className="text-xs">Post Feed</p>
      {/* create a form with a single input */}
      <form>
        <input type="text" className="py-2 px-2"/>
      </form>

    </div>
  );
}