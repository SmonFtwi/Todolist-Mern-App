
/* import { useContext } from "react";
import { TodoContextProvider } from "../context"; */
import './todo.css'
import { useState, useEffect } from 'react'
const api_base = 'https://todolist-mern-app.vercel.app';
import {X, PencilSimpleLine ,Trash, List} from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
//import { decode } from 'react-jwt';
import Navbar from '../component/navBar/navBar';


function Todo() {
  const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
  const [updatePopupActive, setUpdatePopupActive] = useState(false);
  const [listClicked, setListClicked] = useState(false);
	const [newTodo, setNewTodo] = useState({
    title:"",
    dueDate:"",
    complete: false
  });

  const authToken =  localStorage.getItem('token'); // Retrieve the JWT token from local storage
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
                };

	useEffect(() => {
    GetTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const GetTodos = () => {
    

    // Use the 'headers' object when making requests to the server
    fetch(api_base + '/todo', {
        method: 'GET',
        headers,
    })
    .then((res) => res.json())
    .then((data) => {
         
        setTodos(data);
      })
    .catch((err) => console.error('Error: ', err));
    };
    const GetCompeleted = () => {
      // Use the 'headers' object when making requests to the server
      fetch(api_base + `/todo/completed`, {
          method: 'GET',
          headers,
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('api not working ')
          setTodos(data);
          
        })
      .catch((err) => console.error('Error: ', err));
};
   
const GetTodayTask = () => {
      
      fetch(api_base + `/todo/today`, {
      method: 'GET',
      headers,
  })
  .then((res) => res.json())
  .then((data) => {
      setTodos(data);
    })
  .catch((err) => console.error('Error: ', err));
    }
    const GetThisWeekTask = () => {
      
      fetch(api_base + `/todo/thisWeek`, {
      method: 'GET',
      headers,
  })
  .then((res) => res.json())
  .then((data) => {
      setTodos(data);
    })
  .catch((err) => console.error('Error: ', err));
    }


	const addTodo = async () => {
         
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers,
			body: JSON.stringify(newTodo)
		}).then(res => res.json());
		setTodos([...todos, data]);
		setPopupActive(false);
		setNewTodo({title:"", dueDate:"", complete: false});
	}
	

  const deleteTodo = async (id) => {
    try {
      await fetch(api_base + '/todo/delete/' + id, { 
        method: "DELETE" ,
        headers,
    });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      GetTodos(); // Re-fetch the updated list
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };
  
	const toggleCompletion = async (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo._id === id) {
        // Toggle the completion status
        todo.complete = !todo.complete;
      }
      return todo;
    });

    // Update the state and send the request to update the server
    setTodos(updatedTodos);

    try {
      await fetch(api_base + '/todo/complete/' + id, {
        method: "PUT",
        headers,
      });
    } catch (error) {
      console.error("Error toggling completion status: ", error);
    }
  };
  const updateTask = async (id, updatedData) => {
    try {
      // Send a PUT request to the server to update the task
      await fetch(api_base + '/todo/update/' + id, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData), // Send the updated data to the server
      });
  
      // Update the state with the updated data
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, ...updatedData }; // Merge the updated data into the task
        }
        return todo;
      });
  
      setTodos(updatedTodos);
      setUpdatePopupActive(false);
		setNewTodo({title:"", dueDate:"", complete: false});
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };
  
  const toggleUpdatePopup = (id) => {
    setUpdatePopupActive((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const navigate = useNavigate();
 
  return (
    <>
		
            <div className="header"> 
            <div className='List'onClick={() => setListClicked(!listClicked)}><List size={32} /></div>
           <h1> Todo List</h1>
           <div className="nav">
           <button onClick={() => {navigate('/login')}}>Log-out</button>
           
            </div>
            </div>
            
    <div className="App" style={{ gridTemplateColumns: listClicked ? '1fr' : '1fr 4fr'  }  }>
    {listClicked ? null : (
    <Navbar
      getTodayTask={GetTodayTask}
      getCompleted={GetCompeleted}
      getTodo={GetTodos}
      getThisWeekTodo={GetThisWeekTask}
    />
  )}
      <div className="todoContent" style={{ marginLeft: listClicked ? '5vw' : '2vw'  } }>
			<h1>Welcome</h1>
			<h4>Your tasks</h4>

			<div className="todos">
				{todos.length > 0 ? todos.map(todo => (
					<div className='todo' key={todo._id} >
					<button
              className={`toggle-button ${todo.complete ? 'completed' : 'in-progress'}`}
              onClick={() => toggleCompletion(todo._id)}
            >
           <span className="slider round"></span>
           </button>
						<div className="text">{todo.title}</div>
            <div className="dueDate">due date: {todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : ""}</div>
						<div className='edit-todo' onClick={() => toggleUpdatePopup(todo._id)}> <PencilSimpleLine size={32} /></div>
            {updatePopupActive[todo._id] ? (
              <div className="popup">
                <div className="closePopup" onClick={() => toggleUpdatePopup(todo._id)}><X size={32}/></div>
                <div className="content">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateTask(todo._id, { title: newTodo.title, dueDate: newTodo.dueDate });
                    toggleUpdatePopup(todo._id); // Close the edit popup
                  }}>
                    <h2>Update Task</h2>
                    <input
                      type="text"
                      className="add-todo-input"
                      onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                      value={newTodo.title}
                      required
                    />
                    <input
                      type="date"
                      className="add-todo-input"
                      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
                      value={newTodo.dueDate}
                      required
                    />
                    <button type='submit'>Update</button>
                  </form>
                </div>
              </div>
            ) : '' }
    

            <div className="delete-todo"  onClick={() => deleteTodo(todo._id)}><Trash size={32} /></div>

					</div>
				)) : (
					<p>You currently have no tasks</p>
				)}
			</div>
 
      <div className="btnContainer">
  <button className="addBtn" onClick={() => setPopupActive(true)}>+</button>
  </div>
  {popupActive ? (
				<div className="popup">
					<div className="closePopup" onClick={() => setPopupActive(false)}><X size={32}/></div>
					<div className="content">
            <form onSubmit={addTodo}>
						<h2>Add Task</h2>
						<input type="text" 
              className="add-todo-input" 
              onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              value={newTodo.title} 
              required
              maxLength={35}
              />
            <input 
             type="date" 
              className="add-todo-input" 
              onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              value={newTodo.dueDate} 
              required />
					<button type='submit'> ADD </button>
            </form>
					</div>
				</div>
			) : ''}


    </div>
    </div>
    </>
	);
}
export default Todo


