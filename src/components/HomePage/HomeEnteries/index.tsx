"use client";
import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import HomePageCards from "../HomePageCards";
import { useRouter } from "next/navigation";
import { useFilter } from "@/context/FilterContext";

const HomeEnteries = () => {
  const [cars, setCars] = useState([]);
  const { activeFilter } = useFilter();
  console.log(activeFilter,"woiefwoiewgioegiorrrrrrrrrrrrrrrrrrrrrrrr")

  const [carNotFoundtext, setCarNotFoundtext] = useState(``);
  const router = useRouter();

  useEffect(() => {
    setCarNotFoundtext(`There Is No ${activeFilter.toUpperCase()} Added`);
  }, [activeFilter]);



  return (
    <div>
      <Filters setCars={setCars} setCarNotFoundtext={setCarNotFoundtext} />
      <HomePageCards cars={cars} carNotFoundtext={carNotFoundtext} />
    </div>
  );
};

export default HomeEnteries;
