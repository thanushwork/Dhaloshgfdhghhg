import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface CartProps {
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ onCheckout }) => {
  const { state, dispatch } = useCart();
  const { isAuthenticated } = useAuth();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const closeCart = () => {
    dispatch({ type: 'CLOSE_CART' });
  };

  if (!state.isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in-on-scroll">
      <div className="w-full max-w-md bg-white h-full shadow-xl transform transition-transform duration-300 animate-slide-in-right">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2 hover-swing">
            <ShoppingBag className="h-6 w-6 hover-bounce" />
            <span>Your Cart</span>
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 transition-colors hover-rubber-band"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center py-8 animate-bounce-in-down">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4 hover-swing" />
              <p className="text-gray-500 hover-pulse">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2 hover-pulse">Add some delicious items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4 enhanced-hover card-hover animate-slide-in-left">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg tilt hover-rubber-band"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 hover-swing">{item.name}</h3>
                    <p className="text-sm text-gray-600 hover-pulse">₹{item.price} each</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-orange-600 hover:text-orange-700 transition-colors p-1 hover:bg-orange-100 rounded hover-bounce"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-lg font-semibold text-orange-600 min-w-[20px] text-center hover-tada">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-orange-600 hover:text-orange-700 transition-colors p-1 hover:bg-orange-100 rounded hover-bounce"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 transition-colors text-sm hover-wobble"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 hover-pulse">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {state.items.length > 0 && (
          <>
            <div className="border-t bg-gray-50 p-6 animate-slide-in-bottom">
            <div className="mb-4 p-4 bg-blue-50 rounded-lg enhanced-hover">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center hover-swing">
                <CreditCard className="h-5 w-5 mr-2 hover-bounce" />
                Order Summary
              </h3>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span className="hover-pulse">Items ({state.items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="hover-pulse">₹{state.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="hover-pulse">Service Type</span>
                  <span className="font-medium hover-pulse">Parcel (No Delivery)</span>
                </div>
                <div className="border-t border-blue-200 pt-1 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span className="hover-pulse">Total to Pay</span>
                    <span className="hover-tada">₹{state.total}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900 hover-swing">Total:</span>
              <span className="text-2xl font-bold text-orange-600 neon-glow hover-tada">₹{state.total}</span>
            </div>
            <button
              onClick={onCheckout}
              disabled={!isAuthenticated}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed btn-animate liquid-btn hover-rubber-band"
            >
              {isAuthenticated ? 'Proceed to Payment' : 'Please Login to Order'}
            </button>
            {!isAuthenticated && (
              <p className="text-sm text-gray-500 text-center mt-2 hover-pulse">
                You need to login to place an order
              </p>
            )}
            </div>
            <div className="px-6 pb-4 animate-fade-in-on-scroll">
            <p className="text-xs text-gray-500 text-center hover-pulse">
              📦 Parcel Only • 🚫 No Delivery • ⚡ Skip the Queue
            </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;