/* eslint-disable react/prop-types */
import './navBar.css'

function Navbar({getTodayTask , getCompleted, getTodo, getThisWeekTodo}){
  
  const  getToday = () => {
    getTodayTask();
  }
  const getComplete =()  => {
    getCompleted();
  }

  const getAllTodos = () =>{
     getTodo();
  }

  const GetThisWeekTodo= () =>{
    getThisWeekTodo()
  }
    return (
      <>
      <div className="navBar">
        <h2 onClick={getAllTodos}>All Tasks</h2>
        <h2 onClick={getToday}>Today</h2>
        <h2 onClick={GetThisWeekTodo}>This Week</h2>
        <h2 onClick={getComplete}>Completed</h2>
      </div>
      </>
    )
}

export default Navbar;