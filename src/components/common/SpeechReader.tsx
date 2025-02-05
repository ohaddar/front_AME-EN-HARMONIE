import React, { useEffect, useState } from "react";
import styled from "styled-components";

const SpeechReader: React.FC = () => {
  const [voix, setVoix] = useState<SpeechSynthesisVoice | null>(null);
  const [lectureEnCours, setLectureEnCours] = useState(false);

  useEffect(() => {
    const chargerVoix = () => {
      const voices = window.speechSynthesis.getVoices();
      const voixFrancaise = voices.find(
        (v) => v.lang === "fr-FR" || v.lang === "fr-CA",
      );
      setVoix(voixFrancaise || null);
    };

    chargerVoix();
    window.speechSynthesis.onvoiceschanged = chargerVoix;
  }, []);

  const lirePage = () => {
    if (!voix) return alert("Aucune voix française trouvée.");

    const synth = window.speechSynthesis;
    const contenu = analyserStructure(document.body);
    const utterance = new SpeechSynthesisUtterance(contenu);

    utterance.voice = voix;
    utterance.lang = "fr-FR";
    utterance.rate = 0.25;

    synth.speak(utterance);
    setLectureEnCours(true);

    utterance.onend = () => setLectureEnCours(false);
  };

  const arreterLecture = () => {
    window.speechSynthesis.cancel();
    setLectureEnCours(false);
  };

  const analyserStructure = (element: HTMLElement): string => {
    let texte = "";
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as HTMLElement).tagName.toLowerCase();
        switch (tag) {
          case "nav":
            texte +=
              "Cette page contient une navigation avec les éléments suivants : " +
              analyserStructure(node as HTMLElement) +
              "................ ";
            break;
          case "section":
            texte +=
              "Il y a une section qui contient : " +
              analyserStructure(node as HTMLElement) +
              ". ";
            break;
          case "article":
            texte += "Les articles sur notre site : ";
            document.querySelectorAll(".blog-title").forEach((titreElement) => {
              const titre = titreElement.textContent?.trim();
              if (titre) {
                texte += `Article : ${titre}. `;
              }
            });
            break;
          case "footer":
            texte +=
              "Enfin, il y a un pied de page contenant : " +
              analyserStructure(node as HTMLElement) +
              ". ";
            break;
          default:
            texte += analyserStructure(node as HTMLElement);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        texte += node.textContent?.trim() + " ";
      }
    });
    return texte;
  };

  return (
    <ContentReader>
      {!lectureEnCours ? (
        <Button onClick={lirePage}>🎤 Lire la page</Button>
      ) : (
        <Button onClick={arreterLecture}>⏹️ Arrêter</Button>
      )}
    </ContentReader>
  );
};
const ContentReader = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  background: #463ee4;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  font-size: 30px;
  z-index: 1000;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 24px;
    bottom: 10px;
    right: 10px;
  }
`;

const Button = styled.button`
  background-color: #463ee4;
  border: none;
  color: #fff;
  font-size: 16px;
  padding: 12px 20px;
  border-radius: 30px;
  cursor: pointer;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #3b34cc;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 18px;
  }
`;

export default SpeechReader;
