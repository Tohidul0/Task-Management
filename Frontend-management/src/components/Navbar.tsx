import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store"; // Assuming you have these types set up
import { setOpenSidebar } from "../redux/slices/authSlice";
import NotificationPanel from "./NotificationPanel";
import UserAvatar from "./UserAvatar";
// import UserAvatar from "./UserAvatar";
// import NotificationPanel from "./NotificationPanel";

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Typed `RootState`
  const dispatch = useDispatch<AppDispatch>(); // Typed `AppDispatch`

  return (
    <div className="flex justify-between items-center bg-gray-200 px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setOpenSidebar(true))}
          className="text-2xl text-gray-500 block md:hidden"
        >
          ☰
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <NotificationPanel />

        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
