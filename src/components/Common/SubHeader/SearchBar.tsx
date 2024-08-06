import { Images } from "@/assets/Images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import instance from "@/network/axios";
import Cookies from "universal-cookie";
import { useFilter } from "@/context/FilterContext";

function SearchBar({ setCars, setCarNotFoundtext }) {
  const [searchTerm, setSearchTerm] = useState("");
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const { activeFilter } = useFilter();

  const handleSearch = (e) => {
    const key = e.target.value.toLowerCase();
    setSearchTerm(key);
  };

  useEffect(() => {
    if (searchTerm) {
      apiCallForSearch(searchTerm);
    }
  }, [searchTerm, activeFilter]);

  const apiCallForSearch = async (searchTerm) => {
    try {
      const response = await instance.post(
        activeFilter === "car" ? "/api/cars/user/all" : "/api/bikes/user/all",
        {
          searchKey: searchTerm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCars(response?.data?.data);
      if(!response?.data?.data.length)
        setCarNotFoundtext("No items found matching the selected criteria.")
    } catch (error) {
      if (error.response.status == 404) {
        setCars([]);
        setCarNotFoundtext(`${activeFilter.toUpperCase()}s not found for ${searchTerm}`);
        console.error("Error applying filters:", error);
      }else{
        console.error("Error fetching data:", error);
        setCars([]);
        setCarNotFoundtext("An error occurred while fetching data.");
      }
    }
  };

  return (
    <div className={`${styles.field_style} justify-between`}>
      <div className="flex items-center">
        <Image
          src={Images.search}
          alt="img"
          className="sm:w-[18px] sm:h-[18px] h-4 w-4"
        />
        <input
          className={styles.search_input}
          type="text"
          placeholder="Search....."
          onChange={handleSearch}
          value={searchTerm}
        />
      </div>
      {searchTerm && (
        <div
          className="rotate-45 text-2xl cursor-pointer"
          onClick={() => {
            apiCallForSearch("");
            setSearchTerm("");
          }}
        >
          +
        </div>
      )}
    </div>
  );
}

export default SearchBar;
