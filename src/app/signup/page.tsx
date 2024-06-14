"use client";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Image from 'next/image'; // Import Image from next/image

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobileNumber: yup.string().required("Mobile Number is required"),
  telephoneNumber: yup.string().required("Telephone Number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  shopAddress: yup.string().required("Shop Address is required"),
  coverImage: yup.mixed().required("Cover Image is required"),
  profileImage: yup.mixed().required("Profile Image is required"),
  shopImage: yup.mixed().required("Shop Image is required")
});

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const initialValues = {
    name: '',
    mobileNumber: '',
    telephoneNumber: '',
    email: '',
    city: '',
    state: '',
    shopAddress: '',
    coverImage: null,
    profileImage: null,
    shopImage: null
  };

  const onSubmit = async (values:any, { setSubmitting }) => {
    setLoading(true);
    const formData = new FormData();
    for (const key in values) {
      if (key === 'coverImage' || key === 'profileImage' || key === 'shopImage') {
        formData.append(key, values[key]);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Dealer registered successfully!');
    } catch (error) {
      setMessage('Failed to register dealer.');
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-cover h-screen" style={{ backgroundImage: "url('/signup_login_image.png')" }}>
        {/* Placeholder Image */}
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Image src="/my_car.png" alt="Logo" width={100} height={100} className="mx-auto mb-4" /> {/* Replace with your logo */}
            <h1 className="text-2xl font-bold">Signup Account</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="name" placeholder="Enter Your Name" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="mobileNumber" placeholder="Enter Mobile Number" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="mobileNumber" component="p" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="telephoneNumber" placeholder="Enter Telephone Number" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="telephoneNumber" component="p" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="email" placeholder="Enter Email Address" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="city" placeholder="Enter City" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <Field name="state" placeholder="Enter State" className="w-full p-2 border border-gray-300 rounded" />
                    <ErrorMessage name="state" component="p" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block">Shop Address</label>
                  <Field name="shopAddress" placeholder="Enter Shop Address" className="w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="shopAddress" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block">Cover Image</label>
                  <input type="file" name="coverImage" onChange={(event) => {
                    setFieldValue("coverImage", event.currentTarget.files[0]);
                  }} className="w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="coverImage" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block">Profile Image</label>
                  <input type="file" name="profileImage" onChange={(event) => {
                    setFieldValue("profileImage", event.currentTarget.files[0]);
                  }} className="w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="profileImage" component="p" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block">Shop Image</label>
                  <input type="file" name="shopImage" onChange={(event) => {
                    setFieldValue("shopImage", event.currentTarget.files[0]);
                  }} className="w-full p-2 border border-gray-300 rounded" />
                  <ErrorMessage name="shopImage" component="p" className="text-red-500 text-sm" />
                </div>

                <button type="submit" className="w-full p-2 bg-orange-500 text-white rounded" disabled={isSubmitting}>
                  {loading ? 'Loading...' : 'Get OTP'}
                </button>
              </Form>
            )}
          </Formik>
          {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
}
