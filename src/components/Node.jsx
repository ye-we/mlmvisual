import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const Node = ({ node, setNewNodeAdded }) => {
  const [joinedLeft, setJoinedLeft] = useState(false);
  const [joinedRight, setJoinedRight] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const hasChildren = node.left_user_id || node.right_user_id;

  const selectNode = (parent, direction) => {
    const joined_left = direction == "left" ? 1 : 0;
    const joined_right = direction == "right" ? 1 : 0;
    setModalOpen(true);
    setJoinedLeft(joined_left);
    setJoinedRight(joined_right);
    setParentId(parent.id);
    // console.log(parent, joined_left, joined_right);
  };
  return (
    <div
      className="flex flex-col items-center"
      onClick={() => {
        // if (modalOpen) {
        //   setModalOpen(false);
        //   //   clear();
        // }
      }}
    >
      <div className="w-10 h-10 rounded-full bg-gray-400"></div>
      <div className="font-bold p-3 outline-1 outline-dashed rounded-lg">
        <p>{node.user_name}</p>
        <p>matching bonus: {node.matching_bonus}</p>
        <p>sales bonus: {Math.trunc((node.sales_bonus / 10) * 100) / 100}</p>
        <p>Point left: {node.points_left}</p>
        <p>Point right: {node.points_right}</p>
      </div>
      {hasChildren ? (
        <div className="flex flex-row items-start">
          {node.left_user_id ? (
            <div className="mr-20">
              <Node node={node.left_user_id} />
            </div>
          ) : (
            <div
              className="mr-20 px-3 py-2 outline-1 outline-dashed rounded-lg cursor-pointer"
              onClick={() => selectNode(node, "left")}
            >
              +
            </div>
          )}
          {node.right_user_id ? (
            <div className="ml-20">
              <Node node={node.right_user_id} />
            </div>
          ) : (
            <div
              className="ml-20 px-3 py-2 outline-1 outline-dashed rounded-lg cursor-pointer"
              onClick={() => selectNode(node, "right")}
            >
              +
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <div
            className="mr-20 px-3 py-2 outline-1 outline-dashed rounded-lg cursor-pointer"
            onClick={() => selectNode(node, "left")}
          >
            +
          </div>
          <div
            className="ml-20 px-3 py-2 outline-1 outline-dashed rounded-lg cursor-pointer"
            onClick={() => selectNode(node, "right")}
          >
            +
          </div>
        </div>
      )}
      {modalOpen && (
        <Modal
          setModalOpen={setModalOpen}
          parentId={parentId}
          joinedInLeft={joinedLeft}
          joinedInRight={joinedRight}
          setNewNodeAdded={setNewNodeAdded}
        />
      )}
    </div>
  );
};

export default Node;
