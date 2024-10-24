import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";
import AddProductModal from "../modals/AddProductModal";
import { deleteProduct, getProducts, updateProduct } from "../services/api";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import styles from "./ProductsList.module.css"


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
  function openDeleteModal(productId){
    setSelectedProduct(productId);
    setIsDeleteProductModalOpen(true);
  }
  if(isLoading) return <p>Loading...</p>
  if (error) return <div>Error loading products</div>;

  return (
    <>
    <div>
    <button onClick={openEditModal}>افزودن محصول</button>
    </div>


  <div className={styles.tabaleContainer} >
    <table className={styles.table}>
      <thead>
        <tr>
          <th>نام کالا</th>
          <th>موجودی</th>
          <th>قیمت</th>
          <th>شناسه</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(products) && products.map(product=><tr key={product.id}>
          <td><p>{product.name}</p></td>
          <td><p>{product.quantity}</p></td>
          <td><p>{product.price}</p></td>
          <td><p>{product.id}</p></td>
          <td><button onClick={() => openEditModal(product)}><MdEdit/></button></td>
          <td><button onClick={() => openDeleteModal(product.id)}><MdDeleteOutline/></button></td>
          </tr>)}
      </tbody>
    </table>
  </div>

    </>
  )
}

export default ProductsList