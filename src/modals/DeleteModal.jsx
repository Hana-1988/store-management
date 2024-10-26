import styles from "./DeleteModal.module.css"
import Modal from 'react-modal';
function DeleteModal({ isOpen, onRequestClose, onDelete }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.deleteModal}
      overlayClassName={styles.deleteModalOverlay}
    >
      <div className={styles.image}><img src='/Close.png'/></div>
      <h3 className={styles.deleteModalTitle}>آیا از حذف این محصول مطمئن هستید؟</h3>
      <button onClick={onDelete} className={styles.deleteBtn}>حذف</button>
      <button onClick={onRequestClose} className={styles.cancelBtn}>لغو</button>
    </Modal>
  )
}

export default DeleteModal