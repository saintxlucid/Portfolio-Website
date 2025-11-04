import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amethyst to-ice mb-4">
          404
        </h1>
        <h2 className="text-3xl font-bold text-limestone mb-4">
          Page Not Found
        </h2>
        <p className="text-limestone/80 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to another dimension.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-amethyst text-bg rounded-lg font-medium hover:bg-opacity-90 transition-all duration-200"
        >
          Return Home →
        </Link>
      </div>
    </div>
  );
}
