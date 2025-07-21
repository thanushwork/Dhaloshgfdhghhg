import React from 'react';
import { Plus, Minus, Heart } from 'lucide-react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  const cartItem = state.items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const updateQuantity = (newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: newQuantity } });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you can add API call to save favorite to user profile
    console.log(`${isFavorite ? 'Removed from' : 'Added to'} favorites:`, item.name);
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-500 group enhanced-hover card-hover animate-zoom-in">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 tilt"
        />
        <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-bounce-custom hover-tada">
          ₹{item.price}
        </div>
        {user && (
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 left-2 p-2 rounded-full transition-all duration-300 ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 hover-swing">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium hover-pulse">{item.category}</span>
          </div>
          
          {quantity === 0 ? (
            <button
              onClick={addToCart}
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 shadow-md hover:shadow-lg btn-animate liquid-btn hover-rubber-band"
            >
              <Plus className="h-4 w-4 hover:rotate-90 transition-transform duration-300" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200 enhanced-hover">
              <button
                onClick={() => updateQuantity(quantity - 1)}
                className="text-orange-600 hover:text-orange-700 transition-all duration-200 p-1 hover:bg-orange-100 rounded transform hover:scale-110 hover-bounce"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="text-lg font-bold text-orange-600 min-w-[20px] text-center animate-pulse hover-tada">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(quantity + 1)}
                className="text-orange-600 hover:text-orange-700 transition-all duration-200 p-1 hover:bg-orange-100 rounded transform hover:scale-110 hover-bounce"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;