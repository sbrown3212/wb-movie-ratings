import { useLoaderData, useNavigate } from "react-router-dom";
import CreateRatingForm from "../components/CreateRatingForm";
import axios from "axios";

export default function MovieDetailPage() {
  const { movie: { title, posterPath, overview, movieId } } = useLoaderData();

  const navigate = useNavigate();

  // Creates handler function for CreateRatingForm to run when user clicks submit button
  // Takes the event target and { score } object (which is provided by the form)
  const handleCreateRating = async (e, { score }) => {
    e.preventDefault();

    // Axios POST request to add a rating by user based on the current page's movie movieId
    const res = await axios.post('/api/ratings', { score: score, movieId: movieId });

    // If the post was successful, navigate to '/me' (Your Ratings page)
    if (res.data) {
      navigate('/me');
    }
  }

  return (
    <>
      <h1>{title}</h1>
      <img src={posterPath} alt="" style={{ width: '200px'}} />
      <p>{overview}</p>
      <h2>Rate this movie</h2>
      <CreateRatingForm onCreateRating={handleCreateRating} /> {/* Passes function as prop for form component to run with submit event */}
    </>
  );
}
