import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'api',
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Interceptors
apiClient.interceptors.request.use(
  (request) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE3MzAwNDA0OTIzNjMiLCJ1c2VybmFtZSI6ImhhbmEiLCJpYXQiOjE3MzAyMjIyNDYsImV4cCI6MTczMDIyNTg0Nn0.HXxVE0LWp_BxXhOjajyYpm6DAlDsZ8FV-LsCUTDKm14"

    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

// CRUD Functions
async function addProduct(newProduct) {
  const response = await apiClient.post("/products", newProduct);
  return response;
}

async function getProducts(page, limit) {
  const response = await apiClient.get(`/products?page=${page}&limit=${limit}`);
  console.log(response)
  return response.data; 
}

async function updateProduct(id, updatedProduct) {
  const response = await apiClient.put(`/products/${id}`, updatedProduct);
  return response;
}

async function deleteProduct(id) {
    const response = await apiClient.delete(`/products/${id}`);
    return response;
}

async function deleteProductsBulk(productIds) {
  const response = await apiClient.post("/products/bulk-delete", { ids: productIds });
  return response;
}

export {
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  deleteProductsBulk,
};

