import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import Node from "@/components/Node";

const inter = Inter({ subsets: ["latin"] });

const vv = [
  { id: 2, name: "b", left: 4, right: 5 },
  { id: 3, name: "c", left: 6, right: 7 },
  {
    id: 4,
    name: "d",
    left: 8,
    right: 9,
  },
  {
    id: 5,
    name: "e",
    left: null,
    right: null,
  }
];

const cc = (list) => {
  for (let items of list) {
    if (items.left) {
      items.left = list[items.left - 1];
    }
    if (items.right) {
      items.right = list[items.right - 1];
    }
  }
  return list[0];
};
// cc();

// const Node = () => {

// };

export default function Home() {
  // const root = vv[0];
  const [root, setRoot] = useState();
  const [newNodeAdded, setNewNodeAdded] = useState(false);
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await fetch("http://192.168.0.100:4000/user");
        const data = await res.json();
        console.log(data);
        setRoot(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTree();
  }, [newNodeAdded]);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24`}
    >
      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
      </div>
      <div className="z-10">
        <div className="flex justify-center z-10">
          {!root ? (
            <div>loading...</div>
          ) : (
            <Node setNewNodeAdded={setNewNodeAdded} node={root} />
          )}
        </div>
      </div>
    </main>
  );
}
