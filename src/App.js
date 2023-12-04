
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './components/NoteState';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
import Alert from './Alert';


function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2500);
  }

  return (
    <>
    <div>
    <NoteState showAlert={showAlert}>
    <Router>
      <Navbar title="iNotebook"/>
      <div style={{height:"40px"}}><Alert alert={alert}/></div>
        <div className='container my-3'>
        <Routes>
          <Route exact path="/" element = {<Home/>}></Route>
          <Route exact path="/about" element = {<About/>}></Route>
          <Route exact path="/signup" element = {<Signup showAlert = {showAlert}/>}></Route>
          <Route exact path="/login" element = {<Login showAlert = {showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </div>
    </>
  );
}

export default App;
