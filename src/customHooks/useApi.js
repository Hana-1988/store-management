import axios from "axios";

async function fetchProducts(){
    const {data}= await axios.get("/products");
    return data;
}

async function addProduct(newProduct){
    return axios.post("/products",newProduct);
}

async function updateProduct({id,updatedproduct}){
    return axios.put(`/products/${id}`,updatedproduct);
}

async function deleteProduct(id){
    return axios.delete(`/products/${id}`);
}

export {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};