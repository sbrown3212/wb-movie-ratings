import { useLoaderData, NavLink } from "react-router-dom";

export default function AllMoviesPage() {
  const { movies } = useLoaderData();

  const movieListItems = movies.map((movie) => {
    return <li key={movie.movieId}>
      <NavLink to={`/movies/${movie.movieId}`}>{movie.title}</NavLink>
    </li>
  })

  return (
    <>
      <h1>All Movies</h1>
      <ul>
        {movieListItems}
      </ul>
    </>
  );
}
