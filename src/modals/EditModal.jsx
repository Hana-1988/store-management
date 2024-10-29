import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './EditModal.module.css';

function EditModal ({ isOpen, onRequestClose, initialData,onSubmit}) {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    if (isOpen && initialData) {
      setProduct(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit( product);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.productModal}
      overlayClassName={styles.productModalOverlay}
    >
     <form onSubmit={handleSubmit}>
     <h3>ویرایش اطلاعات</h3>
      <label>نام کالا</label>
      <input
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="نام کالا"
        className={styles.inputField}
      />
      <label>تعداد موجودی</label>
      <input
        name="quantity"
        value={product.quantity}
        onChange={handleChange}
        placeholder="تعداد "
        className={styles.inputField}
      />
      <label>قیمت</label>
      <input
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="قیمت"
        className={styles.inputField}
      />
      <button  type="submit" className={styles.submitBtn}>ثبت اطلاعات جدید</button>
      <button onClick={onRequestClose} className={styles.cancelBtn}>انصراف</button>
     </form>
    </Modal>
  );
}

export default EditModal;



