import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'api', // آدرس پایه API بک‌اند
});

// اضافه کردن محصول جدید (POST)
async function addProduct(newProduct) {
  const response = await apiClient.post("/products", newProduct);
  return response.data;
}

// دریافت لیست محصولات (GET)
async function getProducts() {
  const response = await apiClient.get("/products");
  return response.data;
}

// به‌روزرسانی محصول (PUT)
async function updateProduct(id, updatedProduct) {
  const response = await apiClient.put(`/products/${id}`, updatedProduct);
  return response.data;
}

// حذف یک محصول (DELETE)
async function deleteProduct(id) {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
}

// حذف گروهی محصولات (POST)
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
