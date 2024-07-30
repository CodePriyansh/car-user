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

function Filters({ setCars, setCarNotFoundtext }) {
  const router = useRouter();
  const [updatedPriceRange, setUpdatedPriceRange] = React.useState([
    0, 2500000,
  ]);
  const cookies = new Cookies();

  const fields = [
    {
      name: "company",
      type: "select",
      placeholder: "Company",
       options: [
        { value: "Ford", label: "Ford" },
        { value: "Honda", label: "Honda" },
        { value: "Hyundai", label: "Hyundai" },
        { value: "Kia", label: "Kia" },
        { value: "Mahindra", label: "Mahindra" },
        { value: "Maruti Suzuki", label: "Maruti Suzuki" },
        { value: "Skoda", label: "Skoda" },
        { value: "Tata Motors", label: "Tata" },
        { value: "Toyota", label: "Toyota" },
        { value: "Volkswagen", label: "Volkswagen" },
      ]
      ,
    },
    {
      name: "modelName",
      type: "select",
      placeholder: "Car Model",
      options: [
        { value: "Renault Kwid", label: "Renault Kwid" },
        { value: "Datsun Redi-GO", label: "Datsun Redi-GO" },
        { value: "Maruti Suzuki S-Presso", label: "Maruti Suzuki S-Presso" },
      ],
    },
    {
      name: "modelYear",
      type: "select",
      placeholder: "Model Year",
      options: [
        { value: "2022 - 2024", label: "2022 - 2024" },
        { value: "2019 - 2021", label: "2019 - 2021" },
        { value: "2016 - 2018", label: "2016 - 2018" },
        { value: "2013 - 2015", label: "2013 - 2015" },
        { value: "Before - 2013", label: "Before - 2013" },
      ],
    },
  ];

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

  const colors =  [
    "Red",
    "Blue",
    "Black",
    "White",
    "Silver",
    "Gray",
    "Green",
    "Yellow",
    "Orange"
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
    setSelectedOptions({
      ...selectedOptions,
      [name]: selectedOption.value,
    });
  };

  const handleCarType = (value) => {
    const isChecked = selectedOptions.carType.includes(value);
    let updatedCarTypes;
    if (isChecked) {
      updatedCarTypes = selectedOptions.carType.filter(
        (type) => type !== value
      );
    } else {
      updatedCarTypes = [...selectedOptions.carType, value];
    }
    setSelectedOptions({
      ...selectedOptions,
      carType: updatedCarTypes,
    });
  };

  const handleColorType = (value) => {
    const isChecked = selectedOptions.color.includes(value);
    let updatedColorTypes;
    if (isChecked) {
      updatedColorTypes = selectedOptions.color.filter(
        (color) => color !== value
      );
    } else {
      updatedColorTypes = [...selectedOptions.color, value];
    }
    setSelectedOptions({
      ...selectedOptions,
      color: updatedColorTypes,
    });
  };

  useEffect(() => {
    setSelectedOptions({
      ...selectedOptions,
      priceRange: updatedPriceRange,
    });
  }, [updatedPriceRange]);

  return (
    <>
      {clickMobileClear && (
        <CarApi selectedOptions={null} initial={true} setCars={setCars} />
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
        <div className={styles.wrapper}>
          {/* filter box  */}
          <div className={styles.filters_wrapper}>
            <div className="flex w-full justify-between">
              <div className={styles.heading}>Filters </div>
              <Button
                otherStyles="absolute top-0 right-0 !rounded-[10px] !py-2"
                onclick={() => setClickWebClear(false)}
              >
                <CarApi
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
                    setSelectedOption={(option) => {
                      handleChange(field.name, option);
                    }}
                    className={`${styles.field_style} !bg-transparent`}
                  />
                </div>
              ))}
            </div>
            <div>
              <PriceRangeSlider
                setUpdatedPriceRange={setUpdatedPriceRange}
                updatedPriceRange={updatedPriceRange}
              />
            </div>
          </div>

          {/* car type box  */}
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
            {/* <button className="my-1 text-primary capitalize font-rajdhani text-18 font-bold flex w-fit gap-2 mx-auto items-center justify-center">
              view all
              <Image
                src={Images.downArrow}
                width={14}
                height={14}
                alt="down-arrow"
              />
            </button> */}
          </div>

          {/* color box  */}
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
            {/* <button className="my-1 text-primary capitalize font-rajdhani text-18 font-bold flex w-fit gap-2 mx-auto items-center justify-center">
              view all
              <Image
                src={Images.downArrow}
                width={14}
                height={14}
                alt="down-arrow"
              />
            </button> */}
          </div>
        </div>

        {/* <div className={styles.responsive_filters}>
        {["price range", "brand", "model", "color", "type"].map(
          (item, index) => (
            <div
              key={index.toString()}
              className={styles.responsive_filter_box}
              onClick={() => setOpenDrawer(true)}
            >
              <p className={styles.responsive_filter_item}> {item}</p>
            </div>
          )
        )}
      </div> */}

        <div className="flex justify-between items-center">
          <div>
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
          <div className="mt-[1px] ml-2">
            {/* <Button
              otherStyles={styles.fill_btn}
              onclick={() => router.push("/addcar")}
            >
              <Image
                src={Images.whitePlus}
                alt="img"
                className="w-[18px] h-[18px]"
              />
            </Button> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
