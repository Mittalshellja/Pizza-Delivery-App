import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './Screens/MyOrder';


function App() {
  return (
    <div className="App">
      <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route
              exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/myOrder" element={<MyOrder/>} />
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </div>
  );
}

export default App;
