import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from'./AddProductModal.module.css';

function AddProductModal ({ isOpen, onRequestClose, initialData, onSubmit }){
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: ''
  });

  useEffect(() => {
    if (initialData) {
      setProduct(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
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
      <h3>{initialData ? 'ویرایش محصول' : 'ایجاد محصول جدید'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="نام کالا"
          className={styles.inputField}
        />
        <input
          name="stock"
          value={product.quantity}
          onChange={handleChange}
          placeholder="تعداد موجودی"
          className={styles.inputField}
        />
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="قیمت"
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'ثبت اطلاعات جدید' : 'ایجاد'}
        </button>
        <button onClick={onRequestClose} className={styles.cancelBtn}>انصراف</button>
      </form>
    </Modal>
  );
};

export default AddProductModal;
