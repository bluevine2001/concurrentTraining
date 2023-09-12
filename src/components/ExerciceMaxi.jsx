import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Assurez-vous d'importer votre instance Firestore
import { useNavigate, Link } from "react-router-dom";

const ExerciceMaxi = () => {
  const { exerciceId } = useParams();
  const navigate = useNavigate();
  const [exo, setExo] = useState(null);

  useEffect(() => {
    const fetchExercice = async () => {
      const exoDoc = doc(db, "Exercices", exerciceId);
      const exoSnapshot = await getDoc(exoDoc);
      if (exoSnapshot.exists()) {
        setExo({ ...exoSnapshot.data(), id: exoSnapshot.id });
      }
    };

    fetchExercice();
  }, [exerciceId]);

  if (!exo) return <div>Loading...</div>;

  return (
    <div className="bg-white h-screen pt-4">
      <div className="flex justify-end mr-2">
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

      <div className="title bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text">
        <h2 className="text-center text-4xl font-bold text-transparent">
          {exo.nom}
        </h2>
      </div>
      {exo.image_url && (
        <div className="exoimage">
          <img src={exo.image_url} alt="random" />
        </div>
      )}
      <div className="details text-center mt-5 text-black font-bold text-2xl">
        <p>Reps : {exo.heavy_reps}</p>
        <p>Temps de repos : {exo.rest_time}</p>
      </div>
      {exo.video_url && (
        <div className="video">
          <iframe
            width="560"
            height="315"
            src={exo.video_url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ExerciceMaxi;
