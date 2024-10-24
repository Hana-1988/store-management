
import axios from 'axios';

async function addProduct (newProduct) {
  const response = await axios.post("/products",newProduct);
  return response.data;
}

async function getProducts() {
  const response = await axios.get("/products");
  return response.data;
}

async function updateProduct (updatedproduct) {
  const response = await axios.put(`/products/${id}`,updatedproduct);
  return response.data;
}

async function deleteProduct (id){
  const response = await axios.delete(`/products/${id}`);
  return response.data;
}

async function deleteProductsBulk (productIds) {
  const response = await axios.post("/products/bulk-delete", { ids: productIds });
  return response.data;
}

export {
    addProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    deleteProductsBulk,
}
