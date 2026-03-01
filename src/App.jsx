import './App.css';
import Navbar from './shared/Navbar';
import Favourites from './pages/Favourites';
import About from './pages/About';
import Home from './pages/Home';
import MealDetails from './features/MealDetails';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/:MealId" element={<MealDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
