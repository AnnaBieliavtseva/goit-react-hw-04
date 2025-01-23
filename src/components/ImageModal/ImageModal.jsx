import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      onAfterOpen={() => document.addEventListener('keydown', handleKeyDown)}
      onAfterClose={() =>
        document.removeEventListener('keydown', handleKeyDown)
      }
      overlayClassName={css.overlay}
      className={css.content}
    >
      <button className={css.button} onClick={onClose}>
        Close ✖
      </button>
      <img src={imageSrc} alt="Large View" className={css.image} />
    </Modal>
  );
};

export default ImageModal;
