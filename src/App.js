import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route
              exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
