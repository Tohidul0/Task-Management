import { Popover, Transition } from "@headlessui/react";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { HiBellAlert } from "react-icons/hi2";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
interface Notification {
  _id: string;
  team: string[];
  text: string;
  task: { _id: string; title: string } | null;
  notiType: "alert" | "message";
  isRead: boolean[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Example data
// const data: Notification[] = [
//   {
//     _id: "65c5bbf3787832cf99f28e6d",
//     team: [
//       "65c202d4aa62f32ffd1303cc",
//       "65c27a0e18c0a1b750ad5cad",
//       "65c30b96e639681a13def0b5",
//     ],
//     text: "New task has been assigned to you and 2 others. The task priority is set a normal priority, so check and act accordingly. The task date is Thu Feb 29 2024. Thank you!!!",
//     task: null,
//     notiType: "alert",
//     isRead: [],
//     createdAt: "2024-02-09T05:45:23.353Z",
//     updatedAt: "2024-02-09T05:45:23.353Z",
//     __v: 0,
//   },
//   {
//     _id: "65c5f12ab5204a81bde866ab",
//     team: [
//       "65c202d4aa62f32ffd1303cc",
//       "65c30b96e639681a13def0b5",
//       "65c317360fd860f958baa08e",
//     ],
//     text: "New task has been assigned to you and 2 others. The task priority is set a high priority, so check and act accordingly. The task date is Fri Feb 09 2024. Thank you!!!",
//     task: {
//       _id: "65c5f12ab5204a81bde866a9",
//       title: "Test task",
//     },
//     notiType: "alert",
//     isRead: [],
//     createdAt: "2024-02-09T09:32:26.810Z",
//     updatedAt: "2024-02-09T09:32:26.810Z",
//     __v: 0,
//   },
// ];

const ICONS = {
  alert: (
    <HiBellAlert className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
  message: (
    <BiSolidMessageRounded className="h-5 w-5 text-gray-600 group-hover:text-indigo-600" />
  ),
};

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Notification | null>(null);
  const { user } = useSelector((state: any) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/notification/${user._id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setData(response.data.notifications);
         
        } 
      } catch (err) {
       console.error("An error occurred while fetching notifications");
      }
    };

    fetchNotifications();
  }, []);

  const readHandler = () => {
    // Implement logic to mark all as read
  };

  const viewHandler = async(item: Notification) => {
    console.log(item);
    try {
     
      const response = await axios.put(
        `http://localhost:3000/api/notification/${item._id}/read/${user._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      
      console.log(response.data.message);
    } catch (error) {
      // Handle error
       console.error(error);
    }
    setSelected(item);
  };

  const callsToAction = [
    { name: "Cancel", href: "#", icon: "" },
    {
      name: "Mark All Read",
      href: "#",
      icon: "",
      onClick: () => readHandler(),
    },
  ];

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center outline-none">
        <div className="w-8 h-8 flex items-center justify-center text-gray-800 relative">
          <IoIosNotificationsOutline className="text-2xl" />
          {data?.length > 0 && (
            <span className="absolute text-center top-0 right-1 text-sm text-white font-semibold w-4 h-4 rounded-full bg-red-600">
              {data?.length}
            </span>
          )}
        </div>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -right-16 md:-right-2 z-10 mt-5 flex w-screen max-w-max px-4">
          {({ close }) => {
            if (data?.length === 0) {
              return null; // Return null if no data is available
            }
            return (
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {data?.slice(0, 5).map((item, index) => (
                    <div
                      key={item._id + index}
                      className="group relative flex gap-x-4 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-lg bg-gray-200 group-hover:bg-white">
                        {ICONS[item.notiType]}
                      </div>

                      <div
                        className="cursor-pointer"
                        onClick={() => viewHandler(item)}
                      >
                        <div className="flex items-center gap-3 font-semibold text-gray-900 capitalize">
                          <p>{item?.notiType}</p>
                          <span className="text-xs font-normal lowercase">
                            {moment(item?.createdAt).fromNow()}
                          </span>
                        </div>
                        <p className="line-clamp-1 mt-1 text-gray-600">
                          {item?.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 divide-x bg-gray-50">
                  {callsToAction?.map((item) => (
                    <Link
                      key={item.name}
                      onClick={
                        item.onClick ? () => item.onClick() : () => close()
                      }
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-blue-600 hover:bg-gray-100"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default NotificationPanel;
