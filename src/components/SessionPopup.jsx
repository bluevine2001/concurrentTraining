import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import ExerciceMini from "./ExerciceMini";
import { useNavigate } from "react-router-dom";
const SessionPopup = () => {
  const { sessionId } = useParams();
  const [seance, setSeance] = useState(null);
  const [exercicesData, setExercicesData] = useState([]);
  const [record, setRecord] = useState({
    userId: "1",
    trainingDate: new Date(),
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSeance = async () => {
      const seanceDoc = doc(db, "Seances", sessionId);
      const seanceSnapshot = await getDoc(seanceDoc);
      if (seanceSnapshot.exists()) {
        setSeance(seanceSnapshot.data());
      }
    };

    fetchSeance();
  }, [sessionId]);

  function updateRecord(exercice) {
    setRecord({ ...record, [exercice.id]: exercice });
    console.log({ ...record, [exercice.id]: exercice });
  }

  function addRecord() {
    // Ajouter le record à la collection "Records"
    addDoc(collection(db, "Records"), record)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  useEffect(() => {
    if (seance && seance.exercices) {
      getExercices(seance.exercices);
    }
  }, [seance]);

  const getExercices = async (exos) => {
    let fetchedExercices = [];

    for (let exo of exos) {
      const exoDocRef = doc(db, "Exercices", exo);
      const exoDoc = await getDoc(exoDocRef);
      fetchedExercices.push({ ...exoDoc.data(), id: exoDoc.id });
    }

    setExercicesData(fetchedExercices);
  };

  if (!seance) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <div className="flex justify-end mr-4 mt-4">
        <div
          className="btn btn-circle btn-error hover:bg-white hover:border-red-500 hover:border hover:text-red-500"
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          X
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white">{seance.nom}</h2>
      {exercicesData.map((exercice, index) => (
        <ExerciceMini key={index} data={exercice} settodone={updateRecord} />
      ))}
      <button className="btn btn-success w-10/12 mt-3" onClick={addRecord}>
        Terminer l'exercice
      </button>
    </div>
  );
};

export default SessionPopup;
