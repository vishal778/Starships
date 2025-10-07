# 🛍️ React Native E-Commerce App

This is a demo mobile e-commerce application built using **React Native**, **TypeScript**, and **Redux**, following clean code architecture. It supports essential e-commerce functionality using mock data and is structured for scalability and readability.

---

## 🚀 Installation & Setup

### 📦 Dependencies

Install project dependencies:

```bash
yarn install


▶️ Run on Android

yarn android

🍏 Run on iOS

cd ios
pod install
cd ..
yarn ios



📱 Features Implemented
🏠 Home Screen
Category-wise horizontal product lists
Product banners with smooth scrolling
Tags like "Selling Fast", "Only 2 Left", and "Crazy Deal"

🔍 Search Screen
Live product filtering
Debounced input for better performance

📦 Product Detail Screen
Image carousel
Cart actions (+/- and Checkout based on cart state)

🛒 Cart Screen
Quantity management
Remove item
Price summary with sticky footer

📄 Cart Review Screen
Order summary
Selected payment method (COD default)

✅ Confirmation Screen
Auto-navigation to Home screen
Cart state cleared and navigation stack reset


🧱 Tech Stack & Architecture
💬 TypeScript – Enforced types throughout app for safer development
🧱 Clean Code Architecture – Modular and maintainable structure
🔄 Redux (Thunk) – State management for cart and products
📦 Mock Data – Used for simulating real-world flows
🌐 Generic API Service File – Created for future real API calls (not used in this version)



📁 Folder Structure
src/
├── domain/               # Models (Product, Cart, etc.)
├── presentation/         # UI Screens and Components
│   ├── screens/          # All 6 implemented screens
│   └── components/       # Header, BannerSlider, etc.
├── redux/                # Actions, Reducers, Store
├── service/              # API and utility helpers
├── navigators/           # Navigation types and stack
├── dls/                  # Design System (colors, spacing)
```
