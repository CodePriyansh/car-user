import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";

const CarApi = ({ selectedOptions, initial, setCars }) => {
  const [storeInitialValue, setStoreInitialValue] = useState(false);
  const [payload, setPayload] = useState({});
  const [text, setText] = useState("Apply Filter");
  const cookies = new Cookies();
  let token = cookies.get("authToken");

  useEffect(() => {
    console.log(selectedOptions)
    setStoreInitialValue(initial);
    if (initial) {
      setText(" ");
    }
  }, [initial]);

  useEffect(() => {
    if (storeInitialValue) {
      setPayload({});
    } else {
      const updatedPayload: any = {};

      if (selectedOptions?.priceRange) {
        updatedPayload.priceMax = selectedOptions.priceRange[1];
      }
      if (selectedOptions?.priceRange) {
        updatedPayload.priceMin = selectedOptions.priceRange[0];
      }
      if (selectedOptions?.carType?.length) {
        updatedPayload.type = selectedOptions.carType;
      }
      if (selectedOptions?.color?.length) {
        updatedPayload.color = selectedOptions.color;
      }
      if (selectedOptions?.company?.length) {
        updatedPayload.company = selectedOptions.company;
      }
      if (selectedOptions?.modelName) {
        updatedPayload.modelName = selectedOptions.modelName;
      }
      if (selectedOptions?.modelYear?.length) {
        updatedPayload.modelYear = selectedOptions.modelYear;
      }
      if (selectedOptions?.transmission?.length) {
        updatedPayload.transmission = selectedOptions.transmission;
      }

      setPayload(updatedPayload);
    }
  }, [selectedOptions, initial]);

  const ApplyFilterApiCall = async () => {
    try {
      const response = await instance.post("/api/cars/user/all", payload, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      setCars(response?.data?.data);
      setStoreInitialValue(false);
    } catch (error) {
      console.error("Error applying filters:", error);

      if(!initial && error.response.status == 404){
        console.error("No cars found matching the selected criteria.")
        toast.error("No cars found matching the selected criteria.")
        setCars([]);
      }else{
        console.log("No cars found")
      }
    }
  };

  const handleApply = () => {
    ApplyFilterApiCall();
  };

  useEffect(() => {
    if (storeInitialValue === true) {
      ApplyFilterApiCall();
    }
  }, [storeInitialValue]);

  return (
    <>
      <div onClick={handleApply} >
        {text}
      </div>
      {/* <ToastContainer/> */}
    </>
  );
};

export default CarApi;
