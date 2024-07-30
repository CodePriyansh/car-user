"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Images } from "@/assets/Images";
import Button from "../Button";
import { getLocalStorage } from "@/constants/constants";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";
import Cookies from "universal-cookie";

interface props {
  page: string;
}
const Header: React.FC<props> = ({ page = "other" }) => {
  const [user, setUser] = useState(null);
  const cookies = new Cookies();
  useEffect(() => {
    const userCookie = cookies.get('user');
    console.log(userCookie,"slkn")
    if (userCookie) {
      try {
        setUser(userCookie);
      } catch (e) {
        console.error("Failed to parse user cookie", e);
      }
    }
  }, []);
  console.log(user);

  return (
    <div
      className={`container_space large_layout sticky top-0 z-10 ${
        styles.wrapper
      } ${page === "addcar" ? "md:flex hidden" : "flex"}`}
    >
      <div>
        <Image
          src={Images.logo}
          alt="logo"
          width={40}
          height={40}
          className="sm:min-w-[65px] min-w-12"
        />
      </div>

      {/* Desktop View */}
      <div className={styles.right_part}>
       
      </div>

      {/* Mobile View */}

      <div className={styles.responsive_right_part}>

      </div>
    </div>
  );
};

export default Header;
