import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import Button from "./Button";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

interface AddUserProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  userData?: UserData | null; // Optional user data for updating
}

interface UserData {
  name: string;
  title: string;
  email: string;
  role: string;
}

interface FormData {
  name: string;
  title: string;
  email: string;
  role: string;
  password: string;
}

const AddUser: React.FC<AddUserProps> = ({ open, setOpen, userData }) => {
  const defaultValues: Partial<UserData> = userData || {};
  //const { user  } = useSelector((state: any) => state.auth);
 // const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoading: boolean = false;
  const isUpdating: boolean = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });

  const handleOnSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await axios.post(
        `https://task-management-1-lecw.onrender.com/api/auth/register`,
        data,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 201 && res.data.message === "success") {
        window.alert("Successfully User Add");
        setOpen(false)
        navigate("/team")
      } else {
        window.alert(" failed!");
      }
    } catch (error: unknown) {
      console.error("An error occurred:", error);
      window.alert("An error occurred during registration.");
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="">
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name?.message || ""}
          />
          <Textbox
            placeholder="Title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title?.message || ""}
          />
          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email?.message || ""}
          />

          <Textbox
            placeholder="password"
            type="text"
            name="password"
            label="password"
            className="w-full rounded"
            register={register("password", {
              required: "User password is required!",
            })}
            error={errors.role?.message || ""}
          />
          <Textbox
            placeholder="Role"
            type="text"
            name="role"
            label="Role"
            className="w-full rounded"
            register={register("role", {
              required: "User role is required!",
            })}
            error={errors.role?.message || ""}
          />
        </div>

        {isLoading || isUpdating ? (
          <div className="py-5">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
            <Button
              type="submit"
              className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              label="Submit"
            />

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        )}
      </form>
    </ModalWrapper>
  );
};

export default AddUser;
