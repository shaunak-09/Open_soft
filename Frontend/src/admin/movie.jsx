import React from "react";

function MovieElement({ setIsFormVisible }) {
  const movie = {
    id: 1,
    title: "The Shawshank Redemption",
    plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genres: ["Drama", "Crime"],
    language: "English",
    year: 1994,
    posterUrl: "https://www.example.com/poster.jpg",
    price: "free",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="h-20 w-14 rounded-lg"
        />
        <div>
          <h2 className="text-lg font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-500">{movie.plot}</p>
          <p className="text-sm text-gray-500">
            Genres: {movie.genres.join(", ")}
          </p>
          <p className="text-sm text-gray-500">Language: {movie.language}</p>
          <p className="text-sm text-gray-500">Year: {movie.year}</p>
          <p className="text-sm text-gray-500">
            Price: {movie.price === "free" ? "Free" : "Paid"}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsFormVisible()}
          className="text-indigo-600 hover:text-indigo-800 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="text-red-600 hover:text-red-800 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieElement;
