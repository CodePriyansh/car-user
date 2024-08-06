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
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Link from "next/link";
import DynamicDialog from "@/components/Common/Dialogs";
import { useFilter } from "@/context/FilterContext";
const CarDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [car, setCar] = useState(null);
  const [car2, setCar2] = useState(null);
  const { id } = params;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarCars, setSimilarCars] = useState([]);
  const { activeFilter } = useFilter();

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    // Update image name based on index (you'll need to define these names)
    if (activeFilter == "car") {
      const imageNames = Object.keys(car.images);
      setImageName(imageNames[index] || `View ${index + 1}`);
    }
  };

  const fetchSimilarCars = async (dealerId) => {
    try {
      const response = await instance.get(
        `/api/${activeFilter}s/user/${activeFilter}-by-dealer-id/${dealerId._id}`
      );
      setSimilarCars(response.data.data);
    } catch (error) {
      console.error("Error fetching similar " + activeFilter + "s:", error);
      // toast.error("Failed to fetch similar cars");
    }
  };

  const [imageName, setImageName] = useState("Right View");
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await instance.get(
          `/api/${activeFilter}s/user/${activeFilter}-by-id/${id}`
        );

        setCar(response.data.data);
        if (response.data.data.dealerId) {
          fetchSimilarCars(response.data.data.dealerId);
        }
      } catch (error) {
        console.error(`Error fetching ${activeFilter} details`, error);
        toast.error(`Failed to fetch ${activeFilter} details`);
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


  const images =
  activeFilter === "car" ? Object.values(car.images) : car.bikeImages;


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
        <p className={styles.backText}>HOME</p>
      </div>
      <div className={styles.mainContainer}>


        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-12">
          <div className="md:col-span-7">
            {" "}
            <div className={styles.imagesContainer}>
              <Carousel
                selectedItem={currentImageIndex}
                onChange={(index) => {
                  setCurrentImageIndex(index);
                  if (activeFilter === "car") {
                    const imageNames = Object.keys(car?.images);
                    setImageName(imageNames[index] || `View ${index + 1}`);
                  }
                }}
                showArrows={true}
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                className="custom-carousel"
              >
                {images?.map((image, index) => (
                  <div key={index} className="relative w-full  ">
                    <img
                      src={image}
                      alt={`Car part ${index + 1}`}
                      className={styles.mainImage}
                    />
                    {activeFilter == "car" && (
                    <div className="font-rajdhani font-bold absolute text-[14px] h-5 md:bottom-4 md:left-4 bottom-3 left-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded capitalize ">
                      {imageName?.replaceAll("_", " ")}
                    </div>
                  )}
                    <div className="font-rajdhani font-bold absolute text-[14px] md:text-lg h-6 md:h-8 md:bottom-4 md:right-4 bottom-3 right-3 bg-[#FFFFFF] bg-opacity-50 text-para px-2 py-1 rounded">
                      {index + 1}/{images?.length}
                    </div>
                  </div>
                ))}
              </Carousel>
              <div className={styles.thumbnailContainer}>
                {images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Car part ${index + 1}`}
                    className={`${styles.thumbnailImage} ${
                      currentImageIndex === index
                        ? styles.selectedThumbnail
                        : ""
                    }`}
                    onClick={() => handleImageClick(index)}
                  />
                ))}
              </div>
              <div className="flex justify-center sm:mb-4 mb-2">
                <span
                  className={`h-2 w-2 rounded-full mx-1 ${
                    currentImageIndex === 0 ||
                    currentImageIndex < images?.length - 1
                      ? "bg-orange-500"
                      : "bg-gray-300"
                  }`}
                ></span>
                <span
                  className={`h-2 w-2 rounded-full mx-1 ${
                    currentImageIndex === images?.length - 1
                      ? "bg-orange-500"
                      : "bg-gray-300"
                  }`}
                ></span>
              </div>
            </div>
          </div>

          <div className="  grid md:col-span-5 3xl:gap-y-8 gap-4 p-4 md:p-0">
            <div className="">
              <div className={styles.dealerCard}>
                <h2 className={styles.cardTitle}>Dealer Details</h2>
                <div className={styles.dealerInfo}>
                  <div className="flex flex-row items-center">
                    <img
                      src={car?.dealerId?.profileImage  || Images.demoProfile.src}
                      alt="Dealer"
                      className={styles.dealerImage}
                    />
                    <div className={styles.dealerName}>{car?.dealerId?.name}</div>
                  </div>
                  <div className={styles.rating}>
                    {[1, 2, 3, 4].map((star) => (
                      <span key={star} className={styles.starFilled}>
                        ★
                      </span>
                    ))}
                    <span className={styles.starEmpty}>☆</span>
                  </div>
                </div>
                <div className="3xl:space-y-5 space-y-3 xl:space-y-3 3xl:my-8  md:my-4">
                  <div className={styles.dealerLocation}>
                    <span className={styles.locationIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.dealerInfoIcon}
                      >
                        <path
                          d="M12 1.5C9.81276 1.50258 7.71584 2.3726 6.16922 3.91922C4.62261 5.46584 3.75259 7.56276 3.75001 9.75C3.74799 11.5373 4.33179 13.276 5.41201 14.7C5.41201 14.7 5.63701 14.9963 5.67376 15.039L12 22.5L18.3293 15.0353C18.3623 14.9955 18.588 14.7 18.588 14.7L18.5888 14.6978C19.6682 13.2743 20.2517 11.5365 20.25 9.75C20.2474 7.56276 19.3774 5.46584 17.8308 3.91922C16.2842 2.3726 14.1872 1.50258 12 1.5ZM12 12.75C11.4067 12.75 10.8266 12.5741 10.3333 12.2444C9.83995 11.9148 9.45543 11.4462 9.22837 10.8981C9.0013 10.3499 8.94189 9.74667 9.05765 9.16473C9.1734 8.58279 9.45913 8.04824 9.87868 7.62868C10.2982 7.20912 10.8328 6.9234 11.4147 6.80764C11.9967 6.69189 12.5999 6.7513 13.1481 6.97836C13.6962 7.20542 14.1648 7.58994 14.4944 8.08329C14.8241 8.57664 15 9.15666 15 9.75C14.999 10.5453 14.6826 11.3078 14.1202 11.8702C13.5578 12.4326 12.7953 12.749 12 12.75Z"
                          fill="#0059A3"
                        />
                      </svg>
                    </span>
                    {car?.dealerId?.shopAddress}
                  </div>
                  <div className={styles.dealerContact}>
                    <div className="flex flex-row items-center gap-4">
                      <span className={styles.phoneIcon}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.dealerInfoIcon}
                        >
                          <path
                            d="M19.95 21C17.8667 21 15.8083 20.546 13.775 19.638C11.7417 18.73 9.89167 17.4423 8.225 15.775C6.55833 14.1077 5.271 12.2577 4.363 10.225C3.455 8.19233 3.00067 6.134 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07933 8.725 3.238C8.90833 3.39667 9.01667 3.584 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.704 12.1123 8.162 12.687C8.62 13.2617 9.12433 13.816 9.675 14.35C10.1917 14.8667 10.7333 15.346 11.3 15.788C11.8667 16.23 12.4667 16.634 13.1 17L15.45 14.65C15.6 14.5 15.796 14.3877 16.038 14.313C16.28 14.2383 16.5173 14.2173 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1377 20.775 15.313C20.925 15.4883 21 15.684 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                            fill="#0059A3"
                          />
                        </svg>
                      </span>{" "}
                      {car?.dealerId?.phoneNumber}
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                      <span className={styles.idIcon}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={styles.dealerInfoIcon}
                        >
                          <path
                            d="M2.25 9C2.25 3.75 7.5 3.75 12 3.75C16.5 3.75 21.75 3.75 21.75 9C21.75 15 16.5 8.25 16.5 8.25H7.5C7.5 8.25 2.25 15 2.25 9ZM8.25 10.5C8.25 10.5 4.5 14.25 4.5 21H19.5C19.5 14.25 15.75 10.5 15.75 10.5H8.25Z"
                            stroke="#0059A3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 18.75C13.6569 18.75 15 17.4069 15 15.75C15 14.0931 13.6569 12.75 12 12.75C10.3431 12.75 9 14.0931 9 15.75C9 17.4069 10.3431 18.75 12 18.75Z"
                            stroke="#0059A3"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>{" "}
                      {car?.dealerId?.telephoneNumber}
                    </div>
                  </div>
                  <div className={styles.dealerEmail}>
                    <span className={styles.emailIcon}>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.dealerInfoIcon}
                      >
                        <path
                          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                          fill="#0059A3"
                        />
                      </svg>
                    </span>{" "}
                    {car?.dealerId?.email}
                  </div>
                  <div className={styles.updatedCars}>
                    Till Now Updated Cars: 12
                  </div>
                </div>
                <button className={styles.callButton}>
                  <a
                    href={`tel:${car?.dealerId?.phoneNumber}`}
                    target="_self"
                    rel="noopener  noreferrer"
                    className={styles.callBtnAnchor}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.dealerInfoIcon}
                    >
                      <path
                        d="M19.95 21C17.8667 21 15.8083 20.546 13.775 19.638C11.7417 18.73 9.89167 17.4423 8.225 15.775C6.55833 14.1077 5.271 12.2577 4.363 10.225C3.455 8.19233 3.00067 6.134 3 4.05C3 3.75 3.1 3.5 3.3 3.3C3.5 3.1 3.75 3 4.05 3H8.1C8.33333 3 8.54167 3.07933 8.725 3.238C8.90833 3.39667 9.01667 3.584 9.05 3.8L9.7 7.3C9.73333 7.56667 9.725 7.79167 9.675 7.975C9.625 8.15833 9.53333 8.31667 9.4 8.45L6.975 10.9C7.30833 11.5167 7.704 12.1123 8.162 12.687C8.62 13.2617 9.12433 13.816 9.675 14.35C10.1917 14.8667 10.7333 15.346 11.3 15.788C11.8667 16.23 12.4667 16.634 13.1 17L15.45 14.65C15.6 14.5 15.796 14.3877 16.038 14.313C16.28 14.2383 16.5173 14.2173 16.75 14.25L20.2 14.95C20.4333 15.0167 20.625 15.1377 20.775 15.313C20.925 15.4883 21 15.684 21 15.9V19.95C21 20.25 20.9 20.5 20.7 20.7C20.5 20.9 20.25 21 19.95 21Z"
                        fill="#ffffff"
                      />
                    </svg>
                    CALL
                  </a>
                </button>
              </div>
            </div>
            <div className="">
              <div className={`${styles.sectionBorder} !p-4  !md:p-6`}>
                <p className={styles.carTitle}>
                  {moment(car?.yearOfManufacture).format("YYYY")} {car.company}{" "}
                  {car.type} {car.variant} 1.2L
                </p>
                <div className={styles.carInfo}>
                  <span>{car.kmDriven}</span>
                  <span>{car.ownerType}</span>
                  <span>{car.fuelType}</span>
                  <span>{car.transmission}</span>
                </div>
                <hr className={styles.separator} />
                <p className={styles.carPrice}>
                  {+car.price > 99000
                    ? ` Rs. ${car?.price?.toLocaleString("en-IN")} Lakh`
                    : `Rs. ${car?.price?.toLocaleString("en-IN")} Thausand`}
                </p>
              </div>
            </div>
          </div>

          <div className="  md:col-span-7">
            <div
              className={`${styles.overviewPanel} md:border border-border_light p-4 md:p-6  rounded-2xl`}
            >
              <div className={styles.overviewTitle}>Car Overview</div>
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
                    <p className={styles.overviewHeadings}>
                      Year of Manufacture
                    </p>
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
                    <p className={styles.overviewValues}>
                      {car.numberPlate.slice(0, 4)}******
                    </p>
                  </div>
                  <div className={styles.overviewField}>
                    <p className={styles.overviewHeadings}>Color</p>
                    <p className={styles.overviewValues}>{car.color}</p>
                  </div>
                  {activeFilter == "car" && (
                  <>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Transmission</p>
                      <p className={styles.overviewValues}>
                        {car?.transmission}
                      </p>
                    </div>
                  </>
                )}
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
                  {activeFilter == "car" && (
                  <>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Air Conditioner</p>
                      <p className={styles.overviewValues}>
                        {car?.airConditioner ? "Yes" : "No"}
                      </p>
                    </div>
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>Power Window</p>
                      <p className={styles.overviewValues}>
                        {car?.powerWindow ? "Yes" : "No"}
                      </p>
                    </div>
                  </>
                )}
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
                  {car?.insurance && (
                    <div className={styles.overviewField}>
                      <p className={styles.overviewHeadings}>
                        Insurance Validity
                      </p>
                      <p className={styles.overviewValues}>
                        {moment(car?.insuranceValidity).format("DD/MM/YYYY")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="  md:col-span-5 shrink flex space-y-4 3xl:space-y-8 justify-between md:py-4 p-4 md:p-0 flex-col">
            <div
              className={`${styles.descriptionContainer} ${styles.sectionBorder} !px-4 !mt-0`}
            >
              <p className={styles.descriptionTitle}>Description</p>
              <p className={styles.descriptionText}>
                {car?.description || "No Description"}
              </p>
            </div>
            <div className="h-auto">
              <div className="space-y-6">
                <div className={`${styles.scratchDentPanel} md:h-[80%] `}>
                  <p className={styles.scratchDentTitle}>Scratch & Dent</p>
                  <div className={styles.scratchDentContent}>
                    <p className={styles.scratchDentText}>
                      {car?.scratchAndDentDetails?.description}
                    </p>
                    {car?.scratchAndDentDetails?.image && (
                      <img
                        src={car?.scratchAndDentDetails?.image || ""}
                        alt="Dent or Scratch image"
                        className={styles.scratchDentImage}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-full">
            <div
              className={`${styles.similarCarsContainer} custome-scrollbar scroll-smooth`}
            >
              <p className={styles.similarCarsTitle}>Similarly Added</p>
              <div className={styles.similarCarsList}>
                {similarCars.map((car, index) => (
                  <div key={index} className={styles.similarCarCard}>
                    <CarCards item={car} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
