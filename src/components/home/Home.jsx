import React from 'react';
import { ImageCarousel } from '../carousel/ImageCarousel';
import ProductCategory from '../productCategory/ProductCategory';
import ProductList from '../products/ProductList';
import Footer from '../Footer/Footer';
import { useAuth } from '../Provider/AuthContext';
import AdminDashboard from '../Admin/Home/AdminDashboard';
import Navbar from '../navbar/Navbar';

const Home = () => {
  const { user } = useAuth(); // Get the user from AuthContext

  // Check the user role and display components accordingly
  if (user && user.role === 'admin') {
    return <AdminDashboard />; // Render AdminDashboard for admin users
  } 

  return (
    <div>
      <Navbar/>
      <ProductCategory />
      <ImageCarousel />
      <ProductList category="Mobile" />
      <ProductList category="Laptop" />
      <ProductList category="Electronics" />
      <ProductList category="Fashion" />
      <ProductList category="Appliances" />
      <Footer/>
    </div>
  );
};

export default Home;
