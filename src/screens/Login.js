import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Footer from '../components/Footer';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatchCart();
  const cartItems = useCart();

  useEffect(() => {
    // Check if user is already logged in, if so, redirect to home page
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);

      // Retrieve cart item from local storage and add to cart if available
      const storedItem = localStorage.getItem('cartItem');
      if (storedItem) {
        const { id, name, price, qty, size } = JSON.parse(storedItem);
        dispatch({ type: 'ADD', id, name, price, qty, size });
        localStorage.removeItem('cartItem');
      }

      navigate('/');
    } else {
      alert('Enter Valid Credentials');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (<>

    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className='mb-5'>
        <Navbar />
      </div>
      <div className='container mt-5 pt-6'>
        <form className='w-50 m-auto mt-2 pt-4  pb-5 border bg-dark border-warning rounded' onSubmit={handleSubmit}>
        
          <div className="m-3">
          <h2 className='mb-4 '>Login</h2>
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone.</div>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
          </div>
          <button type="submit" className=" mx-3 m-3 btn btn-warning text-white">Submit</button>
          <Link to="/signup" className="m-3 mx-1 btn btn-white bg-white text-warning">New User</Link>
        </form>
      </div>
    
    </div>
      <Footer />
      </>
  );
}
