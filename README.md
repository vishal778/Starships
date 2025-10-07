# Starships Store - React Native E-Commerce App

A modern mobile e-commerce application built with React Native, TypeScript, and Redux. This app features a clean bottom tab navigation with Home, Search, and Cart screens, showcasing starship products with a sleek, elevated design.

## Quick Start

### Prerequisites

- Node.js
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the app**

   **For Android:**

   ```bash
   npx react-native run-android
   ```

   **For iOS:**

   ```bash
   cd ios
   pod install
   cd ..
   npx react-native run-ios
   ```

4. **Start Metro bundler** (if not started automatically)

   ```bash
   npx react-native start
   ```

## Features

### Home Screen

- Bottom Tab Navigation with Home, Search, and Cart tabs
- Product Grid displaying starship products in a 2-column layout
- Elevated Cards with modern shadow effects and borders
- Search Bar with elevated design and proper styling
- Add to Cart functionality with quantity controls
- Floating Cart Button when items are added
- Infinite Scroll with loading indicators

### Search Screen

- Auto-focus search input when screen loads
- Real-time Search with live filtering
- Highlighted Results showing search terms
- Product Cards with consistent elevated design
- Empty States with helpful messaging

### Cart Screen

- Product Management with quantity controls
- Remove Items functionality
- Order Summary with subtotal, tax, and total
- Payment Method Selection (Debit/Credit Card, Net Banking)
- Order Confirmation with success modal
- Empty Cart State with call-to-action

## Design Features

### Modern UI Elements

- Elevated Cards with strong shadows and borders
- Consistent White Background across all screens
- Subtle Header Borders for clean separation
- Rounded Corners and modern styling
- Proper Status Bar handling with white background
- Safe Area management for different device types

### Navigation

- Bottom Tab Navigator with custom icons
- Stack Navigation for product details and checkout flow
- Consistent Header across all screens
- Proper Back Navigation on search and cart screens

## Architecture

### Clean Code Structure

```
src/
├── domain/               # Data models and types
│   └── models/          # Product, Cart models
├── presentation/         # UI Layer
│   ├── screens/         # Home, Search, Cart screens
│   └── components/      # Reusable UI components
├── navigators/          # Navigation configuration
├── redux/              # State management
│   ├── actions/        # Cart actions
│   ├── reducers/       # Cart reducer
│   └── store.ts        # Redux store
├── dls/                # Design System
│   └── colors.ts       # Color palette
└── service/            # API services (future use)
```

### Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type safety and better development experience
- **Redux** - State management for cart and products
- **React Navigation** - Navigation between screens
- **React Native Vector Icons** - Icon library
- **React Native Safe Area Context** - Safe area handling

## Development

### Available Scripts

```bash
# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios

# Clean and rebuild
npx react-native start --reset-cache
```

### Code Style

- TypeScript for type safety
- Functional Components with hooks
- Consistent Styling with StyleSheet
- Clean Architecture principles
- No flexShrink usage (as per requirements)

## Key Components

### Screens

- `HomeScreen` - Product grid with search and cart functionality
- `SearchScreen` - Product search with real-time filtering
- `CartScreen` - Shopping cart with order management

### Components

- `Header` - Reusable header with title and back navigation
- `TabNavigator` - Bottom tab navigation setup

### State Management

- **Cart Reducer** - Manages cart items and quantities
- **Cart Actions** - Add, remove, and update cart items
- **Redux Store** - Centralized state management

## Features Implemented

✅ Bottom Tab Navigation with Home, Search, and Cart  
✅ Product Grid Layout with elevated cards  
✅ Real-time Search with highlighting  
✅ Shopping Cart with quantity management  
✅ Order Summary with tax calculation  
✅ Payment Method Selection  
✅ Order Confirmation flow  
✅ Responsive Design for different screen sizes  
✅ Modern UI with shadows and borders  
✅ TypeScript for type safety  
✅ Clean Architecture for maintainability

## Future Enhancements

- [ ] Real API integration
- [ ] User authentication
- [ ] Product categories
- [ ] Wishlist functionality
- [ ] Push notifications
- [ ] Offline support
- [ ] Product reviews and ratings

## License

This project is for demonstration purposes. Feel free to use it as a reference for your own React Native applications.

---

**Happy Coding!**
