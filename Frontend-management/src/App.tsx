import React from 'react';
import {Fragment,  useRef } from "react";
import Navbar from './components/Navbar';
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { RootState } from "./redux/store";
import clsx from "clsx";
import { setOpenSidebar } from './redux/slices/authSlice';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Register from './pages/SignUp';
import Users from './pages/Users';
// import Tasks from './pages/Tasks';

function Layout() {
  const { user } = useSelector((state : any) => state.auth);
  console.log(user)

  const location = useLocation();

  return user ? (
    <div className='w-full h-screen flex flex-col md:flex-row'>
      <div className='w-1/5 h-screen bg-white sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />

        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state: RootState) => state.auth);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => {
              if (node) mobileMenuRef.current = node;
             
              else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
              isSidebarOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={closeSidebar}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={closeSidebar}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};


const App = () => {
  


  return (
    <main className='w-full min-h-screen bg-red-400 '>
      <Routes>
         <Route element={<Layout />}>
            <Route index path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/team' element={<Users />} />
         </Route>
            <Route path='/log-in' element={<Login />} />
            <Route path='/Sign-Up' element={<Register/>} />
      </Routes>
    </main>
  );
};

export default App;
