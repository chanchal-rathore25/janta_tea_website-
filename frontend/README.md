# Janta Tea — Full Website (MERN)

Do folders hain:

```
janta-tea/           → Frontend (React + Vite + Tailwind)
janta-tea-backend/    → Backend (Node + Express + MongoDB)
```

## 1. Frontend chalane ke liye

```bash
cd janta-tea
npm install
cp .env.example .env      # VITE_API_URL set karo (backend chal raha ho to localhost:5000/api hi rakho)
npm run dev
```

Browser mein khulega: `http://localhost:5173`

## 2. Backend chalane ke liye

```bash
cd janta-tea-backend
npm install
cp .env.example .env      # MONGO_URI apne MongoDB Atlas se daalo, baaki values fill karo
npm run dev
```

API chalega: `http://localhost:5000/api`

MongoDB Atlas free cluster banane ke liye: mongodb.com/atlas → free tier → connection string copy karke `.env` mein `MONGO_URI` mein daalo.

## 3. Abhi jo images/videos missing hain

Saari image paths already code mein likhi hui hain (`/images/products/green-tea.jpg` type se) — bas actual files `janta-tea/public/images/` aur `janta-tea/public/videos/` folder mein daal do usi naam se, sab automatically load ho jayega. Placeholder ke liye https://unsplash.com se royalty-free tea/plantation images use kar sakte ho.

## 4. Deploy kaise karein

- **Frontend** → Vercel ya Netlify pe `janta-tea` folder push karo, build command `npm run build`, output `dist`
- **Backend** → Render ya Railway pe `janta-tea-backend` folder deploy karo, environment variables Render/Railway dashboard mein daalo
- **Database** → MongoDB Atlas (already free tier ke liye designed hai)
- **Images** → Production mein Cloudinary use karna better hoga bajaye public folder ke (fast CDN delivery)

## 5. Abhi jo baaki hai (agla step)

- [ ] Admin panel (product/blog add-edit-delete UI) — abhi sirf backend API ready hai (`requireAdmin` middleware ke peeche protected)
- [ ] Real images/video daalna
- [ ] `npm run build` karke test karna ki production build clean hai
- [ ] SEO: prerendering ya Next.js migration (discuss kiya tha — abhi CSR hai)
- [ ] Google Analytics tracking ID add karna (`index.html` mein)
- [ ] Domain aur hosting connect karna

## Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, React Router, Framer Motion, React Icons, Axios, React Helmet Async, Swiper, React Hook Form

**Backend:** Node.js, Express, MongoDB (Mongoose), JWT (admin auth), Nodemailer (email notifications), express-rate-limit (spam protection)
