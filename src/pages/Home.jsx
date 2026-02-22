import RecepieCard from '../components/RecepieCard';
import styles from './Home.module.css';
import { useState } from 'react';
function Home() {
  const recepies = [
    { id: 0, title: 'pizza', url: 'www.google.com' },
    { id: 1, title: 'Biriyani', url: 'www.google.com' },
    { id: 2, title: 'ice Cream', url: 'www.google.com' },
    { id: 3, title: 'taco', url: 'www.google.com' },
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmitForm = (e) => {
    e.preventDefault();
    console.log(searchQuery);
  };
  const handleFormChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className={styles.mainContainer}>
      <div>
        <form onSubmit={handleSearchSubmitForm}>
          <input
            type="text"
            placeholder="search Your recepies..."
            onChange={handleFormChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={styles.homeContainer}>
        {recepies.map((recepie) => (
          <RecepieCard recepie={recepie} key={recepie.id} />
        ))}
      </div>
    </div>
  );
}
export default Home;
