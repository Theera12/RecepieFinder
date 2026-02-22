import './App.css';
import Navbar from './components/Navbar';
import Favourites from './pages/Favourites';
import About from './pages/About';
import Home from './pages/Home';
import { Routes, Route } from 'react-router';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
      </Routes>
    </>
  );
}

export default App;
