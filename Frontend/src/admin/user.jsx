import React from "react";

function User({ name, email, profile, id, setIsFormVisible }) {
  return (
    <div className="bg-[#f4f4f4] py-2 px-4 rounded">
      <div className="user flex items-center justify-between">
        <div className=" w-12 h-12 rounded-full  overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="user"
          />
        </div>
        <div className="flex  gap-4 ml-[20%]">
          <div className="user-name">{name}</div>
          <div className="user-email">{email}</div>
        </div>
        <div className="action-on-user flex gap-4 ml-4">
          <div
            onClick={() => setIsFormVisible()}
            className="cursor-pointer bg-[#3B6EE5] px-2 rounded-xl text-white"
          >
            edit
          </div>
          <div className="cursor-pointer bg-[#121621] rounded-2xl text-white px-2">
            delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
