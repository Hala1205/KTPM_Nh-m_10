const faqs = [
  ["Làm thế nào để đặt hàng?", "Thêm sản phẩm vào giỏ, kiểm tra số lượng rồi tiến hành thanh toán mô phỏng. Đơn hàng được tạo sau khi bạn xác nhận."],
  ["Tôi có thể theo dõi đơn hàng không?", "Đăng nhập và mở mục Đơn hàng để xem lịch sử cùng trạng thái hiện tại."],
  ["Có những phương thức thanh toán nào?", "Bản local sử dụng thanh toán mô phỏng và không thu tiền thật."],
  ["Tôi có thể hủy đơn hàng không?", "Bạn có thể hủy đơn đang xử lý trong trang Đơn hàng. Nếu đơn đã gửi đi, hãy liên hệ bộ phận hỗ trợ."],
  ["Đổi trả như thế nào?", "Xem trang Vận chuyển và đổi trả để biết cách gửi yêu cầu hỗ trợ."],
  ["Tôi dùng mã giảm giá như thế nào?", "Nhập mã giảm giá trong giỏ hàng. Hệ thống sẽ kiểm tra mã trước khi áp dụng."],
  ["Thông tin thanh toán của tôi có được lưu không?", "Bản local không yêu cầu và không lưu thông tin thẻ thanh toán."],
];

export default function FAQPage() {
  return <main className="max-w-4xl mx-auto px-4 py-12"><h1 className="text-4xl font-bold text-center">Câu hỏi thường gặp</h1><p className="text-stone-400 text-center mt-3 mb-10">Giải đáp nhanh các câu hỏi về mua sắm và đơn hàng.</p><div className="space-y-4">{faqs.map(([question, answer]) => <details key={question} className="bg-stone-800/80 border border-stone-700 rounded-xl p-5"><summary className="font-semibold cursor-pointer">{question}</summary><p className="text-stone-300 mt-3 leading-relaxed">{answer}</p></details>)}</div></main>;
}
