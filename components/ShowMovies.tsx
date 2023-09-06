"use client";

import Image from "next/image";
import { useRef, useState } from "react";

interface ShowMoviesProps {
  movies: any;
}

const ShowMovies = ({ movies }: ShowMoviesProps) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [scrollInterval, setScrollInterval] = useState<number | null>(null);

  console.log(movies.results);

  if (!movies) return null;

  const moviesWithImages = movies.results.filter((movie: any) => {
    if (movie.primaryImage) return movie;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!scrollContainer.current) return;

    const rect = scrollContainer.current.getBoundingClientRect();
    const xPos = e.clientX - rect.left;

    const scrollSpeed = 5;

    if (xPos < rect.width * 0.2) {
      if (scrollInterval) clearInterval(scrollInterval);

      const interval = setInterval(() => {
        scrollContainer.current!.scrollLeft -= scrollSpeed;
      }, 30) as unknown as number;

      setScrollInterval(interval);
    } else if (xPos > rect.width * 0.8) {
      if (scrollInterval) clearInterval(scrollInterval);

      const interval = setInterval(() => {
        scrollContainer.current!.scrollLeft += scrollSpeed;
      }, 30) as unknown as number;

      setScrollInterval(interval);
    } else {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        setScrollInterval(null);
      }
    }
  };

  const stopScrolling = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  return (
    <div
      className="flex flex-row overflow-auto gap-8 py-16 px-6 no-scrollbar"
      onMouseEnter={handleMouseMove}
      onMouseLeave={stopScrolling}
      ref={scrollContainer}
    >
      {moviesWithImages.map((movie: any) => (
        <Image
          key={movie.primaryImage.url ? movie.primaryImage.url : ""}
          alt=""
          src={movie.primaryImage.url}
          width={200}
          height={200}
          className="transform transition-transform hover:scale-125"
        />
      ))}
    </div>
  );
};

export default ShowMovies;
