
import axios from 'axios';

// Create (Add new product)
async function addProduct (newProduct) {
  const response = await axios.post("/products",newProduct);
  return response.data;
};

// Read (Get all products)
async function getProducts() {
  const response = await axios.get("/products");
  return response.data;
}

// Update (Edit product)
async function updateProduct (updatedproduct) {
  const response = await axios.put(`/products/${id}`,updatedproduct);
  return response.data;
}

// Delete (Delete product)
async function deleteProduct (id){
  const response = await axios.delete(`/products/${id}`);
  return response.data;
}

// Bulk Delete (Delete multiple products)
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
