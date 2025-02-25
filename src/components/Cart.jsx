import { ShoppingCart, X } from "lucide-react"

export default function Cart({ items, onRemoveItem }) {
  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShoppingCart className="w-6 h-6" />
        <h2 className="text-xl font-semibold">Tu carrito de compras</h2>
      </div>

      {items.length > 0 ? (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center group">
              <div className="flex items-center gap-2">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-12 h-12 object-contain" />
                <span>{item.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>${item.price}</span>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No hay productos en el carrito</p>
      )}
    </div>
  )
}

