import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  redirect
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Order from "./pages/Order";
import SlickSlider from "./pages/SlickSlider";

export default function App() {
  const user = useSelector(state=>state.root.user.currentUser);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "login",
      element:<Login/>,
      loader:()=>(user?redirect("/"):null),
    },
    {
      path: "register",
      element: <Register/>,
      loader:()=>(user?redirect("/"):null),
    },
    {
      path: "product/:id",
      element: <Product/>
    },
    {
      path: "products/:category",
      element: <ProductList/>
    },
    {
      path: "cart",
      element: <Cart/>
    },
    {
      path:"success",
      element:<Success/>
    },
    {
      path:"checkout",
      element:<Checkout/>
    },
    {
      path:"order",
      element:<Order/>
    },
    {
      path:"slider",
      element:<SlickSlider/>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
