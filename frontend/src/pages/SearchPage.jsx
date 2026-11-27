import { useEffect, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";

export default function SearchPage() {
    const [params, setParams] = useSearchParams();
    const { products, loading, pagination, fetchAllProducts } = useProductStore();
    const [query, setQuery] = useState(params.get("q") || "");
    const [sort, setSort] = useState(params.get("sort") || "featured");
    const [minPrice, setMinPrice] = useState(params.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");
    const [inStock, setInStock] = useState(params.get("inStock") === "true");
    const page = Number(params.get("page") || 1);

    useEffect(() => { fetchAllProducts({ search: params.get("q") || "", sort: params.get("sort") || "featured", minPrice: params.get("minPrice") || "", maxPrice: params.get("maxPrice") || "", inStock: params.get("inStock") || "", page, pageSize: 24 }); }, [params, page, fetchAllProducts]);
    const submit = (e) => { e.preventDefault(); const next = new URLSearchParams(); if (query.trim()) next.set("q", query.trim()); if (sort !== "featured") next.set("sort", sort); if (minPrice) next.set("minPrice", minPrice); if (maxPrice) next.set("maxPrice", maxPrice); if (inStock) next.set("inStock", "true"); setParams(next); };
    const clear = () => { setQuery(""); setSort("featured"); setMinPrice(""); setMaxPrice(""); setInStock(false); setParams({}); };
    const pageTo = (value) => { const next = new URLSearchParams(params); if (value > 1) next.set("page", String(value)); else next.delete("page"); setParams(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
    const label = params.get("q") ? `Kết quả cho “${params.get("q") }”` : "Xem sản phẩm";

    return <main className="container mx-auto min-h-screen px-4 py-12"><div className="mb-8 text-center"><h1 className="text-4xl font-bold text-yellow-400">Tìm kiếm tại Thread Theory</h1><p className="mt-2 text-stone-400">Tìm sản phẩm theo tên, mô tả, giá hoặc tình trạng còn hàng.</p></div>
        <form onSubmit={submit} className="mx-auto mb-6 flex max-w-3xl gap-2"><label className="flex flex-1 items-center gap-2 rounded-md border border-stone-700 bg-stone-800 px-3"><SearchIcon size={20} className="text-stone-400"/><span className="sr-only">Tìm sản phẩm</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Tìm sản phẩm…" className="w-full bg-transparent py-3 outline-none"/></label><button className="rounded-md bg-yellow-500 px-5 font-semibold text-black hover:bg-yellow-400">Tìm kiếm</button></form>
        <div className="mx-auto mb-8 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4"><input type="number" min="0" step="0.01" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Giá thấp nhất" aria-label="Giá tối thiểu" className="rounded-md bg-stone-800 px-3 py-2 outline-none"/><input type="number" min="0" step="0.01" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Giá cao nhất" aria-label="Giá tối đa" className="rounded-md bg-stone-800 px-3 py-2 outline-none"/><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp sản phẩm" className="rounded-md bg-stone-800 px-3 py-2 outline-none"><option value="featured">Nổi bật</option><option value="newest">Mới nhất</option><option value="price_asc">Giá: thấp đến cao</option><option value="price_desc">Giá: cao đến thấp</option><option value="name_asc">Tên: A đến Z</option></select><div className="flex items-center gap-3 rounded-md bg-stone-800 px-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)}/> In stock</label><button type="button" onClick={clear} className="ml-auto flex items-center gap-1 text-sm text-yellow-400"><X size={15}/> Clear</button></div></div>
        <div className="mb-5 flex items-center justify-between"><p className="text-stone-400">{loading ? "Đang tìm kiếm…" : `${pagination?.total ?? products.length} kết quả`} · {label}</p><Link to="/shop" className="text-sm text-yellow-400 hover:text-yellow-300">Xem tất cả sản phẩm →</Link></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{!loading && !products.length && <p className="col-span-full py-16 text-center text-stone-400">Không tìm thấy sản phẩm. Hãy thử từ khóa khác hoặc xóa bộ lọc.</p>}{products.map((product) => <ProductCard key={product._id} product={product}/>)}</div>
        {pagination && pagination.totalPages > 1 && <div className="mt-10 flex items-center justify-center gap-3"><button disabled={page <= 1} onClick={() => pageTo(page - 1)} className="rounded border border-stone-700 px-4 py-2 disabled:opacity-40">Trước</button><span className="text-sm text-stone-400">Trang {page} / {pagination.totalPages}</span><button disabled={page >= pagination.totalPages} onClick={() => pageTo(page + 1)} className="rounded border border-stone-700 px-4 py-2 disabled:opacity-40">Tiếp</button></div>}
    </main>;
}
