import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let WishListContext = createContext();

export function WishListContextPorvider({ children }) {
  let [whislist, setWhishlist] = useState([]);
  let [loading, setLoading] = useState(true);
  function postWishListProudect(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      productId: id,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      body,
      option
    );
  }

  async function getMyWishList(token) {
    let option = {
      headers: {
        token,
      },
    };
    try {
      setLoading(true);
      let req = await axios.get(
        `https://ecommerce..routemisr.com/api/v1/wishlist`,
        option
      );
      console.log(req);

      setWhishlist(req.data.data);
      if (req.data.status == "success") {
        setLoading(false);
      }
    } catch (Error) {
      console.log(Error);
    }
  }

  function DeletItemWhishList(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    return axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      option
    );
  }

  useEffect(() => {
    getMyWishList();
  }, []);

  return (
    <WishListContext.Provider
      value={{
        postWishListProudect,
        getMyWishList,
        DeletItemWhishList,
        whislist,
        setWhishlist,
        loading,
        setLoading
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
