import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import NoteState from './context/NoteState';
import Alert from './components/Alert';
import { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import FileUpload from './components/FileUpload';
import FileState from './context/FileState';


function App() {

  const [alert, setAlert] = useState(null)
  const showAlert = (msg) => {
    setAlert({
      message: msg
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500)
  }

  return (
    <>
      <NoteState>
        <FileState>
          <Router>
            <div className="alertcont" style={{ position: 'fixed', top: '0', width: '100%', zIndex: '25' }}>
              <Navbar></Navbar>
              <Alert alert={alert}></Alert>
            </div>
            <div className="conatiner" style={{ marginTop: '5rem' }}>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert}></Home>} />
                <Route exact path="/home" element={<Home showAlert={showAlert}></Home>} />
                <Route exact path="/about" element={<FileUpload></FileUpload>} />
                <Route exact path="/login" element={<Login showAlert={showAlert}></Login>} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert}></Signup>} />
              </Routes>
            </div>
          </Router>
        </FileState>
      </NoteState>
    </>
  );
}

export default App;
