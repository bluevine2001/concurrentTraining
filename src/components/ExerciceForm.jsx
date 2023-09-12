import React from "react";
import { useState } from "react";

const ExerciceForm = (props) => {
  const [exercice, setExercice] = useState({
    weight1: 0,
    reps1: 0,
    weight2: 0,
    reps2: 0,
    weight3: 0,
    reps3: 0,
  });
  function handleSubmit() {
    console.log(exercice);
    props.submitdata(exercice);
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="flex-col">
          <p>Série 1</p>
          <input
            onChange={(e) =>
              setExercice({ ...exercice, weight1: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Poids"
          />
          <input
            onChange={(e) =>
              setExercice({ ...exercice, reps1: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Reps"
          />
        </div>
        <div className="flex-col">
          <p>Série 2</p>
          <input
            onChange={(e) =>
              setExercice({ ...exercice, weight2: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Poids"
          />
          <input
            onChange={(e) =>
              setExercice({ ...exercice, reps2: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Reps"
          />
        </div>
        <div className="flex-col">
          <p>Série 3</p>
          <input
            onChange={(e) =>
              setExercice({ ...exercice, weight3: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Poids"
          />
          <input
            onChange={(e) =>
              setExercice({ ...exercice, reps3: e.target.value })
            }
            type="number"
            className="input input-bordered input-primary my-2"
            placeholder="Reps"
          />
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Enregistrer l'exercice
        </button>
      </div>
    </div>
  );
};

export default ExerciceForm;
