import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState('menu');
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  // In your Navbar component or Search component

  /*const handleSearch = (event) => {
    const query = String(event.target.value || ''); // Convert to string if it's undefined or null
    if (query.trim() !== '') {
      // Send the query to the backend API
      fetch(`/api/food/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log('Search results:', data.data); // Handle the search results
          } else {
            console.log('No results found');
          }
        })
        .catch((error) => console.error('Error searching food items:', error));
    }
  };
  */

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu('home')}
          className={menu === 'home' ? 'active' : ''}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu('menu')}
          className={menu === 'menu' ? 'active' : ''}
        >
          menu
        </a>
        <a
          href="#app download"
          onClick={() => setMenu('mobile-app')}
          className={menu === 'mobile-app' ? 'active' : ''}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu('contact-us')}
          className={menu === 'contact-us' ? 'active' : ''}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />{' '}
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
/* after the  <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        
<input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update the search query
          />
          <button onClick={handleSearch}>
            {' '}
             //Trigger search when clicked 
           <img src={assets.search_icon} alt="Search" />
          </button>
*/

export default Navbar;
