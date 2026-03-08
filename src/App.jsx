import './App.css';
import Navbar from './shared/Navbar';
import Favourites from './pages/Favourites';
import MyRecipes from './pages/MyRecipes';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import MealDetails from './features/MealDetails';
import MyShopping from './features/MyShopping';
import Footer from './shared/Footer';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/myrecipes" element={<MyRecipes />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/meal/:mealId" element={<MealDetails />} />
        <Route path="/myshopping" element={<MyShopping />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
