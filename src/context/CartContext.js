import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export let CartContext = createContext();

export function CartContextProvider({ children }) {
  let [Numitem, SetNumitem] = useState(0);
  let [Loading, SetLoading] = useState(true);
  let [CartData, SetCartData] = useState(null);
  let { shake, SetShake } = useState(true);

  async function getUserData(token) {
    console.log(token);
    let option = {
      headers: {
        token,
      },
    };
    SetLoading(true);
    let req = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, option)
      .catch((err) => {
        console.log(err);
        if (err.response.data.statusMsg == "fail") {
          SetCartData(null);
          SetLoading(false);
        }
      });

    if (req?.data.status == "success") {
      SetLoading(false);
      SetCartData(req?.data?.data);
    }
  }
  async function GetUserCart(token) {
    let option = {
      headers: {
        token,
      },
    };
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, option);
  }
  function addCart(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      productId: id,
    };
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      body,
      option
    );
  }
  async function RemoveItem(id) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    SetLoading(true);
    let req = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      option
    );
    console.log(req);
    if (req?.data.status == "success") {
      SetCartData(req.data.data);
      SetLoading(false);
      SetNumitem(req.data.numOfCartItems);
    }
  }
  async function ClearAllPrudects() {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    SetLoading(true);
    let req = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      option
    );
    console.log(req);
    if (req.data.message == "success") {;
      SetCartData(null);
      SetNumitem(req.data.numOfCartItems);
      SetLoading(false);
      EmptyCart();
    }
  }
  function EmptyCart() {
    toast.success('Successfully Deleted!');
  }
  function checkOUtPayment(id, data) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };

    let body = {
      shippingAddress: data,
    };

    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000/Freshcart`,
      body,
      option
    );
  }
  function UpdateData(id, count) {
    let option = {
      headers: {
        token: localStorage.getItem("UserToken"),
      },
    };
    let body = {
      count,
    };
    return axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      body,
      option
    );
  }
  async function GetUserNumCart(token) {
    let req = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, token)
      .catch((err) => {
        console.log(err);
      });

    console.log(req);
    if (req?.data?.status == "success") {
      SetNumitem(req.data.numOfCartItems);
    }
  }
  async function UpdateCount(id, count) {
    if (count == 0) {
      RemoveItem(id);
    } else {
      let req = await UpdateData(id, count).catch((err) => {
        console.log(err);
      });

      console.log(req);
      if (req?.data?.status == "success") {
        SetCartData(req?.data?.data);
        SetLoading(false);
      }
    }
  }

  return (
    <CartContext.Provider
      value={{
        addCart,
        Numitem,
        SetNumitem,
        checkOUtPayment,
        UpdateData,
        GetUserCart,
        getUserData,
        Loading,
        CartData,
        SetLoading,
        SetCartData,
        RemoveItem,
        ClearAllPrudects,
        UpdateCount,
        GetUserNumCart,
        shake,
        SetShake,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
