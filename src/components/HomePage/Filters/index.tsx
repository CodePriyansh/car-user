"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import CommonReactSelect from "@/components/Common/Select";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "@/components/Common/Button";
import PriceRangeSlider from "@/components/Common/PriceRange";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import CarApi from "../CarApi/index";
import SubHeader from "@/components/Common/SubHeader";
import { useFilter } from "@/context/FilterContext";
import { bikeFilter, carFilter } from "@/constants/formFields";

function Filters({ setCars, setCarNotFoundtext }) {
  const router = useRouter();
  const [updatedPriceRange, setUpdatedPriceRange] = React.useState([
    0, 2500000,
  ]);
  const { activeFilter } = useFilter();

  const cookies = new Cookies();

  const fields = activeFilter == "car" ? carFilter : bikeFilter

  const carType = [
    "Compact SUV",
    "Coupe",
    "Crossover SUV",
    "Hatchback",
    "Pickup",
    "Sedan",
    "SUV",
    "Van",
  ];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "White",
    "Silver",
    "Gray",
    "Green",
    "Yellow",
    "Orange",
  ];

  const [selectedOptions, setSelectedOptions] = useState({
    carType: [],
    color: [],
    priceRange: updatedPriceRange,
    modelName: "",
    company: "",
    modelYear: "",
  });

  const [clickMobileClear, setClickMobileClear] = useState(false);
  const [clickWebClear, setClickWebClear] = useState(false);
  const handleChange = (name, selectedOption) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: selectedOption?.value || "",
    }));
  };

  const handleCarType = (value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      carType: prev.carType.includes(value)
        ? prev.carType.filter((type) => type !== value)
        : [...prev.carType, value],
    }));
  };

  const handleColorType = (value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      color: prev.color.includes(value)
        ? prev.color.filter((color) => color !== value)
        : [...prev.color, value],
    }));
  };

  useEffect(() => {
    setSelectedOptions((prev) => ({
      ...prev,
      priceRange: updatedPriceRange,
    }));
  }, [updatedPriceRange]);


  useEffect(() => {
    setUpdatedPriceRange([0, 2500000])
    setSelectedOptions({
      carType: [],
      color: [],
      priceRange: updatedPriceRange,
      modelName: "",
      company: "",
      modelYear: "",
    });
  }, [activeFilter]);
  

  return (
    <>
      {clickMobileClear && (
        <CarApi setCarNotFoundtext={setCarNotFoundtext} selectedOptions={null} initial={true} setCars={setCars} />
      )}
      <SubHeader
        setCars={setCars}
        setSelectedOptions={setSelectedOptions}
        setClickMobileClear={setClickMobileClear}
        setClickWebClear={setClickWebClear}
        clickWebClear={clickWebClear}
        setCarNotFoundtext={setCarNotFoundtext}
      />

      <div className={`${styles.container} container_space large_layout`}>
        <div className={`${styles.wrapper} ${activeFilter=="car" ?  "" : "gap-10"}`}>
          {/* Filter box */}
          <div
            className={`${styles.filters_wrapper} ${
              activeFilter == "car" ? "w-[40%]" : "w-[50%]"
            }`}
          >
            <div className="flex w-full justify-between">
              <div className={styles.heading}>Filters</div>
              <Button
                otherStyles="absolute top-0 right-0 !rounded-[10px] !py-2"
                onclick={() => setClickWebClear(false)}
              >
                <CarApi setCarNotFoundtext={setCarNotFoundtext}
                  selectedOptions={selectedOptions}
                  initial={false}
                  setCars={setCars}
                />
              </Button>
            </div>
            <div className={styles.selectors}>
              {fields.map((field, index) => (
                <div className={styles.field_wrapper} key={index}>
                  <CommonReactSelect
                    options={field.options}
                    placeholder={field.placeholder}
                    selectedOption={
                      field.options.find(
                        (option) => option.value === selectedOptions[field.name]
                      ) || null
                    }
                    setSelectedOption={(option) =>
                      handleChange(field.name, option)
                    }
                    className={`${styles.field_style} !bg-transparent`}
                  />
                </div>
              ))}
            </div>
            <div className={activeFilter == "bike" ? "hidden" : ""}>
              <PriceRangeSlider
                setUpdatedPriceRange={setUpdatedPriceRange}
                updatedPriceRange={updatedPriceRange}
              />
            </div>
          </div>

          {/* Car type box */}
          {activeFilter == "car" ? (
            <>
              {" "}
              <div className={styles.car_type_wrapper}>
                <p className={styles.sub_heading}>Car Type</p>
                <div className={styles.checklist_wrapper}>
                  {carType.map((item, index) => (
                    <label
                      key={index.toString()}
                      className="flex items-center space-x-2"
                    >
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={() => handleCarType(item)}
                          checked={selectedOptions.carType.includes(item)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <span className={styles.checklist_item}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className={styles.color_wrapper}>
                <p className={styles.sub_heading}>Color</p>
                <div className={styles.checklist_wrapper}>
                  {colors.map((item, index) => (
                    <label
                      key={index.toString()}
                      className="flex items-center space-x-2"
                    >
                      <div className="custom-checkbox">
                        <input
                          type="checkbox"
                          onChange={() => handleColorType(item)}
                          checked={selectedOptions.color.includes(item)}
                        />
                        <span className="checkmark"></span>
                      </div>
                      <span className={styles.checklist_item}>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className={activeFilter == "bike" ? " w-[50%]" : "hidden"}>
              <PriceRangeSlider
                setUpdatedPriceRange={setUpdatedPriceRange}
                updatedPriceRange={updatedPriceRange}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button
            otherStyles={styles.clear_fil_btn}
            onclick={() => setClickMobileClear(true)}
          >
            <Image
              src={Images.clearFilter}
              alt="img"
              className="w-[16px] h-[16px]"
            />
            clear filter
          </Button>
        </div>
      </div>
    </>
  );
}

export default Filters;
