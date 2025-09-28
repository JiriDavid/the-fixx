## THE FIXX — Futuristic Fitness Experience

THE FIXX is an immersive fitness platform that fuses a cinematic marketing site with a secure admin control center. It is built with Next.js (App Router) and integrates MongoDB, Cloudinary, and NextAuth to power real-time content management for classes, trainers, and testimonials.

### ✨ Highlights

- **Futuristic marketing site** with animated hero, program showcase, trainer spotlight, and testimonial marquee driven by Framer Motion and Lenis smooth scrolling.
- **Hybrid data layer** featuring MongoDB persistence with graceful fallback seed data so the site remains beautiful even before credentials are configured.
- **Hidden admin CMS** protected by NextAuth credentials and middleware, delivering rich CRUD tooling, Cloudinary uploads, and real-time dashboards.
- **Production-ready stack** leveraging Mongoose models, Zod validation, secure upload endpoints, and modular UI components.

## 🚀 Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
- Tailwind CSS v4 (via `@import "tailwindcss"`)
- [Framer Motion](https://www.framer.com/motion/) for interactions and micro-animations
- [Lenis](https://lenis.studiofreight.com/) for buttery smooth scrolling
- [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/) for media management
- [NextAuth](https://next-auth.js.org/) with credentials provider
- [SWR](https://swr.vercel.app/) + [React Hook Form](https://react-hook-form.com/) in the admin console

## 🛠️ Local Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Copy environment template**

   ```bash
   # macOS/Linux
   cp .env.example .env.local

   # Windows PowerShell
   Copy-Item .env.example .env.local
   ```

3. **Populate environment variables**

   | Variable                     | Description                                                          |
   | ---------------------------- | -------------------------------------------------------------------- |
   | `MONGODB_URI` / `MONGODB_DB` | Connection string and database name for MongoDB Atlas or self-hosted |
   | `NEXTAUTH_SECRET`            | Random 32+ character string for NextAuth encryption                  |
   | `ADMIN_EMAIL`                | Email allowed to access the admin console                            |
   | `ADMIN_PASSWORD_HASH`        | Bcrypt hash of the admin password                                    |
   | `CLOUDINARY_*`               | API credentials for the Cloudinary account                           |

   Generate a bcrypt hash (PowerShell example):

   ```powershell
   node -e "console.log(require('bcryptjs').hashSync('your-password', 12))"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the marketing site. The admin console lives at [http://localhost:3000/admin](http://localhost:3000/admin) and redirects to `/admin/login` until valid credentials are provided.

## 🔐 Admin CMS

- Protected with NextAuth middleware and a credentials provider.
- Manage classes, trainers, and testimonials with real-time SWR updates.
- Integrated Cloudinary uploader for hero images, avatars, and gallery assets.
- Dashboard overview summarizing total content and latest activity.

## 🧩 Content Models

All persistent data lives in MongoDB collections via Mongoose models:

- `Class`: immersive program metadata, technology stack, and scheduling.
- `Trainer`: coach biographies, accolades, and specialties.
- `Testimonial`: member quotes with highlight support.

When MongoDB credentials are absent, the site and admin dashboard automatically fall back to cinematic seed data defined in `src/lib/data.js` so the experience never renders empty.

## 📦 Useful Scripts

| Script          | Description                                 |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start Next.js with Turbopack in development |
| `npm run build` | Create a production build                   |
| `npm run start` | Run the production server                   |
| `npm run lint`  | Execute ESLint over the project             |

## 🌩️ Deployment Notes

1. Provision MongoDB (Atlas recommended) and set the URI + DB name.
2. Configure Cloudinary environment variables and optionally set up a dedicated media folder.
3. Define secure admin credentials (email + bcrypt hash) and `NEXTAUTH_SECRET`.
4. Deploy to your platform of choice (Vercel, AWS, etc.). The app relies on environment variables at runtime.

## 📚 Further Customization

- Extend data models with pricing tiers, session caps, or waitlist logic.
- Connect analytics dashboards or IoT sensor feeds via additional API routes.
- Tailor the animation system (Framer Motion variants) to match your specific brand rhythm.

Welcome to the future of fitness experiences—hack away and make it yours.
