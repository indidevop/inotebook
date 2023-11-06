
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import NoteState from './contexts/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  
  return (
    // Empty jsx fragment --> <></>
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="container">
            <Routes>
              <Route strict path='/' element={<Home/>}> </Route>
              <Route strict path='/about' element={<About />}> </Route>
              <Route strict path='/login' element={<Login />}> </Route>
              <Route strict path='/signup' element={<Signup />}> </Route>

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
