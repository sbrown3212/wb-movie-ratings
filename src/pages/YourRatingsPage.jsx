import { NavLink, useLoaderData } from "react-router-dom";

export default function YourRatingsPage() {
  // Deconstruct ratings from data provided by React route's '/api/ratings' call
  const { ratings } = useLoaderData();

  // Format list of ratings into li elements
  const ratingsList = ratings.map(({ ratingId, score, movie, movieId}) => {
    // Deconstruct 'title' from 'movie' which is an object (from sequelize "include")
    const { title } = movie;

    return (
      <li key={ratingId}>
        <NavLink to={`/movies/${movieId}`}>{title}</NavLink>: {score}
      </li>
    );
  });

  return (
    <>
      <h1>Your Ratings</h1>
      <ul>{ratingsList}</ul>
    </>
  );
}
