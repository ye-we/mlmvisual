import React, { useEffect, useState } from "react";
// import { ClimbingBoxLoader } from "react-spinners";
import axios from "axios";

// username, parentId, joinedInLeft, joinedInRight, matchingBonus,
// packageName, packageAmount,

const packages = [
  {
    id: 1,
    packageName: "Emerald",
    packageAmount: 8449,
    matchingBonus: 40,
  },
  {
    id: 2,
    packageName: "Saphire",
    packageAmount: 16499,
    matchingBonus: 80,
  },
  {
    id: 3,
    packageName: "Diamond",
    packageAmount: 36499,
    matchingBonus: 180,
  },
  {
    id: 4,
    packageName: "Diamond",
    packageAmount: 72499,
    matchingBonus: 360,
  },
];

const Modal = ({
  parentId,
  joinedInLeft,
  joinedInRight,
  setModalOpen,
  setNewNodeAdded,
}) => {
  const [selectedPackage, setSelectedPackage] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const modal = document.getElementById("my-modal-2");
    modal.style.visibility = "visible";
    modal.style.opacity = 1;
  }, []);

  const addUser = async (e) => {
    e.preventDefault();
    const packageDetails = packages.find((p) => p.id == selectedPackage);
    const package_name = packageDetails.packageName;
    const package_amount = packageDetails.packageAmount;
    const matching_bonus = packageDetails.matchingBonus;

    const newUser = {
      user_name: username,
      parent_id: parentId,
      joined_in_left: joinedInLeft,
      joined_in_right: joinedInRight,
      matching_bonus,
      package_amount,
      package_name,
    };
    console.log(JSON.stringify(newUser));

    try {
      const { data } = axios.post("http://192.168.0.100:4000/user", newUser);
      // setNewNodeAdded((old) => !old);
      setModalOpen(false);
      window.location.reload();
      //   const res = await fetch("http://192.168.0.100:4000/user", {
      //     method: "POST",
      //     body: JSON.stringify(newUser),
      //   });
      //   const data = await res.json();
      //   console.log(data);
    } catch (e) {
      console.log(e);
    }
    /*
    user_name,
    parent_id,
    joined_in_left,
    joined_in_right,
    matching_bonus,
    package_amount,
    package_name,
    */

    // console.log(
    //   username,
    //   package_name,
    //   package_amount,
    //   matching_bonus,
    //   parentId,
    //   joinedInLeft,
    //   joinedInRight
    // );
  };
  // const [matchingBonus]
  return (
    <div className="modal pointer-events-auto overflow-hidden" id="my-modal-2">
      <div className="modal-box overflow-hidden">
        <h3 className="font-bold text-lg text-center">Add new user</h3>
        <form
          onSubmit={addUser}
          className="flex w-full gap-3 flex-col items-center justify-center"
        >
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="username"
            className="input input-bordered w-full max-w-xs"
          />
          <select
            value={selectedPackage}
            onChange={(e) => {
              setSelectedPackage(e.target.value);
            }}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled selected={true}>
              Choose package
            </option>
            <option value={1}>Emerald</option>
            <option value={2}>Saphire</option>
            <option value={3}>Diamond</option>
            <option value={4}>Ultra Diamond</option>
          </select>
          <div className="flex justify-end gap-3 items-center w-full max-w-xs">
            <button className="btn" type="submit">
              Add
            </button>
            <button
              className="btn btn-error"
              type="button"
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
