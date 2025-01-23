import css from './Loader.module.css'
import { BallTriangle } from 'react-loader-spinner';

export default function Loader() {
  return (
    <div className={css.loader}>
      <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="rgb(145, 64, 222)"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}