import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

export default function Categories() {
  let [loading, setloading] = useState(false);
  let [SpecificCategroy, SetSpecificCategroy] = useState(null);
  function getCategories(queryData) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, isLoading } = useQuery("CategroyApi", getCategories);

  async function getSpecificCategroy(id) {
    setloading(true);
    let req = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
    if (req.status == 200) {
      SetSpecificCategroy(req?.data?.data);
      (SpecificCategroy);
    }
    // (req);
    setloading(false);
  }

  return (
    <>
      {isLoading ? (
        <div className=" loading d-flex justify-content-center align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="container">
          <div className="row g-4">
            {data?.data?.data?.map((element) => {
              return (
                <div
                  key={element._id}
                  onClick={() => getSpecificCategroy(element._id)}
                  className="col-md-4 cursor-pointer "
                >
                  <div className="item action">
                    <img
                      src={element.image}
                      className="w-100"
                      height={350}
                      alt=""
                    />
                    <h5 className="fw-bolder text-center p-4 text-main">
                      {" "}
                      {element.name}
                    </h5>
                  </div>
                </div>
              );
            })}
          </div>

          {loading ? (
            <div className=" loading d-flex justify-content-center fs-1  align-items-center bg-white position-fixed top-0 end-0 start-0 bottom-0">
              <span className="loader2"></span>
            </div>
          ) : (
            <div className="row g-3 my-5">
              {SpecificCategroy == null
                ? ""
                : SpecificCategroy.map((el) => {
                    return (
                      <div key={el.id} className="col-md-3">
                        <div className="item bg-main text-white px-2 rounded rounded-pill">
                          <p className="fw-bolder">{el.name}</p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      )}
    </>
  );
}
