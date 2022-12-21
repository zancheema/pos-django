import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Items from "./pages/Items";
import Stocks from "./pages/Stocks";
import Invoice from "./pages/Invoice";
import Activity from "./pages/Activity";
import Login from "./pages/Login";
import { useAuth } from './util/functions';
import { Navigate } from 'react-router-dom';
import Logout from './components/user/Logout';
import { useEffect } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useAuth();

  useEffect(() => {
    console.log(`isAuthenticated: ${isAuthenticated}`);
  }, [isAuthenticated]);

  return (
    <Router>
      {
        isAuthenticated
          ? <Sidebar>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/inventory/categories' element={<Categories />} />
              <Route path='/inventory/brands' element={<Brands />} />
              <Route path='/inventory/items' element={<Items />} />
              <Route path='/inventory/stocks' element={<Stocks />} />
              <Route path='/invoice' element={<Invoice />} />
              <Route path='/activity' element={<Activity />} />
              <Route path="/user/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Sidebar>
          : <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
      }
    </Router>
  );
}

export default App;
