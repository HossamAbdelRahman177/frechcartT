import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function Brands() {
  let { data, isLoading } = useQuery("BrandsApi", GetAllBrands);
  console.log(data?.data?.data);
  function GetAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  return (
    <>
      {isLoading ? (
        <div className=" loading d-flex justify-content-center fs-1  align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader2"></span>
        </div>
      ) : (
        <div className="container">
          <div className="row g-4">
            {data?.data?.data.map((element) => {
              return (
                <div className="col-md-3">
                  <div className="item bg-white border border-2 ">
                    <img src={element.image} alt="" className="w-100" />
                    <p className="text-center fw-bolder fs-4">{element.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
