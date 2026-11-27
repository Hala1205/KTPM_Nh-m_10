import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
export const useOrderStore = create((set) => ({
    orders: [], loading: false,
    fetchMyOrders: async () => { set({ loading: true }); try { const { data } = await axios.get("/orders"); set({ orders: data.orders, loading: false }); } catch (error) { set({ loading: false }); toast.error(error.response?.data?.message || "Không thể tải đơn hàng"); } },
    fetchAllOrders: async () => { set({ loading: true }); try { const { data } = await axios.get("/orders/admin"); set({ orders: data.orders, loading: false }); } catch (error) { set({ loading: false }); toast.error(error.response?.data?.message || "Không thể tải đơn hàng"); } },
    updateOrderStatus: async (orderId, status, trackingNumber = "", carrier = "") => { try { const { data } = await axios.patch(`/orders/${orderId}/status`, { status, trackingNumber, carrier }); set((state) => ({ orders: state.orders.map((order) => order._id === orderId ? data.order : order) })); toast.success("Đã cập nhật đơn hàng"); } catch (error) { toast.error(error.response?.data?.message || "Không thể cập nhật đơn hàng"); } },
    cancelOrder: async (orderId) => { try { const { data } = await axios.post(`/orders/${orderId}/cancel`); set((state) => ({ orders: state.orders.map((order) => order._id === orderId ? data.order : order) })); toast.success(data.message); return true; } catch (error) { toast.error(error.response?.data?.message || "Không thể hủy đơn hàng"); return false; } },
}));
