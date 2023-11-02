import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css';
import Header from '../component/header';
const apiBase = import.meta.env.VITE_REACT_APP_BASE

function Register(){
  const [inputValue , setInputValue] = useState({
    name:'',
    email:'',
    password:''
  })


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
  

  async function  registerUser() {
    const res= await fetch(`${apiBase}/register`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }, 
     body:JSON.stringify(
      inputValue
     )
  });
  const data= await res.json
  console.log(data);
  window.location.href = '/login';

  }
  const navigate = useNavigate();
  return (
    <>
      <Header/>
      <div className='form'>
        
        <form onSubmit={handleSubmit}>
        <h1>Sign-up</h1>
          <input
            type='text'
            name='name'
            placeholder='Name'
            value= {inputValue.name}
            onChange={handleInputChange}
            required
          />
          <br/>
          <input
            type='email'
            name='email'
            placeholder='Email'
            value= {inputValue.email}
            onChange={handleInputChange}
            required
          />
          <br/>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value= {inputValue.password}
            onChange={handleInputChange}
            required
          />
          <br/>
          <button type = 'submit'>Sign-up</button>
          <p>Already have an account? <span className='link' onClick={() => {navigate('/login')}}>Login</span></p>
          </form>
          
      </div>
      
    </>
  )
}




export default Register;