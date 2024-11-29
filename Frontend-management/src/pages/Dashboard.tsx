import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  MdAdminPanelSettings
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Chart } from "../components/Chart";
import Card from "../components/Card";
import TaskTable from "../components/TaskTable";
import UserTable from "../components/UserTable";
import axios from "axios";



interface CardData {
  _id: number;
  label: string;
  total: number;
  icon: ReactNode;
  bg: string;
}[]



interface Task {
  _id: string;
  title: string;
  date: string;
  priority: string;
  stage: string;
  assets: string[];
  team: any[];
  isTrashed: boolean;
  activities: any[];
  subTasks: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  title: any;
  role: string;
  isActive: boolean;
}


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [all, setAll] = useState({})
  const [chart, setChart] = useState([]);
  const { user } = useSelector((state: any) => state.auth);
  const stats: CardData[] = [
    {
      _id: 1,
      label: "TOTAL TASK",
      total: tasks.length || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: 2,
      label: "COMPLTED TASK",
      total: all.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: 3,
      label: "TASK IN PROGRESS ",
      total: all.inprogress || 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: 4,
      label: "TODOS",
      total: all.todo || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];
  

  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ data: Task[] }>(`http://localhost:3000/api/tasks/allTask/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTasks(response.data.data);
      setAll(response.data?.all);
      setChart(response.data.chart);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get<{ data: User[] }>("http://localhost:3000/api/auth/allUser");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);



  return (
    <div className="h-full py-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {stats?.map((onecard) => (
          <Card key={onecard._id} onecard={onecard} />
        ))}
      </div>

      <div className="w-full bg-white my-16 p-4 rounded shadow-sm">
        <h4 className="text-xl text-gray-600 font-semibold">Chart by Priority</h4>
        <Chart chart={chart} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8">
      
        <TaskTable tasks={tasks} />
        <UserTable users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
