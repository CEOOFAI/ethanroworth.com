import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-dark min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="font-display text-[8rem] md:text-[12rem] font-bold leading-none text-accent opacity-20">
          404
        </h1>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-dark-text -mt-8 md:-mt-12">
          Page not found
        </h2>
        <p className="mt-6 text-dark-text-muted max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block mt-8 px-8 py-4 bg-accent text-accent-text font-semibold text-sm uppercase tracking-wider hover:bg-accent-hover transition-colors"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
