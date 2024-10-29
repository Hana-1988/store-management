import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './AddProductModal.module.css';

function AddProductModal({ isOpen, onRequestClose, onSubmit, product: initialProduct }) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(product);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.productModal}
      overlayClassName={styles.productModalOverlay}
    >
      <h3>ایجاد محصول جدید</h3>
      <div>
      <label>نام کالا</label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="نام کالا"
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
        <label>تعداد موجودی</label>
        <input
          name="quantity"
          value={product.quantity}
          onChange={handleChange}
          placeholder="تعداد"
          className={styles.inputField}
        />
       
        <button onClick={handleSubmit} type="submit" className={styles.submitBtn}>ایجاد</button>
        <button type="button" onClick={onRequestClose} className={styles.cancelBtn}>انصراف</button>
      </div>
    </Modal>
  );
};

export default AddProductModal;

