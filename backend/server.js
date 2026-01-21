import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import fs from "fs";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Koyeb/Proxies (important for cookies + secure headers behind proxies)
app.set("trust proxy", 1);

const __dirname = path.resolve();

// ---------- Middleware ----------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = (process.env.CLIENT_URL || "")
	.split(",")
	.map((s) => s.trim())
	.filter(Boolean);

app.use(
	cors({
		origin: (origin, callback) => {
			// Allow requests with no origin (e.g., curl, server-to-server)
			if (!origin) return callback(null, true);

			// If CLIENT_URL isn't set, allow all (useful locally)
			if (allowedOrigins.length === 0) return callback(null, true);

			// Allow only whitelisted origins
			if (allowedOrigins.includes(origin)) return callback(null, true);

			return callback(new Error(`CORS blocked for origin: ${origin}`));
		},
		credentials: true,
	})
);

// (Optional) handle preflight
app.options("*", cors({ credentials: true }));

// ---------- Routes ----------
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);


if (process.env.NODE_ENV === "production") {
	const distPath = path.join(__dirname, "frontend", "dist");

	if (fs.existsSync(distPath)) {
		app.use(express.static(distPath));

		app.get("*", (req, res) => {
			res.sendFile(path.join(distPath, "index.html"));
		});
	}
}

// ---------- Start ----------
const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, "0.0.0.0", () => {
			console.log(`API is running on port ${PORT}`);
			if (allowedOrigins.length > 0) {
				console.log("CORS allowed origins:", allowedOrigins);
			} else {
				console.log("CORS allowed origins: (all) - CLIENT_URL not set");
			}
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
};

startServer();
