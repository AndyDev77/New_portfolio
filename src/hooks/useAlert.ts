import { useState } from "react";

// Vous pouvez définir une interface pour l'état de votre alerte ici
interface AlertState {
  show: boolean;
  text: string;
  type: "danger" | "success"; // et autres types si nécessaire
}

const useAlert = () => {
  // Définissez l'état initial de votre alerte en utilisant l'interface
  const [alert, setAlert] = useState<AlertState>({ show: false, text: "", type: "danger" });

  // Fonction pour afficher l'alerte avec du texte et un type spécifique
  const showAlert = ({ text, type }: { text: string; type: "danger" | "success" }) => {
    setAlert({ show: true, text, type });
  };

  // Fonction pour cacher l'alerte, qui réinitialise l'état à ses valeurs par défaut
  const hideAlert = () => {
    setAlert({ show: false, text: "", type: "danger" });
  };

  // Exposez l'état de l'alerte et les fonctions pour le modifier
  return { alert, showAlert, hideAlert };
};

export default useAlert;
