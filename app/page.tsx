import { fetchMovies } from "@/utils";
import { ShowMovies } from "@/components";

export default async function Home() {
  const movies = await fetchMovies({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ShowMovies movies={movies} />
    </main>
  );
}
