export const categoryLabels = {
  jeans: "Quần jeans",
  "t-shirts": "Áo thun",
  shoes: "Giày",
  glasses: "Kính",
  jackets: "Áo khoác",
  suits: "Bộ vest",
  bags: "Túi xách",
};

export const categoryLabel = (slug) => categoryLabels[slug] || slug || "";

const sampleNames = {
  "Classic Denim Jeans": "Quần jeans cổ điển",
  "Essential T-Shirt": "Áo thun cơ bản",
  "Leather Jacket": "Áo khoác da",
  "Modern Sneakers": "Giày thể thao hiện đại",
  "Tailored Suit": "Bộ vest may đo",
  "Everyday Bag": "Túi sử dụng hằng ngày",
  "Classic Glasses": "Kính cổ điển",
};

export const productLabel = (name) => sampleNames[name] || name;

const sampleDescriptions = {
  "Everyday denim with a clean fit.": "Quần jeans mặc hằng ngày với dáng gọn gàng.",
  "Soft cotton essential.": "Áo thun cotton mềm mại, dễ phối đồ.",
  "A timeless outer layer.": "Áo khoác phong cách vượt thời gian.",
  "Comfort for every day.": "Êm chân cho mọi hoạt động hằng ngày.",
  "Refined tailoring.": "Đường may tinh tế, lịch lãm.",
  "A versatile daily carry.": "Chiếc túi tiện dụng cho mỗi ngày.",
  "A finishing touch.": "Điểm nhấn hoàn hảo cho trang phục.",
};

export const displayProduct = (product) => product && ({
  ...product,
  name: productLabel(product.name),
  description: sampleDescriptions[product.description] || product.description,
});
