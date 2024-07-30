import React from "react";
import PropTypes from "prop-types";
import { Dialog } from "@mui/material";
import { Images } from "@/assets/Images";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styles from './styles.module.css';
import Image from "next/image";

const DynamicDialog = ({ open, type, onClose, onConfirm }) => {
  const DialogTypes = {
    FEATURE_COMING_SOON: "FEATURE_COMING_SOON",
  };

  const renderDialogContent = () => {
    switch (type) {
      case DialogTypes.FEATURE_COMING_SOON:
        return {
          title: "Coming Soon",
          message: "The bikes feature is coming soon. Please stay tuned!",
          buttons: [
            {
              label: "OK",
              onClick: onConfirm,
              className: styles.buttonRenew,
            },
          ],
        };
      default:
        return null;
    }
  };

  const dialogContent = renderDialogContent();

  if (!dialogContent) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <div className={styles.dialogContainer}>
        <button onClick={onClose} className=" text-para flex justify-end items-end">
          <AiOutlineCloseCircle className="h-6 w-6 sm:h-8 sm:w-8 text-para " />
        </button>
        {type !== "PLAN_EXPIRED" &&
        <div className={styles.dialogHeader}>
          <h2 className={`${styles.dialogTitle} text-[24px] sm:text-[36px]`}>{dialogContent.title}</h2>
        </div>}
        <div className={styles.dialogContent}>
          {dialogContent.image && (
            <Image src={dialogContent.image} alt="Dialog Image" className={styles.dialogImage} width={100} height={100}/>
          )}
          {type == "PLAN_EXPIRED" && 
          <div className={styles.dialogHeader}>
          <h2 className={`${styles.dialogTitle} text-[24px] sm:text-[36px]`}>{dialogContent.title}</h2>
        </div>
          }
          {dialogContent.message && (
            <p className={styles.dialogMessage}>{dialogContent.message}</p>
          )}
          {dialogContent.subTitle && (
            <p className={styles.dialogSubTitle}>{dialogContent.subTitle}</p>
          )}
        </div>
        <div className={styles.dialogActions}>
          {dialogContent.buttons.map((button, index) => (
            <button
              key={index}
              onClick={button.onClick}
              className={`${styles.button} ${button.className}`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Dialog>
  );
};

DynamicDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DynamicDialog;
