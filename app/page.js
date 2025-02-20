// app/page.js
import Hero from "./UI/Hero/Hero";

export default async function HomePage({ searchParams }) {
  // Because searchParams is now a promise, we must await it.
  const resolvedSearchParams = await searchParams;

  return <Hero searchParams={resolvedSearchParams} />;
}
