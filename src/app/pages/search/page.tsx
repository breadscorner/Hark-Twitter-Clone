export default function Search() {
  return (
    <div className="w-[65%] mx-auto px-4 py-4 rounded-lg shadow-md text-center">
      <form className="flex flex-row items-center">
        <button className="flex items-center justify-center bg-black border-black border-[1px] rounded-l-lg p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1.5em"
            viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
              stroke="#ffffff"
              fill="#ffffff" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="flex-grow border-black border-[1px] border-l-0 rounded-r-lg p-4"
        />
      </form>
    </div>
  );
}
