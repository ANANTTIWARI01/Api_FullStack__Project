import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth'; 

function Header() {
  const { isLogged, setIsLogged } = useContext(AuthContext);

  function handleLogout() {
    setIsLogged(false);
  }

  return (
    <>
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Shopping CART</h1>
            
            {/* Only show AddProduct button if the user is logged in */}
            {isLogged && (
              <Link
                to="/AddProduct"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
              >
                <span className="mr-3">+</span> Add Product
              </Link>
            )}

            <div className="flex items-center justify-around">
              <Link className="text-xl font-semibold mx-5">Store</Link>
              <Link className="text-xl font-semibold mx-4">Cart:0</Link>

              {/* Condition of Login/Logout */}
              {!isLogged ? (
                <Link className="text-xl font-semibold mx-4" to="/login">Login</Link>
              ) : (
                <Link className="text-xl font-semibold mx-4" onClick={handleLogout}>Logout</Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
