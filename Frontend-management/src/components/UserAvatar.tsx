import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitials } from "../Utilis/extra";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { AppDispatch } from "../redux/store";
import axios from "axios";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = async (data: any) => {
    console.log("Submitted Data:", data);

    try {
      const res = await axios.get(
        `http://localhost:3000/api/auth/logout`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      if (res.status === 200) {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/log-in");
      } else {
          window.alert("Logout Failed!!!")
      } 
    } catch (error: unknown) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div>
        <Menu as='div' className='relative inline-block text-left'>
          <div>
            <Menu.Button className='w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600'>
              <span className='text-white font-semibold'>
                {getInitials(user?.name )}
              </span>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none'>
              <div className='p-4'>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setOpen(true)}
                      className='text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base'
                    >
                      <FaUser className='mr-2' aria-hidden='true' />
                      {user?.name}
                    </button>
                  )}
                </Menu.Item>

                
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logoutHandler}
                      className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                    >
                      <IoLogOutOutline className='mr-2' aria-hidden='true' />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserAvatar;