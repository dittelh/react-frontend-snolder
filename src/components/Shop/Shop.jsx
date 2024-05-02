import React, { useEffect, useState } from 'react';
import ShopItem from './ShopItem';
import Slideshow from './Slideshow';
import axios from 'axios';
import { CartContext } from '../../App';
import { useContext } from 'react';

const Shop = () => {
  const cart = useContext(CartContext);

  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // Klar til at skulle have et endpoint til data - indkommenter linje 17 og udkommenter linje 16
    const response = await axios.get('http://127.0.0.1:8000/candies');
    console.log(response)
    setData(response.data);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };


  const filteredData = data.filter((item) => {
    const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const typeMatch = selectedType ? item.type === selectedType : true;
    const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
    return categoryMatch && typeMatch && brandMatch;
  });

  return (
    <div>
      <Slideshow />
      <div className="container">
        <h1 className="mt-5 Cronus-font">Shoppen</h1>
        
        <div className='d-flex gap-2'>
          {/* Filter by category */}
          <select
            className="form-select"
            aria-label="Filter by category"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="">Filtre efter kategori</option>
            <option value="Bolcher">Bolcher</option>
            <option value="Chokolade">Chokolade</option>
            <option value="Vingummi">Vingummi</option>
          </select>

          {/* Filter by type */}
          <select
            className="form-select"
            aria-label="Filter by type"
            onChange={handleTypeChange}
            value={selectedType}
          >
            <option value="">Filtre efter type</option>
            <option value="Chokoladebar">Chokoladebar</option>
            <option value="Chokoladestykker">Chokoladestykker</option>
            <option value="Plade Chokolade">Plade Chokolade</option>
            <option value="Slik">Slik</option>
          </select>

          {/* Filter by brand */}
          <select
            className="form-select"
            aria-label="Filter by brand"
            onChange={handleBrandChange}
            value={selectedBrand}
          >
            <option value="">Filtre efter brand</option>
            <option value="Cadbury">Cadbury</option>
            <option value="Ferrero">Ferrero</option>
            <option value="Haribo">Haribo</option>
            <option value="Hershey's">Hershey's</option>
            <option value="Jelly Belly">Jelly Belly</option>
            <option value="Lindt">Lindt</option>
            <option value="Mars">Mars</option>
            <option value="Mondelez International">Mondelez International</option>
            <option value="Nestlé">Nestlé</option>
            <option value="Storck">Storck</option>
            <option value="Toblerone">Toblerone</option>
            <option value="Wrigley's">Wrigley's</option>
          </select>
        </div>
        
        <div className="row my-5">
          {filteredData.map((item) => (
            <div key={item.id} className="col-6 col-lg-3 mb-5">
              <ShopItem item={item} updateCart={cart.setCartItems} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
