/* eslint-disable react/no-unescaped-entities */

import { useState} from 'react'

import './style.css';
import Header from '../component/header';
import { useNavigate } from 'react-router-dom';
const apiBase = import.meta.env.VITE_REACT_APP_BASE

function Login(){
  const [inputValue , setInputValue] = useState({
    email:'',
    password:''
  })
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) =>{
    const {name , value} = e.target;
    setInputValue((preValue )=> ({
      ...preValue,
      [name]: value,
      
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser()
      
    }
  
  async function registerUser() {
    try {
      const res = await fetch(`${apiBase}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputValue),
      })
  
      const data = await res.json(); // Properly parse JSON response
  
      console.log('Response Data:', data); // Log the response data
  
      if (data.user) {
        localStorage.setItem('token', data.user);
        window.location.href = '/todo';
      } else if (data.error === 'Invalid email') {
        setErrors((prevErrors) => ({
          ...prevErrors, email: 'Invalid email'
        }))
      } else if (data.error === 'Invalid password') {
        setErrors((prevErrors) => ({
          ...prevErrors, 
          password: 'Invalid Password'
        }))
      } else {
        alert('An error occurred during login');
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      // Handle fetch errors here
    }
  }
  
  const navigate = useNavigate();
  return (
    <>
      <Header/>
      <div className='Login'>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value= {inputValue.email}
            onChange={handleInputChange}
            required
          />
          <div className='error-message'>{errors.email}</div>
          <br/>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value= {inputValue.password}
            onChange={handleInputChange}
            required
          />
           <div className='error-message'>{errors.password}</div>
          <br/>
          <button type = 'submit'>Log-in</button>
          
          <p> Don't have an account? <span className='link' onClick={() => {navigate('/register')}}>Sign-up</span></p>
          </form>
      </div>
      
    </>
  )
}




export default Login;