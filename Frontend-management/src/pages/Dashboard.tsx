import React from "react";
import {
  MdAdminPanelSettings
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { summary } from "../assets/data";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import moment from "moment";

import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../Utilis/extra";
// import UserInfo from "../components/UserInfo";

// Define types for Task and User
interface Task {
  _id: string;
  title: string;
  date: string;
  priority: string;
  stage: string;
  assets: string[];
  team: any[]; // Changed type to any to avoid errors
  isTrashed: boolean;
  activities: any[]; // Changed type to any to avoid errors
  subTasks: any[]; // Changed type to any to avoid errors
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TeamMember {
  _id: string;
  name: string;
  title: string;
  role: string;
  email: string;
}

interface SubTask {
  title: string;
  date: string;
  tag: string;
  _id: string;
}

interface Activity {
  type: string;
  activity: string;
  date: string;
  by: string;
}

interface Stats {
  _id: string;
  label: string;
  total: number;
  icon: JSX.Element; // Assuming you are using JSX elements
  bg: string;
}

interface CombinedTask {
  task: Task;
  stats: Stats[];
}

interface User {
  _id: string;
  name: string;
  email: string;
}

interface TaskTableProps {
  tasks: any[]; // Changed type to any to avoid errors
}


interface UserTableProps {
  users: any[]; // Changed type to any to avoid errors
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ user}) => (
    <tr className='border-b border-gray-200  text-gray-600 hover:bg-gray-400/10'>
      <td className='py-2'>
        <div className='flex items-center gap-3'>
          <div className='w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700'>
            <span className='text-center'>{getInitials(user?.name)}</span>
          </div>

          <div>
            <p> {user.name}</p>
            <span className='text-xs text-black'>{user?.role}</span>
          </div>
        </div>
      </td>

      <td>
        <p
          className={clsx(
            "w-fit px-3 py-1 rounded-full text-sm",
            user?.isActive ? "bg-blue-200" : "bg-yellow-100"
          )}
        >
          {user?.isActive ? "Active" : "Disabled"}
        </p>
      </td>
      <td className='py-2 text-sm'>{moment(user?.createdAt).fromNow()}</td>
    </tr>
  );

  // Render tasks as required
  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task : any, id) => (
              <TableRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  // Render users as required
  return (
    <div className="w-full bg-white p-4 rounded shadow-sm">
      <h4 className="text-xl text-gray-600 font-semibold">Users</h4>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="text-left p-2">User ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => ( // Changed type to any to avoid errors
            <tr key={user._id}>
              <td className="p-2">{user._id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const totals : any = summary.tasks;

  const stats: any[] = [ // Changed type to any[] to avoid errors
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLTED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS ",
      total: totals["in progress"] || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"] || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const Card: React.FC<{ label: string; count: number; bg: string; icon: React.ReactNode }> = ({
    label,
    count,
    bg,
    icon,
  }) => {
    return (
      <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
        <div className="h-full flex flex-1 flex-col justify-between">
          <p className="text-base text-gray-600">{label}</p>
          <span className="text-2xl font-semibold">{count}</span>
          <span className="text-sm text-gray-400">{"110 last month"}</span>
        </div>

        <div
          className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white", bg)}
        >
          {icon}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">Chart by Priority</h4>
        <Chart />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
        {/* Left side: Task table */}
        <TaskTable tasks ={summary?.last10Task} />

        {/* Right side: User table */}
        <UserTable users={summary.users} />
      </div>
    </div>
  );
};

export default Dashboard;
