import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <div>
      <button type="button" className={css.btn} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
