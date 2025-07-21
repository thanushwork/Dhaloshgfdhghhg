import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { User, Package, TrendingUp, Heart, Calendar, Clock } from 'lucide-react';

interface Order {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: string;
}

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  favoriteItem: string;
}

const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalOrders: 0,
    totalSpent: 0,
    avgOrderValue: 0,
    favoriteItem: 'No orders yet'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserOrders();
    }
  }, [user]);

  const loadUserOrders = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await ordersAPI.getUserOrders(token);
      if (response.success) {
        setOrders(response.data);
        calculateStats(response.data);
      } else {
        console.error('Failed to fetch orders:', response.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orders: Order[]) => {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total?.toString() || '0'), 0);
    const avgOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;
    
    // Calculate favorite item
    const itemCounts: { [key: string]: number } = {};
    orders.forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach((item: any) => {
          const itemName = item.item_name || item.name || 'Unknown Item';
          itemCounts[itemName] = (itemCounts[itemName] || 0) + (item.quantity || 1);
        });
      } else if (typeof order.items === 'string') {
        try {
          const items = JSON.parse(order.items);
          items.forEach((item: any) => {
            const itemName = item.item_name || item.name || 'Unknown Item';
            itemCounts[itemName] = (itemCounts[itemName] || 0) + (item.quantity || 1);
          });
        } catch (e) {
          console.error('Error parsing order items:', e);
        }
      }
    });

    const favoriteItem = Object.keys(itemCounts).length > 0 
      ? Object.entries(itemCounts).reduce((a, b) => itemCounts[a[0]] > itemCounts[b[0]] ? a : b)[0]
      : 'No orders yet';

    setStats({
      totalOrders,
      totalSpent,
      avgOrderValue,
      favoriteItem
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const handleReorder = async (order: Order) => {
    try {
      let items = [];
      if (Array.isArray(order.items)) {
        items.forEach((item: any) => {
          // Add logic to add items to cart
          console.log('Adding to cart:', item);
        });
      } else if (typeof order.items === 'string') {
        items = JSON.parse(order.items);
        items.forEach((item: any) => {
          // Add logic to add items to cart
          console.log('Adding to cart:', item);
        });
      }
    } catch (error) {
      console.error('Error reordering:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <User className="w-8 h-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.name || 'Customer'}!
              </h1>
              <p className="text-gray-600">Here's your order summary and recent activity</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.totalSpent.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{stats.avgOrderValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorite Item</p>
                <p className="text-lg font-bold text-gray-900 truncate">{stats.favoriteItem}</p>
              </div>
              <Heart className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No orders yet. Start ordering to see your history!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {orders.map((order) => (
                <div key={order.id} className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'confirmed'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'preparing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'ready'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.created_at)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="space-y-2">
                      {Array.isArray(order.items) ? (
                        order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-gray-700">
                              {item.item_name || item.name || 'Unknown Item'} x{item.quantity || 1}
                            </span>
                            <span className="text-gray-900 font-medium">
                              ₹{((parseFloat(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-600">Order details unavailable</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-gray-900">
                      Total: ₹{parseFloat(order.total?.toString() || '0').toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleReorder(order)}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;