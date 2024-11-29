import React, { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import { useForm, SubmitHandler } from "react-hook-form";
import SelectList from "./SelectList";
import UserList from "./UserList";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
const PRIORITY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];

interface AddTaskProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  task : any;
}

interface TaskFormData {
  title: string;
  date: string;
}


const AddTask: React.FC<AddTaskProps> = ({ open, setOpen, task, fetchTasks }) => {
  const navigate = useNavigate();
  console.log(fetchTasks)
  if(task){
    
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<TaskFormData>();
  
    const [team, setTeam] = useState<string[]>([]);
    const [stage, setStage] = useState<string>(LISTS[0]);
    const [priority, setPriority] = useState<string>(PRIORITY[2]);
   
    const [uploading, setUploading] = useState<boolean>(false);
  
    // const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //   if (e.target.files) {
    //     try {
    //       setUploading(true);
    //       const uploadedFiles = await Promise.all(
    //         Array.from(e.target.files).map(async (file) => {
    //           const formData = new FormData();
    //           formData.append("file", file);
    //           const response = await axios.post("/api/upload", formData, {
    //             headers: { "Content-Type": "multipart/form-data" },
    //           });
    //           return response.data.url; // Assume API returns the file URL
    //         })
    //       );
    //       setAssets(uploadedFiles);
    //     } catch (error) {
    //       console.error("Error uploading files:", error);
    //     } finally {
    //       setUploading(false);
    //     }
    //   }
    // };
  
    const submitHandler: SubmitHandler<TaskFormData> = async (data) => {
      try {
       
  
        const taskup = {
          title: data.title,
          date: data.date,
          stage: stage.toLowerCase(),
          priority: priority.toLowerCase(),
          team,
         
          activities: [],
          
          isTrashed: false,
        };
       

  
        const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, taskup, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
  
        console.log("Task successfully submitted:", response.data);
        navigate("/tasks")
        fetchTasks();
        setOpen(false);

      } catch (error) {
        console.error("Error submitting task:", error);
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            ADD TASK
          </Dialog.Title>
  
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder={task.title}
              type="text"
              name="title"
              label="Task Title"
              className="w-full rounded"
              register={register("title", { required: "Title is required" })}
              error={errors.title?.message}
            />
  
            <UserList setTeam={setTeam} team={team} />
  
            <div className="flex gap-4">
              <SelectList
                label="Task Stage"
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />
  
              <Textbox
                placeholder="Date"
                type="date"
                name="date"
                label="Task Date"
                className="w-full rounded"
                register={register("date", { required: "Date is required" })}
                error={errors.date?.message}
              />
            </div>
  
            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORITY}
                selected={priority}
                setSelected={setPriority}
              />
  
              
            </div>
  
            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              {uploading ? (
                <span className="text-sm py-2 text-red-500">Uploading assets</span>
              ) : (
                <Button
                  label="Submit"
                  type="submit"
                  className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
                />
              )}
  
              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    );
  }
  else{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>();

  const [team, setTeam] = useState<string[]>([]);
  const [stage, setStage] = useState<string>(LISTS[0]);
  const [priority, setPriority] = useState<string>(PRIORITY[2]);
  
  const [uploading, setUploading] = useState<boolean>(false);

  // const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     try {
  //       setUploading(true);
  //       const uploadedFiles = await Promise.all(
  //         Array.from(e.target.files).map(async (file) => {
  //           const formData = new FormData();
  //           formData.append("file", file);
  //           const response = await axios.post("/api/upload", formData, {
  //             headers: { "Content-Type": "multipart/form-data" },
  //           });
  //           return response.data.url; // Assume API returns the file URL
  //         })
  //       );
  //       setAssets(uploadedFiles);
  //     } catch (error) {
  //       console.error("Error uploading files:", error);
  //     } finally {
  //       setUploading(false);
  //     }
  //   }
  // };

  const submitHandler: SubmitHandler<TaskFormData> = async (data) => {
    try {
      setUploading(true);

      const task = {
        title: data.title,
        date: data.date,
        stage: stage.toLowerCase(),
        priority: priority.toLowerCase(),
        team,
        
        activities: [],
        subTasks: [],
        isTrashed: false,
      };
      console.log(task)

      const response = await axios.post("http://localhost:3000/api/tasks/", task, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Task successfully submitted:", response.data);
      fetchTasks();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          ADD TASK
        </Dialog.Title>

        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Task Title"
            type="text"
            name="title"
            label="Task Title"
            className="w-full rounded"
            register={register("title", { required: "Title is required" })}
            error={errors.title?.message}
          />

          <UserList setTeam={setTeam} team={team} />

          <div className="flex gap-4">
            <SelectList
              label="Task Stage"
              lists={LISTS}
              selected={stage}
              setSelected={setStage}
            />

            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", { required: "Date is required" })}
              error={errors.date?.message}
            />
          </div>

          <div className="flex gap-4">
            <SelectList
              label="Priority Level"
              lists={PRIORITY}
              selected={priority}
              setSelected={setPriority}
            />

            
          </div>

          <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
            {uploading ? (
              <span className="text-sm py-2 text-red-500">Uploading assets</span>
            ) : (
              <Button
                label="Submit"
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700 sm:w-auto"
              />
            )}

            <Button
              type="button"
              className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
              onClick={() => setOpen(false)}
              label="Cancel"
            />
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
};

export default AddTask;
