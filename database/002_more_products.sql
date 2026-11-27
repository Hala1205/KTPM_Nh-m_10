-- Additional local catalog items. Safe to run repeatedly.
insert into products(id,name,description,price,stock,image,category,is_featured) values
('80000000-0000-4000-8000-000000000001','Quần jeans slim fit xanh đậm','Dáng ôm gọn, chất denim co giãn nhẹ, phù hợp mặc hằng ngày.',89,24,'/jeans.jpg','jeans',true),
('80000000-0000-4000-8000-000000000002','Quần jeans ống suông','Thiết kế ống suông thoải mái với màu xanh cổ điển.',85,20,'/jeans.jpg','jeans',false),
('80000000-0000-4000-8000-000000000003','Quần jeans wash sáng','Denim wash sáng trẻ trung, dễ phối cùng áo thun và sneaker.',92,17,'/jeans.jpg','jeans',false),
('80000000-0000-4000-8000-000000000004','Áo thun cổ tròn cơ bản','Áo cotton mềm, thoáng mát với kiểu dáng dễ mặc.',29,45,'/tshirts.jpg','t-shirts',true),
('80000000-0000-4000-8000-000000000005','Áo thun oversized','Phom rộng hiện đại, phù hợp phong cách đường phố.',39,32,'/tshirts.jpg','t-shirts',false),
('80000000-0000-4000-8000-000000000006','Áo polo cotton','Cổ bẻ gọn gàng, phù hợp đi làm hoặc dạo phố.',49,28,'/tshirts.jpg','t-shirts',false),
('80000000-0000-4000-8000-000000000007','Giày sneaker vải canvas','Đôi giày nhẹ và linh hoạt cho các hoạt động hằng ngày.',69,22,'/shoes.jpg','shoes',false),
('80000000-0000-4000-8000-000000000008','Giày chạy bộ năng động','Đệm êm và chất liệu thoáng khí cho những ngày di chuyển nhiều.',119,16,'/shoes.jpg','shoes',true),
('80000000-0000-4000-8000-000000000009','Giày lười da tối giản','Thiết kế thanh lịch, dễ kết hợp cùng quần âu hoặc jeans.',129,14,'/shoes.jpg','shoes',false),
('80000000-0000-4000-8000-000000000010','Kính mát phi công','Gọng kim loại nhẹ với kiểu dáng phi công cổ điển.',55,27,'/glasses.png','glasses',false),
('80000000-0000-4000-8000-000000000011','Kính gọng tròn','Gọng tròn đơn giản tạo điểm nhấn cho trang phục.',45,31,'/glasses.png','glasses',false),
('80000000-0000-4000-8000-000000000012','Kính mát gọng vuông','Thiết kế gọng vuông mạnh mẽ, phù hợp nhiều khuôn mặt.',59,19,'/glasses.png','glasses',true),
('80000000-0000-4000-8000-000000000013','Áo khoác bomber','Phom bomber gọn gàng, dễ mặc khi trời se lạnh.',159,15,'/jackets.jpg','jackets',true),
('80000000-0000-4000-8000-000000000014','Áo khoác denim','Chất denim bền đẹp, tạo vẻ ngoài khỏe khoắn.',129,18,'/jackets.jpg','jackets',false),
('80000000-0000-4000-8000-000000000015','Áo khoác gió nhẹ','Lớp áo nhẹ tiện mang theo trong những ngày thời tiết thay đổi.',99,25,'/jackets.jpg','jackets',false),
('80000000-0000-4000-8000-000000000016','Bộ vest đen dáng slim','Đường cắt gọn và màu đen thanh lịch cho dịp trang trọng.',329,10,'/suits.jpg','suits',true),
('80000000-0000-4000-8000-000000000017','Bộ vest linen màu be','Chất liệu linen nhẹ, thích hợp cho những ngày ấm áp.',279,9,'/suits.jpg','suits',false),
('80000000-0000-4000-8000-000000000018','Bộ vest xanh navy','Thiết kế lịch lãm, linh hoạt cho công việc và sự kiện.',349,11,'/suits.jpg','suits',false),
('80000000-0000-4000-8000-000000000019','Túi đeo chéo nhỏ gọn','Ngăn chứa vừa đủ cho điện thoại, ví và đồ dùng thiết yếu.',65,26,'/bags.jpg','bags',false),
('80000000-0000-4000-8000-000000000020','Ba lô đi làm','Thiết kế nhiều ngăn, thuận tiện mang theo đồ mỗi ngày.',89,21,'/bags.jpg','bags',true),
('80000000-0000-4000-8000-000000000021','Túi tote vải dày','Túi vải rộng rãi, đơn giản và dễ sử dụng.',45,34,'/bags.jpg','bags',false)
on conflict(id) do nothing;
