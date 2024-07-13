"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "@/network/axios";
import { MdEdit, MdOutlineDeleteOutline } from "react-icons/md";
import CarCards from "../CarCards";
import styles from "./styles.module.css";
import Header from "@/components/Common/Header";
import moment from "moment";
import ClipSpinner from "@/components/Common/Spinner";
import { useRouter } from "next/navigation";
import { Images } from "@/assets/Images";
import Image from "next/image";

const CarDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [car2, setCar2] = useState(null);
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarCars, setSimilarCars] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    // Update image name based on index (you'll need to define these names)
    const imageNames = Object.keys(car.images);
    setImageName(imageNames[index] || `View ${index + 1}`);
  };

  const fetchSimilarCars = async (dealerId) => {
    try {
      const response = await instance.get(
        `/api/cars/car-by-dealer-id/${dealerId._id}`
      );
      setSimilarCars(response.data.data);
    } catch (error) {
      console.error("Error fetching similar cars:", error);
      toast.error("Failed to fetch similar cars");
    }
  };

  const [imageName, setImageName] = useState("Right View");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(`/api/cars/car-by-id/${id}`);
        console.log(response.data.data);
        console.log(response.data.data);
        console.log(Object.values(response.data.data));
        setCar(response.data.data);
        console.log(Object.values(response?.data?.data?.images).length,"woff")
        if (response.data.data.dealerId) {
          fetchSimilarCars(response.data.data.dealerId);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to fetch car details");
      }
    };

    if (id) {
      fetchCarDetails();
    }
  }, [id]);



  if (!car) {
    return (
      <div className="flex justify-center items-center">
        <ClipSpinner loading={true} />
      </div>
    );
  }

  return (
    <>
      <Header page="addcar" />
      <div className={styles.backButton} onClick={() => router.back()}>
        <Image
          src={Images.backArrow}
          alt="back-arrow"
          width={32}
          height={32}
          className={styles.backArrowImage}
        />
        <p className={styles.backText}>Back</p>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.carDetailsContainer}>
          {/* Left Section (Images) */}
          <div className={styles.imagesContainer}>
            <div className="relative w-full">
              <img
                src={Object.values(car.images)[currentImageIndex]}
                alt={`Car part ${currentImageIndex + 1}`}
                className={styles.mainImage}
              />
              <div className=" font-rajdhani font-bold absolute text-[14px] h-5 md:bottom-4 md:right-4 bottom-3 left-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded capitalize">
                {imageName.replaceAll("_"," ")}
              </div>
              <div className=" font-rajdhani font-bold absolute text-[14px] h-5 md:bottom-4 md:right-4 bottom-3 right-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded">
                {currentImageIndex + 1}/{Object.values(car?.images).length}
              </div>
            </div>
            <div className={styles.thumbnailContainer}>
              {Object.values(car.images).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Car part ${index + 1}`}
                  className={`${styles.thumbnailImage} ${
                    currentImageIndex === index ? styles.selectedThumbnail : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <span
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentImageIndex === 0 ? "bg-orange-500" : "bg-gray-300"
                }`}
              ></span>
              <span
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentImageIndex === Object.values(car?.images).length - 1
                    ? "bg-orange-500"
                    : "bg-gray-300"
                }`}
              ></span>
            </div>
          </div>

          {/* Right Section (Details) */}
          <div className={styles.detailsContainer}>
            <div className={`${styles.sectionBorder} !sm:px-4`}>
              <h1 className={styles.carTitle}>
                {moment(car?.yearOfManufacture).format("YYYY")} {car.company}{" "}
                {car.type} {car.variant} 1.2L
              </h1>
              <div className={styles.carInfo}>
                <span>{car.kmDriven}</span>
                <span>{car.ownerType}</span>
                <span>{car.fuelType}</span>
                <span>{car.transmission}</span>
              </div>
              <hr className={styles.separator} />
              <h1 className={styles.carPrice}>{car.price}</h1>
              <div className={styles.actionButtons}>
                <button className={styles.editButton}>
                  <MdEdit className={styles.icon} />
                  <span>Edit</span>
                </button>
                <button className={styles.deleteButton}>
                  <MdOutlineDeleteOutline className={styles.icon} />
                  <span>Delete</span>
                </button>
                <button className={styles.soldButton}>
                  <span>Sold</span>
                </button>
              </div>
            </div>

            <div className={styles.borderDivider}></div>

            <div
              className={`${styles.descriptionContainer} ${styles.sectionBorder} hidden sm:block`}
            >
              <h1 className={styles.descriptionTitle}>Description</h1>
              <p className={styles.descriptionText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>

        {/* Overview and Scratch & Dent sections */}
        <div className={styles.overviewContainer}>
          <div className={`${styles.overviewPanel} ${styles.sectionBorder}`}>
            <h1 className={styles.overviewTitle}>Car Overview</h1>
            <div className={styles.overviewDetails}>
              <div key={car.id} className={styles.overviewItem}>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Company</p>
                  <p className={styles.overviewValues}>{car.company}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Model</p>
                  <p className={styles.overviewValues}>{car.modelName}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Variant</p>
                  <p className={styles.overviewValues}>{car.variant}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Year of Manufacture</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.yearOfManufacture).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Registration Date</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.registrationDate).format("DD/MM/YYYY")}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Number Plate</p>
                  <p className={styles.overviewValues}>{car.numberPlate}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Color</p>
                  <p className={styles.overviewValues}>{car.color}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Transmission</p>
                  <p className={styles.overviewValues}>{car.transmission}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Fuel Type</p>
                  <p className={styles.overviewValues}>{car.fuelType}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Cubic Capacity</p>
                  <p className={styles.overviewValues}>
                    {car.cubicCapacity} cc
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Average Approx.</p>
                  <p className={styles.overviewValues}>{car.mileage}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Km Driven</p>
                  <p className={styles.overviewValues}>{car.kmDriven}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Air Conditioner</p>
                  <p className={styles.overviewValues}>
                    {car.airConditioner ? "Yes" : "No"}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Power Window</p>
                  <p className={styles.overviewValues}>
                    {car.powerWindow ? "Yes" : "No"}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Owner</p>
                  <p className={styles.overviewValues}>{car.ownerType}</p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Insurance</p>
                  <p className={styles.overviewValues}>
                    {car.insurance ? "Yes" : "No"}
                  </p>
                </div>
                <div className={styles.overviewField}>
                  <p className={styles.overviewHeadings}>Insurance Validity</p>
                  <p className={styles.overviewValues}>
                    {moment(car?.insuranceValidity).format("DD/MM/YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${styles.descriptionContainer} ${styles.sectionBorder} hidden`}
          >
            <h1 className={styles.descriptionTitle}>Description</h1>
            <p className={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          {/* Right Panel (Scratch & Dent) */}
          <div className={styles.scratchDentPanel}>
            <h1 className={styles.scratchDentTitle}>Scratch & Dent</h1>
            <div className={styles.scratchDentContent}>
              <p className={styles.scratchDentText}>Dent on Left Gate</p>
              <img
                src={car.interiorImages[0]}
                alt="Dent on Left Gate"
                className={styles.scratchDentImage}
              />
              <button type="button" className={`${styles.soldButton2}`}>
                Sold
              </button>
            </div>
          </div>
        </div>

        {/* Similarly Added Cars */}
        <div
          className={`${styles.similarCarsContainer} custome-scrollbar scroll-smooth`}
        >
          <h1 className={styles.similarCarsTitle}>Similarly Added</h1>
          <div className={styles.similarCarsList}>
            {similarCars.map((car, index) => (
              <div key={index} className={styles.similarCarCard}>
                <CarCards car={car} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
