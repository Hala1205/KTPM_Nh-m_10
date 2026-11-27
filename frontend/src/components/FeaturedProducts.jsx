import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

export default function FeaturedProducts({ featuredProducts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const { addToCart } = useCartStore();
  const { user } = useUserStore();

  useEffect(() => {
    const resize = () => setItemsPerPage(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : window.innerWidth < 1280 ? 3 : 4);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  useEffect(() => {
    setCurrentIndex((index) => Math.min(index, Math.max(0, featuredProducts.length - itemsPerPage)));
  }, [featuredProducts.length, itemsPerPage]);

  const add = (product) => {
    if (!user) return toast.error("Vui lòng đăng nhập để thêm sản phẩm");
    if (Number(product.stock) <= 0) return toast.error("Sản phẩm đã hết hàng");
    addToCart(product);
  };

  if (!featuredProducts.length) return null;
  const maxIndex = Math.max(0, featuredProducts.length - itemsPerPage);

  return <section className="py-12" aria-labelledby="featured-heading">
    <div className="container mx-auto px-4">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div><h2 id="featured-heading" className="text-4xl font-bold text-yellow-400">Nổi bật</h2><p className="mt-1 text-stone-400">Những sản phẩm nổi bật dành cho bạn.</p></div>
        <Link to="/shop?sort=featured" className="text-sm text-yellow-400 hover:text-yellow-300">Xem tất cả →</Link>
      </div>
      <div className="relative">
        <div className="overflow-hidden">
          <div className="flex items-stretch transition-transform duration-300" style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}>
            {featuredProducts.map((product) => <div key={product._id} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <article className="flex h-full flex-col overflow-hidden rounded-lg border border-yellow-500/30 bg-white/10 shadow-lg">
                <Link to={`/product/${product._id}`} className="block h-48 shrink-0 overflow-hidden">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                </Link>
                <div className="flex flex-1 flex-col p-4">
                  <Link to={`/product/${product._id}`}><h3 className="min-h-12 line-clamp-2 font-semibold leading-6 text-white hover:text-yellow-400">{product.name}</h3></Link>
                  <div className="mt-auto pt-2">
                    <p className="mb-4 font-medium text-yellow-300">${Number(product.price).toFixed(2)}</p>
                    <button onClick={() => add(product)} disabled={Number(product.stock) <= 0} className="flex min-h-11 w-full items-center justify-center gap-2 rounded bg-yellow-600 px-3 py-2 text-sm font-semibold disabled:bg-stone-700">
                      <ShoppingCart size={19} />{Number(product.stock) <= 0 ? "Hết hàng" : "Thêm vào giỏ"}
                    </button>
                    <Link to={`/product/${product._id}`} className="mt-3 flex min-h-6 items-center justify-center gap-1 text-sm text-yellow-400"><ExternalLink size={16} />Xem chi tiết</Link>
                  </div>
                </div>
              </article>
            </div>)}
          </div>
        </div>
        <button aria-label="Sản phẩm nổi bật trước" onClick={() => setCurrentIndex((index) => Math.max(0, index - itemsPerPage))} disabled={currentIndex === 0} className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-yellow-600 p-2 disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft /></button>
        <button aria-label="Sản phẩm nổi bật tiếp theo" onClick={() => setCurrentIndex((index) => Math.min(maxIndex, index + itemsPerPage))} disabled={currentIndex >= maxIndex} className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-yellow-600 p-2 disabled:cursor-not-allowed disabled:opacity-30"><ChevronRight /></button>
      </div>
    </div>
  </section>;
}
