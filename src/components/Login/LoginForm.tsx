import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "../SignUp/styles.module.css";
import Button from "../Common/Button";
import { sendOtp } from "@/services/firebase/firebaseAuthService";
import OtpVerification from "../Otp";
import Image from "next/image";
import { Images } from "@/assets/Images";
import { useRouter } from "next/navigation";

const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^[0-9]+$/, "Mobile number must be digits only")
    .min(10, "Mobile number must be at least 10 digits")
    .max(15, "Mobile number can't be more than 15 digits")
    .required("Mobile number is required"),
});

const LoginForm = () => {
  const router = useRouter();
  const [otpSend, setOtpSend] = useState(false);
  const [backBtnStatus, setBackBtnStatus] = useState(true);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    console.log(values, "submitted values");
    // Simulating OTP send
    sendOtp(`+91${values.mobileNumber}`)
      .then(() => {
        console.log("OTP sent successfully");
        setOtpSend(true);
        setSubmitting(false);
        setBackBtnStatus(true);
      })
      .catch((err) => {
        console.log(err);
      });

    // setOtpSend(true);
    // setSubmitting(false);
    // setBackBtnStatus(true);
  };

  return (
    <div>
      <div id="recaptcha-container"></div>
      {otpSend && backBtnStatus && (
        <div
          className="absolute left-16 flex gap-2 items-center cursor-pointer"
          onClick={() => {
            setBackBtnStatus(false);
          }}
        >
          <Image
            src={Images.backArrow}
            alt="back-arrow"
            width={32}
            height={32}
          />
          <p className="text-secondary text-base font-rajdhani uppercase font-medium">
            Back
          </p>
        </div>
      )}

      <Image
        src={Images.myCar}
        alt="logo"
        width={32}
        height={32}
        className="w-8 h-8 sm:w-12 sm:h-12 mx-auto"
      />
      <p className={styles.subheading}>My Car</p>
      <p className={styles.heading}>Login Account</p>
      {otpSend && backBtnStatus ? (
        <OtpVerification />
      ) : (
        <Formik
          initialValues={{ mobileNumber: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col">
                <label className={styles.label_Style}>Mobile Number</label>
                <Field
                  name="mobileNumber"
                  type="text"
                  className={`${styles.field_style} sm:!w-[430px] !w-full`}
                  placeholder="Enter your mobile number"
                />
                <ErrorMessage name="mobileNumber">
                  {(msg) => <div className={styles.error_msg}>{msg}</div>}
                </ErrorMessage>
              </div>
              <button
                type="submit"
                className="w-full mx-auto mt-14"
                disabled={isSubmitting}
              >
                <Button otherStyles="sm:w-[430px] w-full mx-auto uppercase">
                  {isSubmitting ? "Sending..." : "Get OTP"}
                </Button>
              </button>
              <div className="flex items-center flex-col mt-6">
                <p className={styles.info_text}>Don&#39;t Have an Account?</p>
                <p
                  className={`${styles.info_text} underline cursor-pointer`}
                  onClick={() => router.push("/signup")}
                >
                  SIGNUP
                </p>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default LoginForm;