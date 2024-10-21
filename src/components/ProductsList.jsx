import { useState } from "react";
import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";
import AddProductModal from "../modals/AddProductModal";
import { deleteProduct, getProducts, updateProduct } from "../customHooks/useApi";
import { MdDeleteOutline } from "react-icons/md";
import { MdEdit } from "react-icons/md";


function ProductsList() {
   
  const queryClient=useQueryClient();
  const{data:products,isLoading,error}=useQuery({queryKey: ['products'],
    queryFn: getProducts,}) ;
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


  <div>
    <table>
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
      {/* <tbody>
        {products.map(product=><tr key={product.id}>
          <td><p>{product.name}</p></td>
          <td><p>{product.quantity}</p></td>
          <td><p>{product.price}</p></td>
          <td><p>{product.id}</p></td>
          <td><button onClick={() => openEditModal(product)}><MdEdit/></button></td>
          <td><p><button onClick={() => openDeleteModal(product.id)}><MdDeleteOutline/></button></td>
          </tr>)}
      </tbody> */}
    </table>
  </div>

    </>
  )
}

export default ProductsList