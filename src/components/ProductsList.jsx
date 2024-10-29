import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteModal from "../modals/DeleteModal";
import AddProductModal from "../modals/AddProductModal";
import EditModal from "../modals/EditModal";
import Pagination from "../modules/Pagination";
import { addProduct ,deleteProduct, getProducts, updateProduct } from "../services/api";
import { AiOutlineProduct } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import styles from "./ProductsList.module.css";

function ProductsList() {
  const queryClient = useQueryClient();
  const [page,setPage]=useState(1);
  const limit = 10;

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, limit), 
    keepPreviousData: true,
  });


  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const mutationDelete = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
  
  const mutationEdit = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });
  const mutationAdd = useMutation({
    mutationFn: addProduct,
    onSuccess: () => queryClient.invalidateQueries(["products"]),
  });

  function openEditModal(product) {
    setSelectedProduct(product);
    setIsEditProductModalOpen(true);
  }
  
  function openDeleteModal(id) {
    setSelectedProduct(id);
    setIsDeleteProductModalOpen(true);
  }
  
  function openAddModal() { 
    setSelectedProduct(null);
    setIsAddProductModalOpen(true);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <div>Error loading products</div>;
  const totalPages = Math.ceil(products.totalProducts / limit);

  return (
    <>
      <div className={styles.productManagement}>
        <div className={styles.header}>
          <span className={styles.searchIcon}><IoIosSearch /></span>
          <input type="text" placeholder="جستجوی کالا" />
          <div className={styles.managerName}>
            <div className={styles.image}><img src='/manager.jpg' /></div>
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
          <button onClick={openAddModal}>افزودن محصول</button>
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
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td>{product.id}</td>
                    <td><button className={styles.editBtn} onClick={() => openEditModal(product)}><FaRegEdit /></button></td>
                    <td><button className={styles.deleteBtn} onClick={() => openDeleteModal(product.id)}><RiDeleteBin6Line /></button></td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No products available</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <AddProductModal
          isOpen={isAddProductModalOpen}
          onRequestClose={() => setIsAddProductModalOpen(false)}
          onSubmit={(newProduct) => {
            mutationAdd.mutate(newProduct);
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

        <EditModal 
          isOpen={isEditProductModalOpen}
          onRequestClose={() => setIsEditProductModalOpen(false)}
          initialData={selectedProduct}
          onSubmit={(updatedProduct) => {
            console.log('Updating Product:', { id: selectedProduct.id, ...updatedProduct });
            mutationEdit.mutate({ id: selectedProduct.id, ...updatedProduct });
            setIsEditProductModalOpen(false);
          }}
        />
      </div>
      <Pagination 
       currentPage={page} 
       totalPages={totalPages} 
       onPageChange={setPage} 
      />
    </>
  );
}

export default ProductsList;
