import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import NoteState from './context/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <Alert message='This page is made by DrLegend' timeout='1000'></Alert>
          <div className="conatiner">
            <Routes>
              <Route exact path="/" element={<Home></Home>} />
              <Route exact path="/home" element={<Home></Home>} />
              <Route exact path="/about" element={<About></About>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
