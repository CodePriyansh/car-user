"use client";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import instance from "@/network/axios";
import CarCards from "./CarCards";
import axios from "axios";
function HomePageCards() {
  const [cars, setCars] = useState([]);
  const cookies = new Cookies();

  const fetchCars = () => {
    let token = cookies.get("token");
    const response = instance.post(
      "api/cars/all",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzU5MmZhY2E2YmY4NWFmNDY5MDY3ZSIsInBob25lTnVtYmVyIjoiMTIzNDU2Nzg5OCIsImZpcmViYXNlVXNlcklkIjoiMGE1RnFzejZLN1B5eUJsUHJ3UmZPMzliOHhVMiIsImlhdCI6MTcxOTk0MDEwNSwiZXhwIjoxNzIwMDI2NTA1fQ.3zzuyuT0SvQRzxqgQodrJe7_RW-0V-lE4cNf82MXMgk`,
        },
      }
    );
    response
      .then((res) => {
        console.log(res.data.data)
        setCars(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      {cars.length < 1 ? (
        <div className="text-center"> There is no car added!</div>
      ) : (
        <div className="container_space large_layout w-full grid md1:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 md:bg-f7f7f7 py-4">
          {cars.map((car, index) => (
            <CarCards car={car} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePageCards;
