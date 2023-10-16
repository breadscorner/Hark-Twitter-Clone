import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-700">404 - Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
        <Link href="/">
          <a className="mt-4 text-blue-500 hover:underline">Return to Home Page</a>
        </Link>
      </div>
    </div>
  );
}
