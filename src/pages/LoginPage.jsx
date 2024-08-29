import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  // Logs user in if credentials are correct
  const handleLogin = async (e, formData) => {
    // Prevents page from reloading on submit
    e.preventDefault();

    // Axios POST request to log user in
    const res = await axios.post('/api/auth', formData);

    // If login was successful, navigate to '/me' route (YourRatings page)
    if (res.data.success) {
      navigate('/me');
    }
  };

  return (
    <>
      <h1>Log In</h1>
      <LoginForm onLogin={handleLogin} />
    </>
  );
}
