import Header from './component/header'
import './App.css'
import img from './assets/Capture.png'


function App(){
  
  return (
    <> 
      <Header/>
      <div className='homeContent'>
        
        <h2>Start decluttering your life today. Your to-do list, your way.</h2>
        <img src={img}></img>
        
        <h3>Join thousands of satisfied users who trust us to keep them organized and productive.</h3>
      </div>
    </>
  )
}


export default App
