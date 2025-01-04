import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router for navigation
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice'; // Import the logout action
import '../resources/LandingPage.css'; // Import the external CSS file for landing page

const LandingPage = () => {
    const dispatch = useDispatch();

    // Access the Redux state
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    
    // Logout handler
    const handleLogout = () => {
        dispatch(logout());
    };

    

    return (
        <div className="landing-container">
            <nav className="navbar">
                <div className="navbar-brand">
                    <h2>Book Karo</h2>
                </div>
                <ul className="navbar-links">

                    {isAuthenticated && (
                        <li>
                            <h1>Welcome, {user}</h1>
                        </li>
                    )}
                    <li>
                        <Link to="/" className="navbar-link">Home</Link>
                    </li>
                    <li>
                        <Link to="/movies" className="navbar-link">Movies</Link>
                    </li>
                    <li>
                        <Link to="/book" className="navbar-link">Book a Movie</Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <Link to="/updateProfile" className="navbar-link">Profile</Link>
                        </li>
                    )}
                    {isAuthenticated ? (
                        <li>
                            <button onClick={handleLogout} className="navbar-link logout-button">
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login" className="navbar-link">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>

            <header className="landing-header">
                <h1>Welcome to Movie Booking</h1>
                <p>Your one-stop platform to book your favorite movies</p>
            </header>

            <div className="landing-content">
                <p className="landing-description">
                    Discover a wide variety of movies and book your tickets in just a few clicks. Enjoy seamless movie experiences right from the comfort of your home.
                </p>
                <button className="cta-button">
                    Book Now
                </button>
            </div>

            <footer className="landing-footer">
                <p>&copy; 2025 Movie Booking. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
