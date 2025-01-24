import './stylesheets/text-elements.css'
import './stylesheets/form-elements.css'
import './stylesheets/custom-components.css'
import './stylesheets/theme.css'
import './stylesheets/alignments.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
