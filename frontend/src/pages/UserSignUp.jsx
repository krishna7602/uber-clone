import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message
    const newUser = {
      fullName: { firstName, lastName },
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem('token', data.token);
        setUser(data.user);
        navigate('/user/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessage('This email is already registered. Please log in.');
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <div className="h-screen bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?q=80&w=2355&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex justify-between flex-col w-full bg-red-400">
        <img
          className="w-20 py-8 pl-9"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />
        <div className="bg-slate-100 py-5 px-10 rounded-lg">
          <h2 className="text-2xl pb-7 flex justify-center font-bold">
            Get Started with Uber
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="py-2 px-3 rounded-lg mb-3"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="py-2 px-3 rounded-lg mb-3"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="py-2 px-3 rounded-lg mb-3"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="py-2 px-3 rounded-lg mb-3"
            />
            <button
              type="submit"
              className="bg-black text-white py-3 rounded-xl mt-2"
            >
              Continue
            </button>
          </form>
          <p>
            Already have an account?
            <Link
              to="/user/login"
              className="flex items-center justify-center w-full bg-black text-white py-3 rounded-xl mt-2 mb-5"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
