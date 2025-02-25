import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      <button
        onClick={() => onAddToCart(product)}
        className="absolute top-4 right-4 p-2 bg-white rounded-md shadow-sm hover:bg-gray-50"
      >
        <ShoppingCart className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex flex-col items-center">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-64 object-contain mb-4" />
        <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
        <p className="text-xl font-bold mt-2">${product.price}</p>
      </div>
    </div>
  )
}

