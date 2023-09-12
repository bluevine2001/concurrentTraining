import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ExerciceForm from "./ExerciceForm";
const ExerciceMini = (props) => {
  //console.log(props.data);
  const [isDone, setIsDone] = useState(false);
  const bgcolors = props.data.is_important
    ? "bg-red-500 card shadow my-2 flex grow"
    : "bg-white card shadow my-2 flex grow";

  function setToDone(exodata) {
    props.settodone({ ...props.data, ...exodata, is_done: true });
    setIsDone(true);
  }
  return (
    <div>
      <div className="w-10/12 mx-auto flex">
        <div className={bgcolors}>
          <div className="card-body">
            <div className="card-title">
              <img
                src="https://picsum.photos/50/50"
                className="rounded-md w-[50px] h-[50px]"
                alt="random"
              />
              <div className="ml-2 w-full text-left">
                <h2
                  className={
                    props.data.is_important
                      ? "text-white font-bold"
                      : "text-black font-bold"
                  }
                >
                  {props.data.nom}
                </h2>
                <span
                  className={
                    props.data.is_important ? "text-black" : "text-gray-400"
                  }
                >
                  3x{props.data.heavy_reps}
                </span>
              </div>
              <Link to={`/exercice/${props.data.id}`}>
                <div className="text-current hover:text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14" fill="none" />
                    <path d="m12 5 7 7-7 7" fill="none" />
                  </svg>
                </div>
              </Link>
            </div>
            <ExerciceForm submitdata={setToDone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciceMini;
