import Order from "../models/order.js";
import Product from "../models/product.js";
import { isAdmin } from "./userController.js";
import crypto from "crypto";


export async function createOrder(req, res) {
	try {
		if (req.user == null) {
			res.status(401).json({ message: "Please login to create an order" });
			return;
		}

		const latestOrder = await Order.find().sort({ date: -1 }).limit(1);

		let orderId = "CBC00202";

		if (latestOrder.length > 0) {
			const lastOrderIdInString = latestOrder[0].orderID;
			const lastOrderIdWithoutPrefix = lastOrderIdInString.replace("CBC", "");
			const lastOrderIdInInteger = parseInt(lastOrderIdWithoutPrefix);
			const newOrderIdInInteger = lastOrderIdInInteger + 1;
			const newOrderIdWithoutPrefix = newOrderIdInInteger
				.toString()
				.padStart(5, "0");
			orderId = "CBC" + newOrderIdWithoutPrefix;
		}

		const items = [];
		let total = 0;

		if (req.body.items !== null && Array.isArray(req.body.items)) {
			for (let i = 0; i < req.body.items.length; i++) {
				let item = req.body.items[i];

				let product = await Product.findOne({
					productId: item.productId,
				});

				if (product == null) {
					res
						.status(400)
						.json({ message: "Invalid product ID: " + item.productId });
					return;
				}

				// Check stock availability
				if (product.stock < item.qty) {
					res.status(400).json({
						message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
					});
					return;
				}

				items[i] = {
					productId: product.productId,
					name: product.name,
					image: product.image[0],
					price: product.price,
					qty: item.qty,
				};

				total += product.price * item.qty;
			}
		} else {
			res.status(400).json({ message: "Invalid items format" });
			return;
		}

		const paymentMethod = req.body.paymentMethod || "payhere";

		const order = new Order({
			orderID: orderId,
			email: req.user.email,
			name: req.user.name,
			address: req.body.address,
			phone: req.body.phone,
			items: items,
			total: total,
			paymentMethod: paymentMethod,
			paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "pending",
		});

		const result = await order.save();

		// If PayHere payment, generate hash for frontend
		if (paymentMethod === "payhere") {
			const merchantId = process.env.PAYHERE_MERCHANT_ID;
			const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET;
			const amount = total.toFixed(2);
			const currency = "LKR";

			const hash = crypto
				.createHash("md5")
				.update(
					merchantId +
						orderId +
						amount +
						currency +
						crypto
							.createHash("md5")
							.update(merchantSecret)
							.digest("hex")
							.toUpperCase()
				)
				.digest("hex")
				.toUpperCase();

			res.json({
				message: "Order created successfully",
				order: result,
				payhereData: {
					merchant_id: merchantId,
					return_url: process.env.PAYHERE_RETURN_URL || "http://localhost:3000/payment-success",
					cancel_url: process.env.PAYHERE_CANCEL_URL || "http://localhost:3000/payment-cancel",
					notify_url: process.env.PAYHERE_NOTIFY_URL || "http://localhost:5000/api/orders/payhere-notify",
					order_id: orderId,
					items: items[0].name + (items.length > 1 ? ` +${items.length - 1} more` : ""),
					currency: currency,
					amount: amount,
					first_name: req.user.name.split(" ")[0],
					last_name: req.user.name.split(" ").slice(1).join(" ") || "",
					email: req.user.email,
					phone: req.body.phone,
					address: req.body.address,
					city: req.body.city || "Colombo",
					country: "Sri Lanka",
					hash: hash,
				},
			});
		} else {
			// Cash on delivery
			res.json({
				message: "Order created successfully",
				order: result,
			});
		}
	} catch (error) {
		console.error("Error creating order:", error);
		res.status(500).json({ message: "Failed to create order" });
	}
}