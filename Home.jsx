import React from 'react';
import { ImageCarousel } from '../carousel/ImageCarousel';
import ProductCategory from '../productCategory/ProductCategory';
import ProductList from '../products/ProductList';
import Footer from '../Footer/Footer';
import { useAuth } from '../Provider/AuthContext';
import AdminDashboard from '../Admin/Home/AdminDashboard';

const Home = () => {
  const { user } = useAuth(); // Get the user from AuthContext

  // Check the user role and display components accordingly
  (user && user.role === 'admin') ? (
    <AdminDashboard />
  ) : (
    <div>
      <ProductCategory />
      <ImageCarousel />
      <ProductList category="Mobile" />
      <ProductList category="Laptop" />
      <ProductList category="Electronics" />
      <ProductList category="Fashion" />
      <ProductList category="Appliances" />
      <Footer/>
    </div>
  )
  

};

export default Home;
