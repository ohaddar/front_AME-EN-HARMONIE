import { Questionnaire } from "../../api/QuestionService";

export const questionnaireData: Questionnaire = {
  questions: [
    {
      id: "0.1",
      text: "Quel est votre âge ?",
      type: "text",
      next: { default: "0.2" },
    },
    {
      id: "0.2",
      text: "Quel est votre sexe ?",
      type: "text",
      next: { default: "0.3" },
    },
    {
      id: "0.3",
      text: "Êtes-vous actuellement étudiant(e), employé(e), sans emploi, ou autre ?",
      type: "text",
      next: { default: "0.4" },
    },
    {
      id: "0.4",
      text: "Vivez-vous seul(e), avec vos parents, en colocation, ou autre ?",
      type: "text",
      next: { default: "0.5" },
    },
    {
      id: "0.5",
      text: "Avez-vous des antécédents familiaux de troubles psychiques ?",
      type: "text",
      next: { default: "0.6" },
    },
    {
      id: "0.6",
      text: "Êtes-vous actuellement sous traitement médicamenteux ou suivi par un professionnel de la santé mentale ?",
      type: "text",
      next: { default: "1.1" },
    },
    {
      id: "1.1",
      text: "Ressentez-vous souvent une tristesse ou une perte d'intérêt pour les activités habituelles ?",
      type: "multiple-choice",
      next: { yes: "1.2", no: "2.1" },
    },
    {
      id: "1.2",
      text: "Depuis combien de temps ressentez-vous ces symptômes ?",
      type: "multiple-choice",
      next: {
        "plus de deux semaines": "1.3",
        "moins de deux semaines": "2.1",
      },
    },
    {
      id: "1.3",
      text: "Ces sentiments interfèrent-ils avec vos activités quotidiennes ?",
      type: "multiple-choice",
      next: { yes: "Dépression", no: "2.1" },
    },
    {
      id: "2.1",
      text: "Avez-vous des difficultés à vous endormir ou à rester endormi ?",
      type: "multiple-choice",
      next: { yes: "Trouble d'insomnie ou anxiété", no: "3.1" },
    },
    {
      id: "3.1",
      text: "Ressentez-vous souvent de l'inquiétude ou de l'anxiété sans raison apparente ?",
      type: "multiple-choice",
      next: { yes: "3.2", no: "4.1" },
    },
    {
      id: "3.2",
      text: "Avez-vous des crises de panique soudaines et intenses ?",
      type: "multiple-choice",
      next: { yes: "Trouble panique", no: "3.3" },
    },
    {
      id: "3.3",
      text: "Évitez-vous certaines situations de peur de ressentir de l'anxiété ?",
      type: "multiple-choice",
      next: { yes: "Phobie", no: "4.1" },
    },
    {
      id: "4.1",
      text: "Avez-vous des pensées intrusives ou répétitives qui vous causent du stress ?",
      type: "multiple-choice",
      next: { yes: "4.2", no: "5.1" },
    },
    {
      id: "4.2",
      text: "Ces pensées sont-elles accompagnées d'actions répétitives pour diminuer l'anxiété ?",
      type: "multiple-choice",
      next: { yes: "TOC", no: "5.1" },
    },
    {
      id: "5.1",
      text: "Consommez-vous régulièrement des substances comme l'alcool ou la drogue pour faire face à vos émotions ?",
      type: "multiple-choice",
      next: { yes: "5.2", no: "6.1" },
    },
    {
      id: "5.2",
      text: "Utilisez-vous ces substances pour gérer des émotions spécifiques ?",
      type: "multiple-choice",
      next: { yes: "5.3", no: "6.1" },
    },
    {
      id: "5.3",
      text: "Avez-vous essayé d'arrêter sans succès ?",
      type: "multiple-choice",
      next: { yes: "Addiction", no: "6.1" },
    },
    {
      id: "6.1",
      text: "Avez-vous des variations extrêmes de l'humeur, passant de périodes de grande énergie à des périodes de dépression ?",
      type: "multiple-choice",
      next: { yes: "6.2", no: "7.1" },
    },
    {
      id: "6.2",
      text: "Durant les périodes de grande énergie, ressentez-vous le besoin de dormir moins ?",
      type: "multiple-choice",
      next: { yes: "6.3", no: "7.1" },
    },
    {
      id: "6.3",
      text: "Avez-vous des comportements impulsifs durant ces périodes ?",
      type: "multiple-choice",
      next: { yes: "Trouble bipolaire", no: "7.1" },
    },
    {
      id: "7.1",
      text: "Avez-vous des peurs spécifiques ou des phobies qui impactent votre quotidien ?",
      type: "multiple-choice",
      next: { yes: "7.2", no: "8.1" },
    },
    {
      id: "7.2",
      text: "Quels sont les objets ou situations qui vous causent ces peurs ?",
      type: "multiple-choice",
      next: { default: "Phobie spécifique" },
    },
    {
      id: "8.1",
      text: "Avez-vous des symptômes physiques tels que des maux de tête, douleurs musculaires, sans cause médicale ?",
      type: "multiple-choice",
      next: { yes: "Trouble somatique", no: "8.2" },
    },
    {
      id: "8.2",
      text: "Avez-vous des pensées suicidaires ou des envies de vous faire du mal ?",
      type: "multiple-choice",
      next: { yes: "Intervention immédiate nécessaire", no: "8.3" },
    },
    {
      id: "8.3",
      text: "Avez-vous des difficultés de communication et d'interaction sociale ?",
      type: "multiple-choice",
      next: {
        yes: "Trouble du spectre autistique",
        no: "Consultation professionnelle recommandée",
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
