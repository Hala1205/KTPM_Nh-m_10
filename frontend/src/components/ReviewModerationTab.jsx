import { useEffect, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const ReviewModerationTab = () => {
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState("pending");
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try { const { data } = await axios.get(`/reviews?status=${status}`); setReviews(data.reviews || []); }
        catch (error) { toast.error(error.response?.data?.message || "Không thể tải đánh giá"); }
        finally { setLoading(false); }
    };
    useEffect(() => { load(); }, [status]);

    const moderate = async (id, nextStatus) => {
        try { const { data } = await axios.patch(`/reviews/${id}`, { status: nextStatus }); setReviews((items) => items.filter((item) => item._id !== id)); toast.success(`Đã cập nhật đánh giá`); if (data.review?.status !== status) return; }
        catch (error) { toast.error(error.response?.data?.message || "Không thể cập nhật đánh giá"); }
    };
    const remove = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;
        try { await axios.delete(`/reviews/${id}`); setReviews((items) => items.filter((item) => item._id !== id)); toast.success("Đã xóa đánh giá"); }
        catch (error) { toast.error(error.response?.data?.message || "Không thể xóa đánh giá"); }
    };

    return <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><h2 className="text-2xl font-semibold">Duyệt đánh giá</h2><select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-stone-600 bg-stone-700 px-3 py-2"><option value="pending">Chờ duyệt</option><option value="approved">Đã duyệt</option><option value="rejected">Đã từ chối</option></select></div>
        {loading ? <p className="text-stone-400">Đang tải đánh giá…</p> : !reviews.length ? <p className="text-stone-400">Chưa có đánh giá nào ở trạng thái này.</p> : <div className="space-y-4">{reviews.map((review) => <article key={review._id} className="rounded-lg border border-stone-700 bg-stone-800 p-5"><div className="flex flex-col sm:flex-row justify-between gap-3"><div><h3 className="font-semibold">{review.product?.name || "Sản phẩm đã xóa"}</h3><p className="text-sm text-stone-400">{review.user?.name || "Khách hàng"} · {review.user?.email || ""}</p></div><span className="text-yellow-400">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span></div>{review.title && <h4 className="mt-3 font-medium">{review.title}</h4>}<p className="mt-2 text-stone-300">{review.comment}</p>{review.verifiedPurchase && <p className="mt-2 text-xs text-green-400">Đã mua hàng</p>}<div className="mt-4 flex flex-wrap gap-2">{status !== "approved" && <button onClick={() => moderate(review._id, "approved")} className="inline-flex items-center gap-1 rounded bg-green-700 px-3 py-2 text-sm hover:bg-green-600"><Check size={16}/> Duyệt</button>}{status !== "rejected" && <button onClick={() => moderate(review._id, "rejected")} className="inline-flex items-center gap-1 rounded bg-orange-700 px-3 py-2 text-sm hover:bg-orange-600"><X size={16}/> Từ chối</button>}<button onClick={() => remove(review._id)} className="inline-flex items-center gap-1 rounded bg-red-700 px-3 py-2 text-sm hover:bg-red-600"><Trash2 size={16}/> Xóa</button></div></article>)}</div>}
    </div>;
};
export default ReviewModerationTab;
