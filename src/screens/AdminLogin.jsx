import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/AdminNavbar';
import Footer from '../components/Footer';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Admin logged in successfully, redirect to admin panel
        localStorage.setItem('adminToken', data.token);
        navigate('/admin'); // Navigate to admin panel
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <Navbar />
      <div className="container mt-5 ">
        <div className="row justify-content-center">
          <div className="col-md-6">
        
            <div className="card bg-dark text-light m-auto pt-4  pb-5 border bg-dark border-warning rounded">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-warning text-white">Login</button>
                </form>
             
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
      <Footer />
      </>
  );
};

export default AdminLogin;
