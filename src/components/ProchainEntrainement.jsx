import React, { useState, useEffect } from "react";
import { db } from "../../firebase"; // Assurez-vous d'importer votre configuration Firestore
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

function ProchainEntrainement({ userId }) {
  const [entrainement, setEntrainement] = useState(null);

  const trainingsA = [
    "lower1_weeka",
    "upper1_weeka",
    "lower2_weeka",
    "upper2_weeka",
  ];
  const trainingsB = [
    "lower1_weekb",
    "upper1_weekb",
    "lower2_weekb",
    "upper2_weekb",
  ];

  useEffect(() => {
    const today = new Date();
    const startOfWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - today.getDay() + 1
    );
    const weeksSinceEpoch = Math.floor(
      (startOfWeek.getTime() / (1000 * 60 * 60 * 24) - 4) / 7
    );
    const isWeekA = weeksSinceEpoch % 2 === 0;

    const trainingsThisWeek = isWeekA ? trainingsA : trainingsB;

    // Récupérez la liste des entraînements déjà effectués cette semaine pour cet utilisateur

    const recordQuery = query(
      collection(db, "Records"),
      where("userId", "==", userId),
      where("trainingDate", ">=", startOfWeek)
    );

    getDocs(recordQuery).then((querySnapshot) => {
      const doneTrainings = querySnapshot.docs.map(
        (doc) => doc.data().sessionName
      );

      const nextTraining = trainingsThisWeek.find(
        (training) => !doneTrainings.includes(training)
      );

      if (nextTraining) {
        const sessionDoc = doc(db, "Seances", nextTraining);

        getDoc(sessionDoc).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            setEntrainement({ ...docSnapshot.data(), id: docSnapshot.id });
            console.log(docSnapshot.data());
          }
        });
      } else {
        setEntrainement(null); // si tous les entraînements de la semaine sont terminés
      }
    });
  }, [userId]);

  const openSession = (sessionId) => {
    // afficher les exercices de la seances dans une popup
  };

  if (entrainement === null) {
    return <div>Tous les entraînements de cette semaine sont terminés !</div>;
  }

  if (!entrainement) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold p-2">Prochain Entraînement</h1>
      <Link to={`/session/${entrainement.id}`}>
        <div className="card w-10/12 bg-white rounded-lg mx-auto">
          <div className="card-body">
            <div className="card-title">
              <div className="w-full text-left">
                <h2 className="text-black font-bold">{entrainement.nom}</h2>
              </div>
              <div className="border border-gray-200 w-6 h-6 rounded-md"></div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProchainEntrainement;
