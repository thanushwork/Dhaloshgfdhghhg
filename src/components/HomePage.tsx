import React, { useState } from 'react';
import { Search, Filter, Clock, Star } from 'lucide-react';
import { menuItems } from '../data/menuItems';
import MenuCard from './MenuCard';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import GallerySection from './GallerySection';
import ReviewsSection from './ReviewsSection';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(menuItems.map(item => item.category)))];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ReviewsSection />
      
      {/* Menu Section */}
      <section id="menu" className="py-20 bg-gradient-to-br from-white via-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 hover-swing">
              Our <span className="text-orange-600">Menu</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-on-scroll animate-delay-200">
              Authentic chicken & beef varieties • Quick bites for busy people
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-in-bottom">
            <div className="relative flex-1 enhanced-hover">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 hover:shadow-lg"
              />
            </div>
            
            <div className="relative enhanced-hover">
              <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 appearance-none bg-white transition-all duration-300 hover:shadow-lg"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div key={item.id} className={`animate-zoom-in animate-delay-${index * 100}`}>
                <MenuCard item={item} />
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 animate-fade-in-on-scroll">
              <div className="animate-bounce-in-down">
                <p className="text-gray-500 text-xl mb-4">No items found matching your search.</p>
                <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;