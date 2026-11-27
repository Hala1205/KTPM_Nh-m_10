import { useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../stores/useProductStore";
import { categoryLabel } from "../lib/labels";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

export default function ShopPage() {
    const [params, setParams] = useSearchParams();
    const { products, loading, pagination, fetchAllProducts } = useProductStore();
    const [search, setSearch] = useState(params.get("search") || "");
    const [category, setCategory] = useState(params.get("category") || "");
    const [minPrice, setMinPrice] = useState(params.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") || "");
    const [sort, setSort] = useState(params.get("sort") || "featured");
    const [inStock, setInStock] = useState(params.get("inStock") === "true");
    const page = Number(params.get("page") || 1);

    const filters = useMemo(() => ({ search, category, minPrice, maxPrice, sort, inStock: inStock ? "true" : "", page, pageSize: 24 }), [search, category, minPrice, maxPrice, sort, inStock, page]);
    useEffect(() => { fetchAllProducts(filters); }, [fetchAllProducts, filters]);

    const applyFilters = (event) => { event?.preventDefault(); const next = new URLSearchParams(); if (search.trim()) next.set("search", search.trim()); if (category) next.set("category", category); if (minPrice) next.set("minPrice", minPrice); if (maxPrice) next.set("maxPrice", maxPrice); if (sort !== "featured") next.set("sort", sort); if (inStock) next.set("inStock", "true"); setParams(next); };
    const clearFilters = () => { setSearch(""); setCategory(""); setMinPrice(""); setMaxPrice(""); setSort("featured"); setInStock(false); setParams({}); };
    const goToPage = (nextPage) => { const next = new URLSearchParams(params); if (nextPage > 1) next.set("page", String(nextPage)); else next.delete("page"); setParams(next); window.scrollTo({ top: 0, behavior: "smooth" }); };

    return <main className="mx-auto min-h-screen max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm uppercase tracking-widest text-yellow-400">Thread Theory</p><h1 className="text-4xl font-bold">Tất cả sản phẩm</h1><p className="mt-2 text-stone-400">Khám phá bộ sưu tập và lọc sản phẩm theo ý bạn.</p></div><Link to="/search" className="text-yellow-400 hover:text-yellow-300">Mở trang tìm kiếm →</Link></div>
        <section className="mb-8 rounded-xl border border-stone-700 bg-stone-800/80 p-4">
            <div className="mb-4 flex items-center gap-2 font-semibold text-yellow-400"><SlidersHorizontal size={18}/> Lọc và sắp xếp</div>
            <form onSubmit={applyFilters} className="grid gap-3 md:grid-cols-2 lg:grid-cols-6">
                <label className="flex items-center gap-2 rounded-md bg-stone-900 px-3 py-2 lg:col-span-2"><Search size={18} className="text-stone-400"/><span className="sr-only">Tìm sản phẩm</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm sản phẩm…" className="w-full bg-transparent outline-none"/></label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Danh mục" className="rounded-md bg-stone-900 px-3 py-2 outline-none"><option value="">Tất cả danh mục</option>{categories.map((item) => <option key={item} value={item}>{categoryLabel(item)}</option>)}</select>
                <input type="number" min="0" step="0.01" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Giá thấp nhất" aria-label="Giá tối thiểu" className="rounded-md bg-stone-900 px-3 py-2 outline-none"/>
                <input type="number" min="0" step="0.01" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Giá cao nhất" aria-label="Giá tối đa" className="rounded-md bg-stone-900 px-3 py-2 outline-none"/>
                <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp sản phẩm" className="rounded-md bg-stone-900 px-3 py-2 outline-none"><option value="featured">Nổi bật</option><option value="newest">Mới nhất</option><option value="oldest">Cũ nhất</option><option value="price_asc">Giá: thấp đến cao</option><option value="price_desc">Giá: cao đến thấp</option><option value="name_asc">Tên: A đến Z</option><option value="name_desc">Tên: Z đến A</option></select>
                <div className="flex flex-wrap items-center gap-3 lg:col-span-6"><label className="flex items-center gap-2 text-sm text-stone-300"><input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)}/> Chỉ còn hàng</label><button className="rounded-md bg-yellow-600 px-4 py-2 font-semibold text-black hover:bg-yellow-500">Áp dụng bộ lọc</button><button type="button" onClick={clearFilters} className="flex items-center gap-1 text-sm text-yellow-400"><X size={16}/> Clear</button></div>
            </form>
        </section>
        <div className="mb-5 flex items-center justify-between text-sm text-stone-400"><span>{loading ? "Đang tải sản phẩm…" : `${pagination?.total ?? products.length} sản phẩm`}</span><Filter size={17}/></div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{!loading && !products.length && <p className="col-span-full py-16 text-center text-stone-400">Không có sản phẩm nào phù hợp với bộ lọc.</p>}{products.map((product) => <ProductCard key={product._id} product={product}/>)}</div>
        {pagination && pagination.totalPages > 1 && <div className="mt-10 flex items-center justify-center gap-2"><button disabled={page <= 1} onClick={() => goToPage(page - 1)} className="rounded-md border border-stone-700 px-4 py-2 disabled:opacity-40">Trước</button><span className="px-3 text-sm text-stone-400">Trang {page} / {pagination.totalPages}</span><button disabled={page >= pagination.totalPages} onClick={() => goToPage(page + 1)} className="rounded-md border border-stone-700 px-4 py-2 disabled:opacity-40">Tiếp</button></div>}
    </main>;
}
