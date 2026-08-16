-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all roles" ON public.user_roles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- UPDATED_AT HELPER
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  phone text,
  address text,
  city text,
  pincode text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins read all profiles" ON public.profiles
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SIGNUP TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'phone')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- CATEGORIES
CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  tagline text,
  description text,
  brewing text,
  highlights text[] NOT NULL DEFAULT '{}',
  image_url text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon, authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins manage categories" ON public.categories
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER categories_updated_at BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- PRODUCTS
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  category_slug text NOT NULL REFERENCES public.categories(slug) ON UPDATE CASCADE,
  notes text,
  price_value numeric NOT NULL,
  unit text NOT NULL DEFAULT 'kg',
  mrp numeric,
  image_url text,
  badge text,
  rating numeric NOT NULL DEFAULT 5,
  reviews int NOT NULL DEFAULT 0,
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are public" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins manage products" ON public.products
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ORDERS
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  full_name text NOT NULL,
  phone text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  pincode text NOT NULL,
  subtotal numeric NOT NULL DEFAULT 0,
  delivery_fee numeric NOT NULL DEFAULT 0,
  total numeric NOT NULL DEFAULT 0,
  payment_method text NOT NULL DEFAULT 'cod',
  payment_status text NOT NULL DEFAULT 'pending',
  status text NOT NULL DEFAULT 'placed',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own orders" ON public.orders
FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins read all orders" ON public.orders
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update orders" ON public.orders
FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ORDER ITEMS
CREATE TABLE public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_slug text,
  name text NOT NULL,
  image_url text,
  unit_price numeric NOT NULL,
  qty int NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own order items" ON public.order_items
FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));
CREATE POLICY "Admins read all order items" ON public.order_items
FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SEED CATEGORIES
INSERT INTO public.categories (slug, name, tagline, description, brewing, highlights, sort_order) VALUES
('tea-leaf','Tea Leaf','Khuli patti chai','Assam, Nilgiri aur Darjeeling ki chuni hui patti. Daane bade hote hain, isliye swaad saaf aur khushbu tez rehti hai.','1 chammach patti, 1 cup paani, 3 minute ubaal — phir doodh aur cheeni.',ARRAY['Direct garden se','Har hafte fresh stock','Aapke saamne tola jata hai'],1),
('tea-powder','Tea Powder','Kadak CTC dust','Chai stall aur hotel style kadak chai ke liye barik dust. Ek chammach mein hi gehra rang aur strong taste.','Aadha chammach dust per cup — 2 minute ubaal, doodh ke saath.',ARRAY['Thick milk colour','Economy bulk rate','10 kg se 500 kg tak'],2),
('green-tea','Green Tea','Bina doodh ki halki chai','Whole leaf green tea, halka aur fresh. Subah ya khane ke baad peene ke liye.','Paani ubaal ke 1 minute thanda karein, 2–3 minute steep karein.',ARRAY['No milk, no sugar needed','Light aur refreshing','Lemon flavour available'],3),
('cardamom-tea','Cardamom Tea','Elaichi wali chai','Assam leaf ke saath asli hari elaichi mix ki hui. Chai banate hi pura ghar mehak jata hai.','1 chammach blend, doodh-paani barabar, 4 minute dheemi aanch.',ARRAY['Asli hari elaichi','Rich khushbu','Mehmaan-special blend'],4),
('cardamom-flavour','Cardamom Flavour','Pure elaichi flavour','Food-grade cardamom flavour — chai, kheer, mithai aur bakery items ke liye.','2–3 boond per litre — zyada mat daaliye.',ARRAY['Food grade','Thoda hi kaafi','Sweets aur bakery ke liye'],5),
('coffee','Coffee','Fresh roast coffee','South Indian filter coffee powder aur instant blend. Roast aur grind dukaan par hi hota hai.','2 chammach powder per cup filter mein, 10 minute decoction.',ARRAY['Fresh roasted & ground','Filter aur instant dono','Ghar aur office ke liye'],6);

-- SEED PRODUCTS
INSERT INTO public.products (slug, name, category_slug, notes, price_value, unit, mrp, badge, rating, reviews) VALUES
('masala-chai-special','Masala Chai Special','tea-leaf','Strong tea with ginger, cardamom and clove — Indore''s favourite cup.',499,'kg',580,'Best seller',5,128),
('assam-ctc-gold','Assam CTC Gold','tea-powder','Dark, kadak chai with thick milk colour. Perfect for tapri-style tea.',350,'kg',420,'Value pack',4,96),
('darjeeling-first-flush','Darjeeling First Flush','tea-leaf','Light and mild, floral finish. Best without milk in the evening.',850,'kg',NULL,'Premium',5,54),
('nilgiri-leaf-everyday','Nilgiri Leaf Everyday','tea-leaf','Balanced daily leaf tea. Achhi colour, halka strong taste.',420,'kg',NULL,NULL,4,61),
('kadak-dust-tea','Kadak Dust Tea','tea-powder','Fine dust for chai stalls — one spoon mein full colour.',280,'kg',320,'Wholesale',4,143),
('green-tea-whole-leaf','Green Tea Whole Leaf','green-tea','Bina doodh ki halki chai. Subah ya khane ke baad achhi lagti hai.',650,'kg',NULL,NULL,4,38),
('lemon-green-tea','Lemon Green Tea','green-tea','Green tea with natural lemon — fresh aur halka swaad.',720,'kg',NULL,NULL,4,22),
('elaichi-chai-blend','Elaichi Chai Blend','cardamom-tea','Assam leaf mixed with green cardamom. Ghar bhar mein khushbu.',560,'kg',NULL,'Popular',5,77),
('pure-cardamom-flavour','Pure Cardamom Flavour','cardamom-flavour','Food-grade elaichi flavour — chai, kheer aur sweets ke liye.',180,'100g',NULL,NULL,4,31),
('filter-coffee-powder','Filter Coffee Powder','coffee','Fresh roasted and ground — South Indian filter style.',620,'kg',NULL,NULL,4,45),
('instant-coffee-blend','Instant Coffee Blend','coffee','Quick cup ke liye smooth blend, ghar aur office dono ke liye.',740,'kg',NULL,NULL,4,19),
('hotel-special-ctc','Hotel Special CTC','tea-powder','Bulk buyers ke liye economy CTC — 10 kg se 500 kg tak.',310,'kg',NULL,'Bulk rate',4,88);