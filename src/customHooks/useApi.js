import { useQuery,useMutation,useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function fetchProducts(){
    const {data}= await axios.get("http://localhost:3000/products");
    return data;
}

async function addProduct(newProduct){
    return axios.post("http://localhost:3000/products",newProduct);
}

async function updateProduct({id,updatedproduct}){
    return axios.put(`http://localhost:3000/products/${id}`,updatedproduct);
}

async function deleteProduct(id){
    return axios.delete(`http://localhost:3000/products/${id}`);
}

export {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
};