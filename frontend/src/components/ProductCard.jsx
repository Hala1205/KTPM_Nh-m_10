import { useEffect, useState } from "react";
import { ExternalLink, Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "../lib/axios";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

export default function ProductCard({ product }) {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const [wishlisted, setWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [showReviews, setShowReviews] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const outOfStock = Number(product.stock) <= 0;
  const lowStock = !outOfStock && Number(product.stock) <= Number(product.lowStockThreshold ?? 5);

  useEffect(() => {
    if (!user) return;
    axios.get("/account/wishlist")
      .then(({ data }) => setWishlisted((data.products || []).some((item) => item._id === product._id)))
      .catch(() => {});
  }, [user, product._id]);

  const loadReviews = async () => {
    try {
      const { data } = await axios.get(`/account/reviews/${product._id}`);
      setReviews(data.reviews || []);
      setAverage(data.average || 0);
      setShowReviews(true);
    } catch {
      toast.error("Không thể tải đánh giá");
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!user) return toast.error("Vui lòng đăng nhập để đánh giá sản phẩm");
    try {
      await axios.post(`/account/reviews/${product._id}`, { rating, comment });
      setComment("");
      await loadReviews();
      toast.success("Đã gửi đánh giá");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thể gửi đánh giá");
    }
  };

  const handleAddToCart = () => {
    if (!user) return toast.error("Vui lòng đăng nhập để thêm sản phẩm", { id: "login" });
    if (outOfStock) return toast.error("Sản phẩm đã hết hàng");
    addToCart(product);
  };

  const toggleWishlist = async () => {
    if (!user) return toast.error("Vui lòng đăng nhập để dùng danh sách yêu thích", { id: "wishlist-login" });
    try {
      const { data } = await axios.patch(`/account/wishlist/${product._id}`);
      setWishlisted(data.wishlisted);
      toast.success(data.wishlisted ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích");
    } catch (error) {
      toast.error(error.response?.data?.message || "Không thể cập nhật danh sách yêu thích");
    }
  };

  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-stone-700 bg-stone-800/70 shadow-lg">
      <div className="relative mx-3 mt-3 h-60 shrink-0 overflow-hidden rounded-xl">
        <Link to={`/product/${product._id}`} className="block h-full w-full">
          <img className="h-full w-full object-cover" src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button onClick={toggleWishlist} aria-label={wishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"} className="absolute right-3 top-3 rounded-full bg-stone-900/80 p-2 text-white hover:text-yellow-400">
          <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 pb-5 pt-4">
        <Link to={`/product/${product._id}`} className="group block">
          <h3 className="min-h-14 line-clamp-2 text-xl font-semibold leading-7 text-white group-hover:text-yellow-400">{product.name}</h3>
          <p className="mt-2 min-h-10 line-clamp-2 text-sm leading-5 text-stone-400">{product.description}</p>
        </Link>

        <div className="mt-auto pt-4">
          <div className="flex min-h-12 items-center justify-between gap-2">
            <span className="shrink-0 text-2xl font-bold text-yellow-400">${Number(product.price).toFixed(2)}</span>
            <span className={`min-w-0 text-right text-xs font-medium leading-4 ${outOfStock ? "text-red-400" : lowStock ? "text-orange-400" : "text-green-400"}`}>
              {outOfStock ? "Hết hàng" : lowStock ? `Chỉ còn ${product.stock}` : `Còn ${product.stock} sản phẩm`}
            </span>
          </div>
          <button disabled={outOfStock} className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700 disabled:bg-stone-600" onClick={handleAddToCart}>
            <ShoppingCart size={20} />{outOfStock ? "Hết hàng" : "Thêm vào giỏ"}
          </button>
          <Link to={`/product/${product._id}`} className="mt-3 flex min-h-6 items-center justify-center gap-2 text-sm text-yellow-400 hover:text-yellow-300">
            <ExternalLink size={16} /> Xem chi tiết
          </Link>
          <button onClick={loadReviews} className="mt-2 flex min-h-6 w-full items-center justify-center gap-2 text-sm text-stone-400 hover:text-yellow-300">
            <Star size={16} /> {average ? `${average}/5` : "Đánh giá"} ({reviews.length})
          </button>
        </div>

        {showReviews && <div className="mt-3 space-y-3 border-t border-stone-700 pt-3">
          {reviews.slice(0, 3).map((review) => <div key={review._id} className="text-sm">
            <div className="flex justify-between"><strong>{review.user?.name || "Khách hàng"}</strong><span className="text-yellow-400">{"★".repeat(review.rating)}</span></div>
            <p className="text-stone-400">{review.comment}</p>
            {review.verifiedPurchase && <span className="text-xs text-green-400">Đã mua hàng</span>}
          </div>)}
          {user && <form onSubmit={submitReview} className="space-y-2">
            <div className="flex gap-2">{[1, 2, 3, 4, 5].map((value) => <button type="button" key={value} onClick={() => setRating(value)} aria-label={`${value} sao`} className={value <= rating ? "text-yellow-400" : "text-stone-600"}><Star size={18} fill="currentColor" /></button>)}</div>
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Chia sẻ trải nghiệm của bạn..." className="w-full rounded border border-stone-600 bg-stone-700 p-2 text-sm text-white" rows="2" required />
            <button className="rounded bg-stone-700 px-3 py-1 text-sm hover:bg-stone-600">Gửi đánh giá</button>
          </form>}
        </div>}
      </div>
    </article>
  );
}
