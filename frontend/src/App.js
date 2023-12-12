import './App.css'
import Home from './home/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from './login/Login.jsx'
import Signup from './register/Signup.jsx'
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </div>
  )
}
export default App