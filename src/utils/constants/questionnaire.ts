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
      next: { oui: "DEPRESSION", non: "2.1" },
    },
    {
      id: "2.1",
      text: "Avez-vous des difficultés à vous endormir ou à rester endormi ?",
      responses: ["Oui", "Non"],
      next: { oui: "TROUBLE_INSOMNIE_ANXIETE", non: "3.1" },
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
      next: { oui: "TROUBLE_PANIQUE", non: "3.3" },
    },
    {
      id: "3.3",
      text: "Évitez-vous certaines situations de peur de ressentir de l'anxiété ?",
      responses: ["Oui", "Non"],
      next: { oui: "PHOBIE", non: "4.1" },
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
      next: { oui: "ADDICTION", non: "6.1" },
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
      next: { oui: "TROUBLE_BIPOLAIRE", non: "7.1" },
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
      next: { default: "PHOBIE_SPECIFIQUE" },
    },
    {
      id: "8.1",
      text: "Avez-vous des symptômes physiques tels que des maux de tête, douleurs musculaires, sans cause médicale ?",
      responses: ["Oui", "Non"],
      next: { oui: "TROUBLE_SOMATIQUE", non: "8.2" },
    },
    {
      id: "8.2",
      text: "Avez-vous des pensées suicidaires ou des envies de vous faire du mal ?",
      responses: ["Oui", "Non"],
      next: { oui: "INTERVENTION_IMMEDIATE_NECESSAIRE", non: "8.3" },
    },
    {
      id: "8.3",
      text: "Avez-vous des difficultés de communication et d'interaction sociale ?",
      responses: ["Oui", "Non"],
      next: {
        oui: "TROUBLE_SPECTRE_AUTISTIQUE",
        non: "CONSULTATION_PROFESSIONNELLE_RECOMMANDEE",
      },
    },
  ],
  results: {
    DEPRESSION: "Il est possible que vous soyez confronté(e) à une dépression.",
    TROUBLE_INSOMNIE_ANXIETE:
      "Il est possible que vous soyez confronté(e) à un trouble d'insomnie ou d'anxiété.",
    TROUBLE_PANIQUE:
      "Il est possible que vous soyez confronté(e) à un trouble panique.",
    PHOBIE: "Il est possible que vous soyez confronté(e) à une phobie.",
    TOC: "Il est possible que vous soyez confronté(e) à un trouble obsessionnel-compulsif (TOC).",
    ADDICTION: "Il est possible que vous soyez confronté(e) à une addiction.",
    TROUBLE_BIPOLAIRE:
      "Il est possible que vous soyez confronté(e) à un trouble bipolaire.",
    PHOBIE_SPECIFIQUE:
      "Il est possible que vous soyez confronté(e) à une phobie spécifique.",
    TROUBLE_SOMATIQUE:
      "Il est possible que vous soyez confronté(e) à un trouble somatique.",
    INTERVENTION_IMMEDIATE_NECESSAIRE:
      "Il est possible que vous ayez besoin d'une intervention immédiate.",
    TROUBLE_SPECTRE_AUTISTIQUE:
      "Il est possible que vous soyez confronté(e) à un trouble du spectre autistique.",
    CONSULTATION_PROFESSIONNELLE_RECOMMANDEE:
      "Il est recommandé de consulter un professionnel pour un avis plus approfondi.",
  },
  defaultMessage:
    "Nous n'avons pas pu déterminer le diagnostic spécifique. Nous vous encourageons à consulter un professionnel pour une évaluation approfondie.",
};
