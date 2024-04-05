import React from "react";

function Subscription({ email, tier }) {
  return (
    <div className="flex bg-[white] w-[40%] px-4 py-4 rounded-lg justify-between items-center">
      <div>
        user Email:
        <p>{email && "test@gmail.com"}</p>
      </div>
      <div>
        <p>subscription Tier:</p>
        <p>{tier && "tier-2"}</p>
      </div>
      <div className="bg-[#121621] px-2 rounded-3xl cursor-pointer ">
        <p className="text-white">Delete</p>
      </div>
    </div>
  );
}

export default Subscription;
