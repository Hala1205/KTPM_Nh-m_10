import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartStore();
  const variant = item.selectedVariant;

  return <article className="rounded-lg border border-stone-700 bg-stone-800 p-4 shadow-sm md:p-6">
    <div className="grid grid-cols-[5rem_minmax(0,1fr)] items-start gap-4 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:gap-6">
      <img className="h-20 w-20 rounded object-cover md:h-32 md:w-32" src={variant?.image || item.image} alt={item.name} />

      <div className="min-w-0 space-y-2">
        <h3 className="break-words text-base font-medium text-white">{item.name}</h3>
        {variant && <p className="text-sm font-medium text-yellow-400">Phiên bản: {variant.name}{variant.sku ? ` · SKU ${variant.sku}` : ""}</p>}
        <p className="line-clamp-2 text-sm text-stone-400">{item.description}</p>
        <button aria-label={`Xóa ${item.name} khỏi giỏ`} className="inline-flex items-center gap-1 text-sm font-medium text-red-400 hover:text-red-300 hover:underline" onClick={() => removeFromCart(item._id, item.variantId)}>
          <Trash size={17} /> Xóa
        </button>
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 border-t border-stone-700 pt-3 md:col-span-1 md:flex-col md:items-end md:justify-start md:border-0 md:pt-0">
        <div className="flex items-center gap-3" aria-label={`Số lượng ${item.name}`}>
          <button aria-label={`Giảm số lượng ${item.name}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-600 bg-stone-700 hover:bg-stone-600" onClick={() => updateQuantity(item._id, item.quantity - 1, item.variantId)}><Minus size={15} /></button>
          <span className="min-w-5 text-center">{item.quantity}</span>
          <button aria-label={`Tăng số lượng ${item.name}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-600 bg-stone-700 hover:bg-stone-600" onClick={() => updateQuantity(item._id, item.quantity + 1, item.variantId)}><Plus size={15} /></button>
        </div>
        <p className="shrink-0 text-lg font-bold text-yellow-400">${Number(item.price).toFixed(2)}</p>
      </div>
    </div>
  </article>;
}
