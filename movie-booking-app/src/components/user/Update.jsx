import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../resources/Register.css';

const UpdateProfile = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    // Access the Redux state
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Simulate fetching the current user's profile data from the API
    useEffect(() => {
        // Simulate an API call to get the user's profile
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:8080/${user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Set the user profile data
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setEmail(data.email);
                    setPhone(data.phone);
                } else {
                    setMessage('Failed to fetch user profile');
                }
            } catch (error) {
                setMessage('An error occurred while fetching the profile');
            }
        };

        fetchUserProfile();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create the updated profile payload
        const payload = {
            username: username, // username should not be updated
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
        };

        try {
            const response = await fetch(`http://localhost:8080/${user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage('Profile updated successfully!');
            } else {
                const data = await response.json();
                setMessage(data.error || 'Failed to update profile');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-header">Update Profile</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="username">Username:</label>
                    <input
                        className="register-input"
                        type="text"
                        id="username"
                        value={username}
                        disabled
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="firstName">First Name:</label>
                    <input
                        className="register-input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="lastName">Last Name:</label>
                    <input
                        className="register-input"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="email">Email:</label>
                    <input
                        className="register-input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="phone">Phone:</label>
                    <input
                        className="register-input"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button className="register-button" type="submit">Update</button>
            </form>
            {message && <div className="register-message">{message}</div>}
        </div>
    );
};

export default UpdateProfile;
