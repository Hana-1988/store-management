import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";
import AddProductModal from "../modals/AddProductModal";
import { deleteProduct, fetchProducts, updateProduct } from "../customHooks/useApi";


function ProductsList() {
   
  const queryClient=useQueryClient();
  const{data:products,isLoading}=useQuery({queryKey: ['products'],
    queryFn: fetchProducts,}) ;
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

  return (
    <>
    <button onClick={openEditModal}>افزودن محصول</button>

    {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.quantity}</p>
          <p>{product.price}</p>
          <p>{product.id}</p>
          <button onClick={() => openEditModal(product)}>ویرایش</button>
          <button onClick={() => openDeleteModal(product.id)}>حذف</button>
        </div>
      ))}
    </>
  )
}

export default ProductsList