import { Questionnaire } from "../../types/types";

export const questionnaireData: Questionnaire = {
  questions: [
    {
      id: "0.1",
      text: "Quel est votre âge ?",
      responses: ["-14 ans", "14-17 ans", "18-20 ans", "21-26 ans", "+26 ans"],
      next: { default: "0.2" },
    },
    {
      id: "0.2",
      text: "Quel est votre sexe ?",
      responses: ["Homme", "Femme", "Ne pas préciser"],
      next: { default: "0.3" },
    },
    {
      id: "0.3",
      text: "Quel est votre statut ?",
      responses: [
        "Lycéen(ne)",
        "Étudiant(e)",
        "Employé(e)",
        "Sans emploi",
        "Autre",
      ],
      next: { default: "0.4" },
    },
    {
      id: "0.4",
      text: "Vivez-vous seul(e), avec vos parents, en colocation, en couple, ou autre ?",
      responses: [
        "Seul(e)",
        "Avec mes parents",
        "En colocation",
        "En couple",
        "Autre",
      ],
      next: { default: "0.5" },
    },
    {
      id: "0.5",
      text: "Avez-vous des antécédents familiaux de troubles psychiques ?",
      responses: ["Oui", "Non"],
      next: { oui: "0.6", non: "0.6" }, // Both lead to the same next question
    },
    {
      id: "0.6",
      text: "Êtes-vous actuellement sous traitement médicamenteux ou suivi par un professionnel de la santé mentale ?",
      responses: ["Oui", "Non"],
      next: { oui: "1.1", non: "1.1" },
    },
    {
      id: "1.1",
      text: "Ressentez-vous souvent une tristesse ou une perte d'intérêt pour les activités habituelles ?",
      responses: ["Oui", "Non"],
      next: { oui: "1.2", non: "2.1" },
    },
    {
      id: "1.2",
      text: "Ressentez-vous ces symptômes depuis plus de deux semaines ?",
      responses: ["Oui", "Non"],
      next: { oui: "1.3", non: "2.1" },
    },
    {
      id: "1.3",
      text: "Ces sentiments interfèrent-ils avec vos activités quotidiennes ?",
      responses: ["Oui", "Non"],
      next: { oui: "Dépression", non: "2.1" },
    },
    {
      id: "2.1",
      text: "Avez-vous des difficultés à vous endormir ou à rester endormi ?",
      responses: ["Oui", "Non"],
      next: { oui: "Trouble d'insomnie ou anxiété", non: "3.1" },
    },
    {
      id: "3.1",
      text: "Ressentez-vous souvent de l'inquiétude ou de l'anxiété sans raison apparente ?",
      responses: ["Oui", "Non"],
      next: { oui: "3.2", non: "4.1" },
    },
    {
      id: "3.2",
      text: "Avez-vous des crises de panique soudaines et intenses ?",
      responses: ["Oui", "Non"],
      next: { oui: "Trouble panique", non: "3.3" },
    },
    {
      id: "3.3",
      text: "Évitez-vous certaines situations de peur de ressentir de l'anxiété ?",
      responses: ["Oui", "Non"],
      next: { oui: "Phobie", non: "4.1" },
    },
    {
      id: "4.1",
      text: "Avez-vous des pensées intrusives ou répétitives qui vous causent du stress ?",
      responses: ["Oui", "Non"],
      next: { oui: "4.2", non: "5.1" },
    },
    {
      id: "4.2",
      text: "Ces pensées sont-elles accompagnées d'actions répétitives pour diminuer l'anxiété ?",
      responses: ["Oui", "Non"],
      next: { oui: "TOC", non: "5.1" },
    },
    {
      id: "5.1",
      text: "Consommez-vous régulièrement des substances comme l'alcool ou la drogue pour faire face à vos émotions ?",
      responses: ["Oui", "Non"],
      next: { oui: "5.2", non: "6.1" },
    },
    {
      id: "5.2",
      text: "Utilisez-vous ces substances pour gérer des émotions spécifiques ?",
      responses: ["Oui", "Non"],
      next: { oui: "5.3", non: "6.1" },
    },
    {
      id: "5.3",
      text: "Avez-vous essayé d'arrêter sans succès ?",
      responses: ["Oui", "Non"],
      next: { oui: "Addiction", non: "6.1" },
    },
    {
      id: "6.1",
      text: "Avez-vous des variations extrêmes de l'humeur, passant de périodes de grande énergie à des périodes de dépression ?",
      responses: ["Oui", "Non"],
      next: { oui: "6.2", non: "7.1" },
    },
    {
      id: "6.2",
      text: "Durant les périodes de grande énergie, ressentez-vous le besoin de dormir moins ?",
      responses: ["Oui", "Non"],
      next: { oui: "6.3", non: "7.1" },
    },
    {
      id: "6.3",
      text: "Avez-vous des comportements impulsifs durant ces périodes ?",
      responses: ["Oui", "Non"],
      next: { oui: "Trouble bipolaire", non: "7.1" },
    },
    {
      id: "7.1",
      text: "Avez-vous des peurs spécifiques ou des phobies qui impactent votre quotidien ?",
      responses: ["Oui", "Non"],
      next: { oui: "7.2", non: "8.1" },
    },
    {
      id: "7.2",
      text: "Quels sont les objets ou situations qui vous causent ces peurs ?",
      responses: [],
      next: { default: "Phobie spécifique" },
    },
    {
      id: "8.1",
      text: "Avez-vous des symptômes physiques tels que des maux de tête, douleurs musculaires, sans cause médicale ?",
      responses: ["Oui", "Non"],
      next: { oui: "Trouble somatique", non: "8.2" },
    },
    {
      id: "8.2",
      text: "Avez-vous des pensées suicidaires ou des envies de vous faire du mal ?",
      responses: ["Oui", "Non"],
      next: { oui: "Intervention immédiate nécessaire", non: "8.3" },
    },
    {
      id: "8.3",
      text: "Avez-vous des difficultés de communication et d'interaction sociale ?",
      responses: ["Oui", "Non"],
      next: {
        oui: "Trouble du spectre autistique",
        non: "Consultation professionnelle recommandée",
      },
    },
  ],
  messages: {
    Dépression: "Il est possible que vous soyez confronté(e) à une dépression.",
    "Trouble d'insomnie ou anxiété":
      "Il est possible que vous soyez confronté(e) à un trouble d'insomnie ou d'anxiété.",
    "Trouble panique":
      "Il est possible que vous soyez confronté(e) à un trouble panique.",
    Phobie: "Il est possible que vous soyez confronté(e) à une phobie.",
    TOC: "Il est possible que vous soyez confronté(e) à un trouble obsessionnel-compulsif (TOC).",
    Addiction: "Il est possible que vous soyez confronté(e) à une addiction.",
    "Trouble bipolaire":
      "Il est possible que vous soyez confronté(e) à un trouble bipolaire.",
    "Phobie spécifique":
      "Il est possible que vous soyez confronté(e) à une phobie spécifique.",
    "Trouble somatique":
      "Il est possible que vous soyez confronté(e) à un trouble somatique.",
    "Intervention immédiate nécessaire":
      "Il est possible que vous ayez besoin d'une intervention immédiate.",
    "Trouble du spectre autistique":
      "Il est possible que vous soyez confronté(e) à un trouble du spectre autistique.",
    "Consultation professionnelle recommandée":
      "Il est recommandé de consulter un professionnel pour un avis plus approfondi.",
  },
  defaultMessage:
    "Nous n'avons pas pu déterminer le diagnostic spécifique. Nous vous encourageons à consulter un professionnel pour une évaluation approfondie.",
};
