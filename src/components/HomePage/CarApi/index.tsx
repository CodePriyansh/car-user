import React, { useEffect, useState } from "react";
import instance from "@/network/axios";
import Cookies from "universal-cookie";
import toast from 'react-hot-toast';
import { useFilter } from "@/context/FilterContext"; // Import the custom hook

interface SelectedOptions {
  priceRange?: [number, number];
  carType?: string[];
  color?: string[];
  company?: string;
  modelName?: string;
  modelYear?: string;
  transmission?: string[];
}

interface CarApiProps {
  selectedOptions: SelectedOptions;
  initial: boolean;
  setCars: (cars: any[]) => void;
}

const CarApi: React.FC<CarApiProps> = ({ selectedOptions, initial, setCars, setCarNotFoundtext }) => {
  const { activeFilter } = useFilter(); // Use the custom hook to get activeFilter
  const [storeInitialValue, setStoreInitialValue] = useState(false);
  const [payload, setPayload] = useState<any>({});
  const [text, setText] = useState("Apply Filter");
  const [loading, setLoading] = useState(false); // Added loading state
  const cookies = new Cookies();
  let token = cookies.get("authToken");

  useEffect(() => {
    setStoreInitialValue(initial);
    if (initial) {
      setText(" ");
    }
  }, [initial, activeFilter]);


  useEffect(() => {
    console.log("jenf222lorem ipus")
    console.log(activeFilter,"ehwiohfiehuwiuuuuuuuuuuuuuuuuuuuu")
    if (storeInitialValue) {
      setPayload({});
    } else {
      const updatedPayload: any = {};

      if (selectedOptions?.priceRange) {
        updatedPayload.priceMax = selectedOptions.priceRange[1];
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
  }, [selectedOptions, initial, activeFilter]);

  const applyFilterApiCall = async () => {
    setLoading(true); // Set loading to true
    try {
      const endpoint = activeFilter === "car" ? "/api/cars/user/all" : "/api/bikes/user/all"; // Conditional endpoint
      const response = await instance.post(endpoint, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCars(response?.data?.data);
      setStoreInitialValue(false);
      console.log(response?.data?.data,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
      if(!response?.data?.data.length)
      setCarNotFoundtext("No items found matching the selected criteria.")

    } catch (error) {
      console.error("Error applying filters:", error);
      if (!initial && error.response?.status === 404) {
        toast.error("No items found matching the selected criteria.");
        setCars([]);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  const handleApply = () => {
    applyFilterApiCall();
  };

  useEffect(() => {
    if (storeInitialValue === true) {
      applyFilterApiCall();
    }
  }, [storeInitialValue, activeFilter]);

  return (
    <>
      <div onClick={handleApply} className={`apply-filter-button ${loading ? 'loading' : ''}`}>
        {text}
      </div>
    </>
  );
};

export default CarApi;
