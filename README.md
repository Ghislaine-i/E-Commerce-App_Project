# E-Commerce Application

A modern and user-friendly e-commerce application built with React, Vite, and the DummyJSON API.

## Features

### Products Display
- Fetch and display products from DummyJSON API
- Clean and responsive product grid layout
- Add products to cart or wishlist

### Sorting and Categories
- Sort products by price (low to high, high to low)
- Filter products by category (smartphones, laptops, fragrances, etc.)
- Real-time updates without page reload

### Cart and Wishlist
- Add/remove products from cart
- Persistent cart and wishlist using localStorage
- Quantity management in cart

### Authentication
- User login and signup
- Protected routes for dashboard
- Simulated authentication with DummyJSON

### Dashboard (Admin Simulation)
- Create new products
- Update existing products
- Delete products
- CRUD operations via DummyJSON API

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **DummyJSON** - Mock API for products and auth

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in terminal)

### Usage

- **Home Page**: Browse products, sort, and filter by category
- **Login/Signup**: Use the provided test credentials or create a new account
- **Cart/Wishlist**: Manage your selected items
- **Dashboard**: Access admin features after logging in

### Test Credentials

- **Email**: atkinson-hudson@dummyjson.com
- **Password**: 0lelplR

## Project Structure

```
src/
├── api/
│   └── axios.js          # Axios configuration
├── components/
│   ├── Navbar.jsx        # Navigation bar
│   ├── ProductCard.jsx   # Product display card
│   ├── SortBar.jsx       # Sorting and filtering controls
│   └── ProtectedRoute.jsx # Route protection
├── context/
│   ├── AuthContext.jsx   # Authentication state
│   ├── CartContext.jsx   # Cart management
│   ├── ProductContext.jsx # Products and API calls
│   └── WishlistContext.jsx # Wishlist management
├── pages/
│   ├── Home.jsx          # Main products page
│   ├── Cart.jsx          # Shopping cart
│   ├── Wishlist.jsx      # Wishlist page
│   ├── Login.jsx         # Login form
│   ├── Signup.jsx        # Signup form
│   └── Dashboard.jsx     # Admin dashboard
└── main.jsx              # App entry point
```

## API Reference

This app uses the [DummyJSON API](https://dummyjson.com/) for:
- Products: `/products`, `/products/category/{category}`
- Authentication: `/auth/login`
- CRUD: `/products/add`, `/products/{id}`, DELETE `/products/{id}`
  ##DEPLOYMENT LINK
   https://ghislaine-i.github.io/E-Commerce-App_Project/

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

