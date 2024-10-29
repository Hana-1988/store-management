import styles from "./Pagination.module.css"

function Pagination ({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.container}>
      <button 
        onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}> بعدی</button>
      <span>{currentPage} </span>
      <span>{currentPage + 1} </span>
      <button 
        onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>قبلی</button>
    </div>
  );
};

export default Pagination;
