import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'api',
});


async function addProduct(newProduct) {
  const response = await apiClient.post("/products", newProduct);
  console.log("API Response:", response.data);
  return response.data;
}

async function getProducts() {
  const response = await apiClient.get("/products");
  return response.data;
}

async function updateProduct(id, updatedProduct) {
  const response = await apiClient.put(`/products/${id}`, updatedProduct);
  return response.data;
}


async function deleteProduct(id) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

async function deleteProductsBulk(productIds) {
  const response = await apiClient.post("/products/bulk-delete", { ids: productIds });
  return response.data;
}

export {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  deleteProductsBulk,
};
