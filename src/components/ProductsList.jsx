import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";
import AddProductModal from "../modals/AddProductModal";
import { deleteProduct, getProducts, updateProduct } from "../services/api";
import { AiOutlineProduct } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import styles from "./ProductsList.module.css";






function ProductsList() {
   
  const queryClient=useQueryClient();
  const{ data: products = [],isLoading,error}=useQuery({queryKey: ['products'],
    queryFn: getProducts,}) ;
    console.log({ products, isLoading, error });

  const [isDeleteProductModalOpen,setIsDeleteProductModalOpen]=useState(false);
  const [isAddProductModalOpen,setIsAddProductModalOpen]=useState(false);
  const [selectedProduct,setSelectedProduct]=useState(null);
  const mutationDelete=useMutation({
    mutationFn:deleteProduct,
    onSuccess:()=>queryClient.invalidateQueries(["products"])})
  const mutationEdit=useMutation({
    mutationFn: updateProduct,
    onSuccess:()=>queryClient.invalidateQueries(["products"])}
  )
  function openEditModal(product){
    setSelectedProduct(product);
    setIsAddProductModalOpen(true);
  }
  function openDeleteModal(id){
    setSelectedProduct(id);
    setIsDeleteProductModalOpen(true);
  }
  if(isLoading) return <p>Loading...</p>
  console.log("Error fetching products:", error);
  if (error) return <div>Error loading products</div>;

  return (
    <>
<div className={`${styles.productManagement} ${isDeleteProductModalOpen ? "blur(10px)" : ""}`}>

      <div className={styles.header}> 
        <span className={styles.searchIcon}><IoIosSearch /></span>
        <input type="text" placeholder="جستجوی کالا" />
        <div className={styles.managerName}>
           <div className={styles.image}><img src='/manager.jpg'/></div>
           <div className={styles.name}>
           <h3>حنا پورمحبی</h3>
           <p>مدیر</p>
           </div>
        </div>
      </div>

      <div className={styles.addProductHeader}>
        <div className={styles.managerIcon}>
        <span><AiOutlineProduct /></span>
        <h3>مدیریت کالا</h3>
        </div>
        <button>افزودن محصول</button>
      </div>
      <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
           {Array.isArray(products.data) && products?.data?.length > 0 ? products.data.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{product.id}</td>
                <td><button className={styles.editBtn} onClick={() => openEditModal(product)}><FaRegEdit /></button></td>
                <td><button className={styles.deleteBtn} onClick={() => openDeleteModal(product.id)}><RiDeleteBin6Line /></button></td>
              </tr>
            )) :(<tr><td colSpan="6">No products available</td></tr>)}
       </tbody>
      </table>
      </div>


      <AddProductModal
        isOpen={isAddProductModalOpen}
        onRequestClose={() => setIsAddProductModalOpen(false)}
        initialData={selectedProduct}
        onSubmit={(updatedProduct) => {
          if (selectedProduct) {
            mutationEdit.mutate({ id: selectedProduct.id, updatedProduct });
          } else {
            mutationAdd.mutate(updatedProduct);
          }
          setIsAddProductModalOpen(false);
        }}
      />

      <DeleteModal
        isOpen={isDeleteProductModalOpen}
        onRequestClose={() => setIsDeleteProductModalOpen(false)}
        onDelete={() => {
          mutationDelete.mutate(selectedProduct);
          setIsDeleteProductModalOpen(false);
        }}
      />


    </div>

    </>
  )
}

export default ProductsList