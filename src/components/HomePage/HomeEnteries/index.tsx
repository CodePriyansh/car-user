"use client";
import React, { useEffect, useState } from "react";
import Filters from "../Filters";
import HomePageCards from "../HomePageCards";
import { useRouter } from "next/navigation";

const HomeEnteries = () => {
  const showPlanExpiredBanner = false;
  const [cars, setCars] = useState([]);
  const [carNotFoundtext, setCarNotFoundtext] = useState(
    "There Is No Car Added"
  );
  const router = useRouter();
  useEffect(() => {
    // console.log(cars,"pppppppppppppppppppppppppppppp")
  }, [cars]);

  const handleDeleteCar = (carId) => {
    setCars((prevCars) => prevCars.filter((car) => car._id !== carId));
  };

  return (
    <div>
      <Filters setCars={setCars} setCarNotFoundtext={setCarNotFoundtext} />
      <HomePageCards cars={cars} carNotFoundtext={carNotFoundtext} onDelete={handleDeleteCar}  />
    </div>
  );
};

export default HomeEnteries;
