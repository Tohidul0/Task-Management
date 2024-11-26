import { MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../Utilis/extra";
import moment from "moment";
import clsx from "clsx";
import UserInfo from "./UserInfo";



export const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

type tasksporpos = {
  tasks: {
    _id: string;
    title: string;
    date: string;
    priority:string;  // Ensuring priority is one of the keys in PRIOTITYSTYELS
    stage: string;  
    assets: string[];
    team: {
      _id: string;
      name: string;
      title: string;
      role: string;
      email: string;
    }[];
    isTrashed: boolean;
    activities: {}[];
    subTasks: {}[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
};




export default function TaskTable({ tasks }: tasksporpos) {

  interface Task {
    task: {
      _id: string;
      title: string;
      date: string;
      priority: string;  // Ensuring priority is one of the keys in PRIOTITYSTYELS
      stage: string;  
      assets: string[];
      team: {
        _id: string;
        name: string;
        title: string;
        role: string;
        email: string;
      }[];
    };
  }

  const TableHeader = () => (
    <thead className='border-b border-gray-300 '>
      <tr className='text-black  text-left'>
        <th className='py-2'>Full Name</th>
        <th className='py-2'>Status</th>
        <th className='py-2'>Created At</th>
        <th className='py-2 hidden md:block'>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }: Task) => (
    <tr className='border-b border-gray-300 text-gray-600 hover:bg-gray-300/10'>
      <td className='py-2'>
        <div className='flex items-center gap-2'>
          
          <p className='text-base text-black'>{task.title}</p>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex gap-1 items-center'>
         
          <span className='capitalize'>{task.priority}</span>
        </div>
      </td>

      <td className='py-2'>
        <div className='flex'>
          {task.team.map((m, index) => (
            <div key={index} className={clsx("w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1", BGS[index % BGS.length])}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className='py-2 hidden md:block'>
        <span className='text-base text-gray-600'>
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );

  return (
    <>
      <div className='w-full md:w-2/3 bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded'>
        <table className='w-full'>
          <TableHeader />
          <tbody>
            {tasks?.map((task) => (
              <TableRow key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
