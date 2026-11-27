import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useProductStore = create((set) => ({
    products: [], loading: false, error: null, pagination: null,
    setProducts: (products) => set({ products }),
    createProduct: async (productData) => { set({ loading: true }); try { const res = await axios.post("/products", productData); set((s) => ({ products: [...s.products, res.data], loading: false })); } catch (error) { toast.error(error.response?.data?.error || "Không thể thêm sản phẩm"); set({ loading: false }); } },
    fetchAllProducts: async (params = {}) => {
        set({ loading: true, error: null });
        try { const query = new URLSearchParams(); Object.entries(params).forEach(([key, value]) => { if (value !== "" && value !== undefined && value !== null) query.set(key, value); }); const response = await axios.get(`/products${query.toString() ? `?${query}` : ""}`); set({ products: response.data.products || [], pagination: response.data.pagination || null, loading: false }); return response.data; }
        catch (error) { set({ error: "Không thể tải sản phẩm", loading: false }); toast.error(error.response?.data?.message || error.response?.data?.error || "Không thể tải sản phẩm"); return null; }
    },
    fetchProductsByCategory: async (category, params = {}) => {
        set({ loading: true, error: null });
        try { const query = new URLSearchParams({ category, ...Object.fromEntries(Object.entries(params).filter(([, value]) => value !== "" && value !== undefined && value !== null)) }); const response = await axios.get(`/products?${query}`); set({ products: response.data.products || [], pagination: response.data.pagination || null, loading: false }); return response.data; }
        catch (error) { set({ error: "Không thể tải sản phẩm", loading: false }); toast.error(error.response?.data?.message || error.response?.data?.error || "Không thể tải sản phẩm"); return null; }
    },
    fetchProductById: async (id) => { try { const response = await axios.get(`/products/${id}`); return response.data; } catch (error) { toast.error(error.response?.data?.message || "Không tìm thấy sản phẩm"); return null; } },
    deleteProduct: async (productId) => { set({ loading: true }); try { await axios.delete(`/products/${productId}`); set((s) => ({ products: s.products.filter((p) => p._id !== productId), loading: false })); } catch (error) { set({ loading: false }); toast.error(error.response?.data?.error || "Không thể xóa sản phẩm"); } },
    toggleFeaturedProduct: async (productId) => { set({ loading: true }); try { const response = await axios.patch(`/products/${productId}/feature`); set((s) => ({ products: s.products.map((p) => p._id === productId ? { ...p, isFeatured: response.data.isFeatured } : p), loading: false })); } catch (error) { set({ loading: false }); toast.error(error.response?.data?.error || "Không thể cập nhật sản phẩm nổi bật"); } },
    updateProduct: async (productId, updatedData) => { set({ loading: true }); try { const res = await axios.put(`/products/${productId}`, updatedData); set((s) => ({ products: s.products.map((p) => p._id === productId ? res.data.product : p), loading: false })); toast.success("Đã cập nhật sản phẩm"); } catch (error) { set({ loading: false }); toast.error(error.response?.data?.message || "Không thể cập nhật sản phẩm"); } },
    fetchFeaturedProducts: async () => { set({ loading: true }); try { const response = await axios.get("/products/featured"); set({ products: response.data, pagination: null, loading: false }); } catch (error) { set({ error: "Không thể tải sản phẩm", loading: false }); toast.error("Không thể tải sản phẩm nổi bật"); } },
}));
