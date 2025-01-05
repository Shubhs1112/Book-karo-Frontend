import React, { useState } from "react";
import '../../resources/Register.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userType) {
            setMessage("Please select a user type.");
            return;
        }

        // role is sent as 'Customer' or 'Admin' as expected by the backend
        const role = userType === "customer" ? "Customer" : "Admin";

        const payload = {
            username: username,
            password: password,
            role: role,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone
        };

        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage("Registration successful!");
                setUsername("");
                setPassword("");
                setUserType("");
                setFirstName("");
                setLastName("");
                setEmail("");
                setPhone("");
            } else {
                const data = await response.json();
                setMessage(data.error || "Failed to register. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-header">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="username">Username</label>
                    <input
                        className="register-input"
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="password">Password</label>
                    <input
                        className="register-input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="firstName">First Name</label>
                    <input
                        className="register-input"
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="register-input"
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="email">Email</label>
                    <input
                        className="register-input"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <label className="register-label" htmlFor="phone">Phone</label>
                    <input
                        className="register-input"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="register-form-group">
                    <span className="register-label">User Type</span>
                    <div className="register-checkbox-group">
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="customer"
                                checked={userType === "customer"}
                                onChange={() => handleUserTypeChange("customer")}
                            />
                            Customer
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="userType"
                                value="admin"
                                checked={userType === "admin"}
                                onChange={() => handleUserTypeChange("admin")}
                            />
                            Admin
                        </label>
                    </div>
                </div>
                <button className="register-button" type="submit">Register</button>
            </form>
            {message && <div className="register-message">{message}</div>}
        </div>
    );
};

export default Register;
