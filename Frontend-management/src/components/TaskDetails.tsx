import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";



const TaskDetail  = () => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleString();
  
  // Assuming `m` is a variable that controls rendering the content
  const m = false; // Replace this with your actual condition to check
  const [task, setTask] = useState()
  const { taskdetailsID } = useParams();
  console.log(taskdetailsID)
  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/tasks/taskdetails/${taskdetailsID}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      setTask(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    
  }, []);

  if (m) {
    // Show loading state when m is false
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">{task?.title}</h1>

      <div className="space-y-6">
        {/* Task Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Task ID:</p>
            <p className="text-gray-500">{task?._id}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Created At:</p>
            <p className="text-gray-500">{formatDate(task?.createdAt)}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Last Updated:</p>
            <p className="text-gray-500">{formatDate(task?.updatedAt)}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Due Date:</p>
            <p className="text-gray-500">{formatDate(task?.date)}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Priority:</p>
            <p className={`text-${task?.priority === 'high' ? 'red' : task?.priority === 'medium' ? 'yellow' : 'green'}-500`}>
              {task?.priority}
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Stage:</p>
            <p className="text-gray-500">{task?.stage}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">Trashed:</p>
            <p className="text-gray-500">{task?.isTrashed ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Subtasks Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Subtasks</h3>
          {task?.subTasks.length > 0 ? (
            <ul className="space-y-2">
              {task?.subTasks.map((subTask, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
                  {subTask}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No subtasks available.</p>
          )}
        </div>

        {/* Team Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Team Members</h3>
          {task?.team.length > 0 ? (
            <ul className="space-y-4">
              {task?.team.map((member) => (
                <li key={member._id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-gray-600">{member.title}</p>
                  <p className="text-gray-500">Role: {member.role}</p>
                  <p className="text-gray-500">Email: {member.email}</p>
                  <p className="text-gray-500">Active: {member.isActive ? 'Yes' : 'No'}</p>
                  <p className="text-gray-500">Admin: {member.isAdmin ? 'Yes' : 'No'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No team members assigned.</p>
          )}
        </div>

        {/* Assets Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Assets</h3>
          {task?.assets.length > 0 ? (
            <ul className="space-y-2">
              {task?.assets.map((asset, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200">
                  {/* Displaying the name of the asset, assuming asset has a name property */}
                  <p>{asset.name || 'Asset'}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No assets associated with this task.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
