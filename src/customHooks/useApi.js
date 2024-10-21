// import axios from "axios";

// async function fetchProducts(){
//     const {data}= await axios.get("/products");
//     return data;
// }

// async function addProduct(newProduct){
//     return axios.post("/products",newProduct);
// }

// async function updateProduct({id,updatedproduct}){
//     return axios.put(`/products/${id}`,updatedproduct);
// }

// async function deleteProduct(id){
//     return axios.delete(`/products/${id}`);
// }

// export {
//     fetchProducts,
//     addProduct,
//     updateProduct,
//     deleteProduct,
// };


import axios from 'axios';

const api = 'https://localhost:3000/products'; // لینک به Swagger یا Mock API

// Create (Add new product)
async function addProduct (product) {
  const response = await axios.post(api, product);
  return response.data;
};

// Read (Get all products)
async function getProducts() {
  const response = await axios.get(api);
  return response.data;
}

// Update (Edit product)
async function updateProduct (product) {
  const response = await axios.put(`${api}/${product.id}`, product);
  return response.data;
}

// Delete (Delete product)
async function deleteProduct (productId){
  const response = await axios.delete(`${api}/${productId}`);
  return response.data;
}

// Bulk Delete (Delete multiple products)
async function deleteProductsBulk (productIds) {
  const response = await axios.post(`${api}/bulk-delete`, { ids: productIds });
  return response.data;
}

export {
    addProduct,
    deleteProduct,
    updateProduct,
    getProducts,
    deleteProductsBulk,
}
