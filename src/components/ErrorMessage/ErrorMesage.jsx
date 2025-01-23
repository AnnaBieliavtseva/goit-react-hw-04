import css from './ErrorMessage.module.css';
import { MdErrorOutline } from 'react-icons/md';

const ErrorMesage = () => {
  return (
    <div>
      <p className={css.text}>
        <MdErrorOutline className={css.icon} />
        Sorry, there are some problems with connection. Please reload the page
        and try again!
      </p>
    </div>
  );
};

export default ErrorMesage;
