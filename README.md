# Thread Theory Store — local PostgreSQL edition

This project preserves the original React/Vite storefront and admin interface from NicholasBkume/thread-theory-store. The backend runs on Express and PostgreSQL. Product uploads are stored in a Docker volume. Checkout is **simulated**: no card details are collected and no real payment is made.

## Develop with automatic updates

Start Docker Desktop, then run `docker compose up --build` and open http://localhost:5000. Compose automatically loads `compose.override.yaml`: Vite updates the page when frontend files are saved, and the API restarts when backend files are saved. Keep the terminal open while developing. After the first build, use `docker compose up`. Rebuild after changing dependencies, the Dockerfile, or Compose files.

The migration and sample products load automatically on a fresh database volume. Admin demo login: `admin@thread.local` / `admin123`. Change these credentials and `JWT_SECRET` in `.env` before exposing the app outside localhost.

## Production-style build

Run `docker compose -f compose.yaml up --build` to serve the compiled frontend from Express. This mode needs a rebuild after source changes.

## Notes

- Original layout, pages, styles, and static category images remain in `frontend/`.
- Schema and initial products are in `database/001_init.sql`; `database/002_more_products.sql` adds 21 more products on startup, for four products in each of seven categories. The insert is safe to run repeatedly.
- Uploaded product images are stored in the `product_images` volume.
- Newsletter sends are simulated and saved in PostgreSQL. No external email is sent.
- Sample products use the original category images because the original repository has no separate product photo dataset. Several products in one category therefore share an image.
