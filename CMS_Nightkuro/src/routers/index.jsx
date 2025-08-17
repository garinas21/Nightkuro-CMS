import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage";
import HomePage from "../Pages/HomePage";
import ProductPage from "../Pages/ProductPage";
import ProtactionLayout from "../layouts/ProtactionLayout";
import CategoryPage from "../Pages/CategoryPage";
import AddProductPage from "../Pages/AddProductPage";
import EditProductPage from "../Pages/EditProductPage";
import AddUserPage from "../Pages/AddUserPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtactionLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/addProduct" element={<AddProductPage />} />
        <Route path="/Product/editProduct/:id" element={<EditProductPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/addUser" element={<AddUserPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
