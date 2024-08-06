import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Images } from "@/assets/Images";
import moment from "moment";
import Link from "next/link";
import instance from "@/network/axios";
import toast, { Toaster } from 'react-hot-toast';
import DynamicDialog from "@/components/Common/Dialogs";
import { useFilter } from "@/context/FilterContext";

export default function CarCards({ item }) {
  const router = useRouter();
  const { activeFilter } = useFilter(); // Use the custom hook to get activeFilter
  return (
    <div className={styles.card_wrapper}>
      <div className={styles.status_tag}>
        <div className={item.sold ? styles.status_sold : styles.status_avail}>
          <Image src={Images.availSoldSymbol} alt="Sell" />
          {item.sold ? "Sold" : "Avail"}
        </div>
      </div>
      <Link href={`/${activeFilter}_details/${item._id}`} passHref>
        <div className={styles.card_img_wrapper}>
          <img
            className="w-full h-full"
            src={item?.images?.front_image || item?.bikeImages?.[0] || Images.demoCarfrom.src}
            alt="image"
          />
        </div>
      </Link>

      <div className={styles.car_header}>
        <div className={styles.header_left}>
          {`${item.company} ${item.modelName} ${item.variant}`}
        </div>
        <div className={styles.header_right}>
          {/* <Link href={`/${activeFilter}_details/${item._id}`} passHref>
            <Image src={Images.cardView} alt="view" width={24} height={24} className={styles.cardActions} />
          </Link>
          <Link href={`/edit-${activeFilter}/${item._id}`} passHref>
            <Image src={Images.cardEdit} alt="edit" width={24} height={24} className={styles.cardActions} />
          </Link>

          <Image
            src={Images.cardDelete}
            alt="image"
            className={styles.cardActions}
            width={24}
            height={24}
            onClick={handleDialogOpen}
            style={{ cursor: "pointer" }}
          /> */}
        </div>
      </div>

      <div className={styles.card_price_row}>
        <div className={styles.price_left}>₹{item?.price?.toLocaleString('en-IN')}</div>
        <div className={styles.price_right}>
          {moment(item?.registrationDate).format("DD/MM/YYYY")}
        </div>
      </div>

      <div className={`${styles.features_row}`}>
        <div className={styles.feature_item}>
          {item?.yearOfManufacture.split("-")[0]}
        </div>
        {[item?.transmission, item?.color, item?.fuelType]?.map((itemDetail, index) => {
          return (
            itemDetail &&
            <div key={index.toString()} className={styles.feature_item}>
              {itemDetail}
            </div>
          );
        })}
      </div>
    </div>
  );
}
