import { api } from "./api";

export const getProducts = async () => {
  const { data } = await api.get("/products");
  return data;
};

export const getProduct = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error("Invalid product ID");
    }
    if (error.response?.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error("Failed to fetch product");
  }
};
