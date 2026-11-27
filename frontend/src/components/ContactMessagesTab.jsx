import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

export default function ContactMessagesTab() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = async () => { try { const { data } = await axiosInstance.get("/support/contact"); setMessages(data.messages); } catch (error) { toast.error(error.response?.data?.message || "Không thể tải tin nhắn"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const update = async (id, status) => { try { await axiosInstance.patch(`/support/contact/${id}`, { status }); setMessages((items) => items.map((item) => item._id === id ? { ...item, status } : item)); toast.success("Đã cập nhật trạng thái"); } catch (error) { toast.error(error.response?.data?.message || "Không thể cập nhật trạng thái"); } };
  if (loading) return <p className="text-center text-stone-400">Đang tải tin nhắn…</p>;
  return <div className="space-y-4"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold flex items-center gap-2"><MessageSquare className="text-yellow-400" />Tin nhắn khách hàng</h2><button onClick={load} className="text-sm bg-stone-700 px-3 py-2 rounded hover:bg-stone-600">Làm mới</button></div>{messages.length === 0 ? <div className="text-center text-stone-400 py-10">Chưa có tin nhắn khách hàng.</div> : messages.map((item) => <article key={item._id} className="bg-stone-800 border border-stone-700 rounded-xl p-5"><div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3"><div><h3 className="font-semibold">{item.subject}</h3><p className="text-sm text-stone-400">{item.name} · {item.email} · {new Date(item.createdAt).toLocaleString()}</p></div><select value={item.status} onChange={(e) => update(item._id, e.target.value)} className="bg-stone-900 border border-stone-600 rounded px-3 py-2"><option value="new">Mới</option><option value="in_progress">Đang xử lý</option><option value="resolved">Đã giải quyết</option></select></div><p className="mt-4 text-stone-300 whitespace-pre-wrap">{item.message}</p></article>)}</div>;
}
