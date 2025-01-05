import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import '../../resources/admin/AdminLandingPage.css';

const AdminLandingPage = () => {
        const dispatch = useDispatch();
        // Access the Redux state
        const { isAuthenticated, user } = useSelector((state) => state.auth);
    
        
        // Logout handler
        const handleLogout = () => {
            dispatch(logout());
        };

    return (
        <div className="admin-container">
            <header className="admin-header">
                {isAuthenticated && (
                    <h1>Welcome! {user}</h1>
                )}
                <nav className="admin-navbar">
                    <ul className="navbar-links">
                        {/* {isAuthenticated && (
                            <li>
                                <h1>Welcome, {user}</h1>
                            </li>
                        )} */}
                        <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>
                        <li><Link to="/manage-users" className="navbar-link">Manage Users</Link></li>
                        <li><Link to="/analytics" className="navbar-link">Analytics</Link></li>
                        <li><Link to="/settings" className="navbar-link">Settings</Link></li>
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
            </header>

            <main className="admin-main">
                <section className="admin-card">
                    <h2>Dashboard</h2>
                    <p>Get an overview of key metrics and system performance.</p>
                    <Link to="/dashboard" className="cta-link">View Dashboard</Link>
                </section>
                <section className="admin-card">
                    <h2>Manage Users</h2>
                    <p>View, add, edit, or remove users in the system.</p>
                    <Link to="/manage-users" className="cta-link">Manage Users</Link>
                </section>
                <section className="admin-card">
                    <h2>Analytics</h2>
                    <p>Analyze user behavior and system trends with detailed reports.</p>
                    <Link to="/analytics" className="cta-link">View Analytics</Link>
                </section>
                <section className="admin-card">
                    <h2>Settings</h2>
                    <p>Customize system settings and preferences.</p>
                    <Link to="/settings" className="cta-link">Go to Settings</Link>
                </section>
            </main>

            <footer className="admin-footer">
                <p>&copy; 2025 Admin Panel. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AdminLandingPage;
