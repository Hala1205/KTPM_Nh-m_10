import axios from "axios";
import { productLabel, displayProduct } from "./labels";

const serverMessages = {
    "Please log in": "Vui lòng đăng nhập",
    "Admin only": "Chỉ quản trị viên được sử dụng chức năng này",
    "Invalid credentials": "Email hoặc mật khẩu không đúng",
    "Invalid registration": "Thông tin đăng ký không hợp lệ",
    "Already exists": "Thông tin này đã tồn tại",
    "Not found": "Không tìm thấy dữ liệu",
    "Product not found": "Không tìm thấy sản phẩm",
    "Cart empty": "Giỏ hàng đang trống",
    "Address required": "Vui lòng chọn địa chỉ giao hàng",
    "An item exceeds available stock": "Số lượng sản phẩm vượt quá tồn kho",
    "An item is out of stock": "Một sản phẩm đã hết hàng",
    "Invalid coupon": "Mã giảm giá không hợp lệ",
    "Session not found": "Không tìm thấy phiên đặt hàng",
    "Cannot cancel": "Không thể hủy đơn hàng này",
    "Message received": "Đã nhận tin nhắn",
    "Received": "Đã nhận tin nhắn",
    "Subscribed": "Đã đăng ký nhận bản tin",
    "Unsubscribed": "Đã hủy đăng ký bản tin",
    "Subject and content required": "Vui lòng nhập chủ đề và nội dung",
};

const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

const localizeProducts = (value) => {
    if (Array.isArray(value)) return value.map(localizeProducts);
    if (value && typeof value === "object") {
        const translated = value.category && value.name ? displayProduct(value) : { ...value };
        if (typeof translated.name === "string") translated.name = productLabel(translated.name);
        if (typeof translated.message === "string") translated.message = serverMessages[translated.message] || translated.message;
        for (const key of Object.keys(translated)) translated[key] = localizeProducts(translated[key]);
        return translated;
    }
    return value;
};

axiosInstance.interceptors.response.use((response) => {
    response.data = localizeProducts(response.data);
    return response;
});

axiosInstance.interceptors.response.use(undefined, (error) => {
    if (error.response?.data) error.response.data = localizeProducts(error.response.data);
    return Promise.reject(error);
});

export default axiosInstance;
