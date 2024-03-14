import { useContext, useEffect } from "react";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import { Outlet } from "react-router-dom";
import { UserContext } from "../context/TokenContext";
import { CartContext } from "../context/CartContext";
import { WishListContext } from "../context/Wishlist";

export default function Layout() {
  let { getUserData, GetUserNumCart } = useContext(CartContext);
  let { SetUserData, UserData } = useContext(UserContext);
  let { getMyWishList } = useContext(WishListContext);
  useEffect(() => {
    if (UserData) {
      GetUserNumCart(UserData.token);
      getUserData(UserData.token);
      getMyWishList(UserData.token);
    }
  }, [UserData]);

  return (
    <div>
      <Navbar />
      <div className="container my-5 pt-5">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
