import { Children } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./pages/Home/Home";
import Categories from "./pages/Categories/Categories";
import NotFound from "./pages/NotFound/NotFound";
import Proudect from "./pages/Proudect/Proudect";
import Cart from "./pages/Cart/Cart";
import Brands from "./pages/Brands/Brands";
import Registar from "./pages/Registar/Registar";
import Login from "./pages/Login/Login";
import { UserContextProvider } from "./context/TokenContext";
import ProtectedRouting from "./Component/ProtectedRouting/ProtectedRouting";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ProudectDeitals from "./pages/ProudectDeitals/ProudectDeitals";
import { CartContextProvider } from "./context/CartContext";
import AllOrders from "./pages/AllOrders/AllOrders";
import CheckOut from "./pages/CheckOut/CheckOut";
import { WishListContextPorvider } from "./context/Wishlist";
import WhishList from "./pages/WhishList/WhishList";

const Query = new QueryClient();
const Routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "Proudect",
          element: (
            <ProtectedRouting>
              <Proudect />
            </ProtectedRouting>
          ),
        },
        {
          path: "ProudectDeitals/:id",
          element: (
            <ProtectedRouting>
              <ProudectDeitals />
            </ProtectedRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouting>
              <Categories />
            </ProtectedRouting>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouting>
              <AllOrders />
            </ProtectedRouting>
          ),
        },
        {
          path: "CheckOut/:id",
          element: (
            <ProtectedRouting>
              <CheckOut />
            </ProtectedRouting>
          ),
        },
        {
          path: "WhishList",
          element: (
            <ProtectedRouting>
              <WhishList />
            </ProtectedRouting>
          ),
        },
        { path: "Registar", element: <Registar /> },
        { index: true, element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "ResetPassword", element: <ResetPassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    basename: "/Freshcart/",
  }
);
export default function App() {
  return (
    <QueryClientProvider client={Query}>
      <WishListContextPorvider>
        {/* <ReactQueryDevtools></ReactQueryDevtools> */}
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={Routes} />
          </UserContextProvider>
        </CartContextProvider>
      </WishListContextPorvider>
    </QueryClientProvider>
  );
}
