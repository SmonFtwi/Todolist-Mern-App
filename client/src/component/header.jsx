import { useNavigate } from "react-router-dom"
import './header.css'

function Header(){
    const navigate = useNavigate();
    return (
      <div className="header"> 
       <h1 onClick={() => {navigate('/')}}> Todo List</h1>
       <div className="nav">
           <button onClick={() => {navigate('/login')}}>Log-in</button>
           <button onClick={() => {navigate('/register')}}>Sign-up</button>
       </div>
      </div>
    )
  }


  export default Header;