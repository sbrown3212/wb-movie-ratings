import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import LogoutButton from './components/LogoutButton.jsx';
import axios from 'axios';

export default function App() {
  const navigate = useNavigate();

  // Logs out user by doing axios POST request
  const handleLogout = async (e) => {
    e.preventDefault();

    // Axios POST request to log user out
    const res = await axios.post('/api/logout');

    // If logout successful, navigate to index
    if (res.data.success) {
      navigate('/');
    }
  }

  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/movies">All movies</NavLink>
          </li>
          <li>
            <NavLink to="/login">Log in</NavLink>
          </li>
          <li>
            <NavLink to="/me">Your ratings</NavLink>
          </li>
          <li>
            <LogoutButton onLogout={handleLogout}/>
          </li>
        </ul>
      </nav>

      <hr />

      <main>
        <Outlet />
      </main>
    </>
  );
}
