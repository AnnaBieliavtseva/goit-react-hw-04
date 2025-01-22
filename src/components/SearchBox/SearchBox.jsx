import css from './SearchBox.module.css'

export default function SearchBox({ value, onFilter }) {
  return (
    <div>
      <p className={css.searchBoxText}>Find contacts by name</p>
      <input
        type="text"
        value={value}
        className={css.searchBoxInput}
        onChange={(e) => onFilter(e.target.value)}
      />
    </div>
  );
}