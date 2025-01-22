import css from './SearchBar.module.css';
import { IoIosSearch } from 'react-icons/io';

export default function SearchBar({ onSearch }) {
  
  const handleSubmit = evt => {
    evt.preventDefault();
    const inputValue = evt.target.elements.input;
    if (!inputValue.value.trim()) {
      alert('Please enter search term!');
      return;
    }
    console.log(inputValue.value);
    onSearch(inputValue.value)
    evt.target.reset();
  };


  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn} type="submit">
          <IoIosSearch className={css.icon} />
        </button>
      </form>
    </header>
  );
}
