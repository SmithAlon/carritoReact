import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import productsData from './products.json';

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <ProductList products={productsData.products} onAddToCart={addToCart} />
          </div>
          <div className="md:col-span-1">
            <Cart items={cartItems} onRemoveItem={removeFromCart} />
          </div>
        </div>
      </div>
    </div>
  );
}
