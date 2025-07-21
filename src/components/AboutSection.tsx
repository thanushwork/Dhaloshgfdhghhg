import React from 'react';
import { Users, Award, Clock, Heart } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: Users,
      title: 'Family Owned',
      description: 'Serving authentic flavors with love since our beginning'
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'Fresh ingredients and traditional recipes every time'
    },
    {
      icon: Clock,
      title: 'Quick Service',
      description: 'Order online and skip the queue for faster pickup'
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish is prepared with care and attention'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 fade-in-on-scroll">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 hover-swing">
            About <span className="text-orange-600">DHALOESH FAST FOOD</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-on-scroll animate-delay-200">
            We specialize in authentic chicken and beef varieties, serving quick bites for busy people. 
            Our focus is on quality, speed, and customer satisfaction with a modern ordering experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className={`text-center group animate-bounce-in-up animate-delay-${(index + 1) * 200}`}>
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors enhanced-hover hover-rubber-band">
                <feature.icon className="h-8 w-8 text-orange-600 hover-swing" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 hover-tada">{feature.title}</h3>
              <p className="text-gray-600 hover-pulse">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 enhanced-hover card-hover animate-slide-in-bottom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="animate-slide-in-left-on-scroll">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 hover-swing">Our Story</h3>
              <p className="text-gray-600 mb-4 hover-pulse">
                DHALOESH FAST FOOD was born from a passion for serving delicious, authentic chicken and beef dishes 
                to our community. We understand that in today's fast-paced world, people need quality food quickly.
              </p>
              <p className="text-gray-600 mb-4 hover-pulse">
                That's why we've created a seamless online ordering system where you can browse our menu, 
                place your order, pay securely, and skip the queue when you arrive for pickup.
              </p>
              <div className="bg-orange-50 p-4 rounded-lg enhanced-hover hover-tada">
                <p className="text-orange-800 font-semibold neon-glow">
                  🍽️ Parcel Only • 📱 Order Online • ⚡ Quick Pickup • 🚫 No Delivery
                </p>
              </div>
            </div>
            <div className="relative animate-slide-in-right-on-scroll">
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Restaurant Interior"
                className="rounded-lg shadow-lg w-full h-64 object-cover enhanced-hover tilt"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white animate-fade-in-on-scroll">
                <p className="font-semibold neon-glow">Fresh • Fast • Flavorful</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;