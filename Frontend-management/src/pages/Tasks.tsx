import React, { useEffect, useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import TaskTitle from "../components/TaskTitle";
import BoardView from "../components/BoardView";
import { useSelector } from "react-redux";
import Table from "../components/Table";
import AddTask from "../components/AddTask";
import Title from "../components/Title";
import Tabs from "../components/Tabs";
import axios from "axios";


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

interface TaskParams {
  status?: string;
}

// Constants
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE: Record<string, string> = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const Tasks: React.FC = () => {
  const params = useParams<TaskParams>();

  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useSelector((state: any) => state.auth);


  const status: string = params?.status || "";
  const fetchTasks = async () => {
    try {
      const response = await axios.get<{ data: Task[] }>(`http://localhost:3000/api/tasks/allTask/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTasks(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    
  }, []);

  return loading ? (
    <div className="py-10">
      <p>loading.....</p>
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="Completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {selected !== 1 ? (
          <BoardView fetchTasks= {fetchTasks} tasks={tasks} />
        ) : (
          <div className="w-full">
            <Table tasks={tasks} />
          </div>
        )}
      </Tabs>

      <AddTask fetchTasks= {fetchTasks}  open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;
