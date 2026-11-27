create table if not exists users(id uuid primary key,name text not null,email text unique not null,password text not null,role text not null default 'customer',addresses jsonb not null default '[]',created_at timestamptz not null default now());
create table if not exists products(id uuid primary key,name text not null,description text not null,price numeric(12,2) not null check(price>=0),stock int not null default 100,low_stock_threshold int not null default 5,image text not null,category text not null,is_featured boolean not null default false,variants jsonb not null default '[]',created_at timestamptz not null default now());
create table if not exists cart_items(user_id uuid references users(id) on delete cascade,product_id uuid references products(id) on delete cascade,variant_id text not null default '',quantity int not null check(quantity>0),primary key(user_id,product_id,variant_id));
create table if not exists wishlist(user_id uuid references users(id) on delete cascade,product_id uuid references products(id) on delete cascade,primary key(user_id,product_id));
create table if not exists coupons(id uuid primary key,code text unique not null,discount_percentage int not null,expiration_date timestamptz not null,is_active boolean not null default true,user_id uuid unique references users(id));
create table if not exists orders(id uuid primary key,user_id uuid references users(id),products jsonb not null,total_amount numeric(12,2) not null,status text not null default 'processing',payment_status text not null default 'paid',shipping_address jsonb,tracking_number text,carrier text,created_at timestamptz not null default now());
create table if not exists checkout_sessions(id uuid primary key,user_id uuid references users(id),products jsonb not null,total_amount numeric(12,2) not null,shipping_address jsonb,order_id uuid unique references orders(id));
create table if not exists notifications(id uuid primary key,user_id uuid references users(id),type text not null default 'system',title text not null,message text not null,read boolean not null default false,metadata jsonb not null default '{}',created_at timestamptz not null default now());
create table if not exists contacts(id uuid primary key,name text not null,email text not null,subject text not null,message text not null,status text not null default 'new',created_at timestamptz not null default now());
create table if not exists subscribers(id uuid primary key,email text unique not null,status text not null default 'subscribed',created_at timestamptz not null default now());
create table if not exists newsletters(id uuid primary key,subject text not null,html text not null,recipient_count int not null,created_at timestamptz not null default now());
create table if not exists questions(id uuid primary key,product_id uuid references products(id) on delete cascade,user_id uuid references users(id),question text not null,answer text,answered_at timestamptz,created_at timestamptz not null default now());
create table if not exists reviews(id uuid primary key,product_id uuid references products(id) on delete cascade,user_id uuid references users(id),rating int not null check(rating between 1 and 5),title text,comment text not null,status text not null default 'pending',created_at timestamptz not null default now(),unique(product_id,user_id));
insert into products(id,name,description,price,stock,image,category,is_featured) values
('11111111-1111-4111-8111-111111111111','Classic Denim Jeans','Everyday denim with a clean fit.',79,25,'/jeans.jpg','jeans',true),
('22222222-2222-4222-8222-222222222222','Essential T-Shirt','Soft cotton essential.',35,40,'/tshirts.jpg','t-shirts',true),
('33333333-3333-4333-8333-333333333333','Leather Jacket','A timeless outer layer.',199,12,'/jackets.jpg','jackets',true),
('44444444-4444-4444-8444-444444444444','Modern Sneakers','Comfort for every day.',109,18,'/shoes.jpg','shoes',true),
('55555555-5555-4555-8555-555555555555','Tailored Suit','Refined tailoring.',299,8,'/suits.jpg','suits',false),
('66666666-6666-4666-8666-666666666666','Everyday Bag','A versatile daily carry.',59,20,'/bags.jpg','bags',false),
('77777777-7777-4777-8777-777777777777','Classic Glasses','A finishing touch.',49,30,'/glasses.png','glasses',false)
on conflict(id) do nothing;
