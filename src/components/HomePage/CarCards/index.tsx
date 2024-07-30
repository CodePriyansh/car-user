import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/assets/Images";
import moment from "moment";
import Link from "next/link";
import instance from "@/network/axios";
import { toast } from "react-toastify";
import DynamicDialog from "@/components/Common/Dialogs";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
export default function CarCards({ car, onDelete }) {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const handleClick = () => {
    router.push(`/car_details/${car._id}`);
  };

  const handleDelete = async (carId) => {
    try {
      const response = await instance.delete(`/api/cars/delete/${carId}`);
      if (response.status === 200) {
        toast.success("Car deleted successfully!");
        if (onDelete) {
          onDelete(carId);
  setDialogOpen(false);

        }
      }
    } catch (error) {
      toast.error("Failed to delete car. Please try again.");
      console.error("Delete car error:", error);
    }
  };


  const handleDialogOpen = () => {
    setDialogType("DELETE_CAR");
    setDialogOpen(true);
};

const handleDialogClose = () => {
  setDialogOpen(false);
};

  return (
    <div className={styles.card_wrapper}>
      <div className={styles.status_tag}>
        <div className={car.sold ? styles.status_sold : styles.status_avail}>
          <Image src={Images.availSoldSymbol} alt="Sell"></Image>
          {car.sold ? "Sold" : "Avail"}
        </div>
      </div>
      <Link href={`/car_details/${car._id}`} passHref>
        <div className={styles.card_img_wrapper}>
          <img
            className="w-full h-full"
            src={car?.images?.front_image || Images.demoCarfrom}
            alt="image"
          />
        </div>
      </Link>

      <div className={styles.car_header}>
        <div
          className={styles.header_left}
        >{`${car.company} ${car.modelName} ${car.variant}`}</div>
        <div className={styles.header_right}>
          {/* <Link href={`/car_details/${car._id}`} passHref>
            <Image src={Images.cardView} alt="view" width={24} height={24} className={styles.cardActions} />
          </Link>
          <Link href={`/edit-car/${car._id}`} passHref>
            <Image src={Images.cardEdit} alt="edit" width={24} height={24} className={styles.cardActions} />
          </Link>

          <Image
            src={Images.cardDelete}
            alt="image"
            className={styles.cardActions}
            width={24}
            height={24}
            onClick={ handleDialogOpen}
            style={{ cursor: "pointer" }}
          /> */}
        </div>
      </div>
      <DynamicDialog open={dialogOpen}  type={dialogType} onClose={handleDialogClose} onConfirm={handleDialogClose} onDeleteCar={()=> handleDelete(car._id)} />
      <div className={styles.card_price_row}>
        <div className={styles.price_left}>₹{car?.price?.toLocaleString('en-IN')}</div>
        <div className={styles.price_right}>
          {moment(car?.registrationDate).format("DD/MM/YYYY")}
        </div>
      </div>

      <div className={`${styles.features_row}`}>
        <div className={styles.feature_item}>
          {car?.yearOfManufacture.split("-")[0]}
        </div>
        {[car?.transmission, car?.color, car?.fuelType]?.map((item, index) => {
          return (
            <div key={index.toString()} className={styles.feature_item}>
              {item}
            </div>
          );
        })}
      </div>


      <Link href={`/car_details/${car._id}`} passHref>
      <div className="flex flex-row text-lg px-4 pb-4 items-center gap-x-2">
        <p className="text-secondary font-bold">View Dealer Details</p>
        <FaRegArrowAltCircleRight className="fill-secondary" />
      </div>
      </Link>
    </div>
  );
}
