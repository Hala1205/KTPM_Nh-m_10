import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const { clearCart } = useCartStore();
	const [error, setError] = useState(null);
	const [orderId, setOrderId] = useState("");

	useEffect(() => {
		const handleCheckoutSuccess = async (sessionId) => {
			try {
				const response = await axios.post("/payments/checkout-success", {
					sessionId,
				});
				setOrderId(response.data.orderId || "");
				clearCart();
			} catch (error) {
				setError(error.response?.data?.message || "Không thể hoàn tất đơn hàng");
			} finally {
				setIsProcessing(false);
			}
		};

		const sessionId = new URLSearchParams(window.location.search).get("session_id");
		if (sessionId) {
			handleCheckoutSuccess(sessionId);
		} else {
			setIsProcessing(false);
			setError("Không tìm thấy mã phiên đặt hàng");
		}
	}, [clearCart]);

	if (isProcessing) return "Đang xử lý...";

	if (error) return `Lỗi: ${error}`;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-stone-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-yellow-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-yellow-400 mb-2'>
						Đặt hàng thành công!
					</h1>

					<p className='text-stone-300 text-center mb-2'>
						Cảm ơn bạn đã đặt hàng. Chúng tôi đang xử lý đơn.
					</p>
					<p className='text-yellow-400 text-center text-sm mb-6'>
						Đây là thanh toán mô phỏng. Không có khoản tiền nào được thu.
					</p>
					<div className='bg-stone-700 rounded-lg p-4 mb-6'>
						<div className='flex items-center justify-between mb-2'>
							<span className='text-sm text-stone-400'>Mã đơn hàng</span>
							<span className='text-sm font-semibold text-yellow-400'>#{orderId.slice(0, 8)}</span>
						</div>
						<div className='flex items-center justify-between'>
							<span className='text-sm text-stone-400'>Thời gian giao hàng dự kiến</span>
							<span className='text-sm font-semibold text-yellow-400'>3–5 ngày làm việc</span>
						</div>
					</div>

					<div className='space-y-4'>
						<button
							className='w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Cảm ơn bạn đã tin tưởng!
						</button>
						<Link
							to={"/"}
							className='w-full bg-stone-700 hover:bg-stone-600 text-yellow-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Tiếp tục mua sắm
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
export default PurchaseSuccessPage;
