import {BrowserRouter, Routes, Route} from "react-router";
import useAuthUser from "./hooks/useAuthUser";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar";
import  Spinner from "./components/Spinner";
import './App.css';
import SignUpForm from "./pages/SignUp";
import Admin, {categories} from "./pages/Admin";
import Products from "./pages/Products";
import Orders from "./pages/Orders";

function App() {
  const {user, loading} = useAuthUser();
  const isAdminUser = user ? user.role === 'admin' : false;

  return (
      <BrowserRouter>
      <Navbar categories={categories} />
        <div className="container">
      <Routes>
        <Route exact path="/"  element={<Home />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/signup" exact element={<SignUpForm />} />
        <Route path={'/login'} exact element={<Login />} />
        <Route path={'/admin'} exact element={loading ? <Spinner /> : isAdminUser ? <Admin /> : <NotFoundPage />} />
        <Route path={'/orders'} exact element={loading ? <Spinner /> : user ? <Orders /> : <NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
      </BrowserRouter>
  );
}

export default App;
