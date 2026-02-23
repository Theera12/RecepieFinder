import RecepieCard from '../components/RecepieCard';
import styles from './Home.module.css';
import { useState } from 'react';
function Home() {
  const recepies = [
    { id: 0, title: 'pizza', url: 'www.google.com' },
    { id: 1, title: 'Biriyani', url: 'www.google.com' },
    { id: 2, title: 'ice Cream', url: 'www.google.com' },
    { id: 3, title: 'taco', url: 'www.google.com' },
    { id: 0, title: 'pizza', url: 'www.google.com' },
    { id: 1, title: 'Biriyani', url: 'www.google.com' },
    { id: 2, title: 'ice Cream', url: 'www.google.com' },
    { id: 3, title: 'taco', url: 'www.google.com' },
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const onSearchSubmitForm = (e) => {
    e.preventDefault();
    setSearchQuery('');
  };
  const onFormChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={onSearchSubmitForm}>
          <input
            type="text"
            placeholder="search your recepies..."
            onChange={onFormChange}
            value={searchQuery}
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
