import { Section } from "../../types/Discussion";

export const botData: Section[] = [
  {
    code: "about_psychology",
    name: "Tu veux connaître plus sur la psychologie ?",
    themes: [
      {
        code: "DEPRESSION",
        name: "Tu veux connaître plus sur le trouble de la dépression ?",
        response:
          "Le trouble de la dépression est un état de tristesse profonde et persistante.",
        link: "https://www.example.com/depression",
        relatedThemes: ["CONSULTATION_PROFESSIONNELLE_RECOMMANDEE"],
      },
      {
        code: "TROUBLE_INSOMNIE_ANXIETE",
        name: "Tu veux connaître plus sur les troubles d'insomnie et d'anxiété ?",
        response:
          "Ces troubles peuvent entraîner des difficultés à s'endormir et une préoccupation excessive.",
        link: "https://www.example.com/insomnia-anxiety",
        relatedThemes: ["DEPRESSION"],
      },
      {
        code: "TROUBLE_PANIQUE",
        name: "Tu veux connaître plus sur le trouble panique ?",
        response: "Il se caractérise par des attaques de panique récurrentes.",
        link: "https://www.example.com/panic-disorder",
        relatedThemes: ["TROUBLE_INSOMNIE_ANXIETE"],
      },
      {
        code: "PHOBIE",
        name: "Tu veux connaître plus sur les phobies ?",
        response:
          "Une phobie est une peur irrationnelle et intense d'un objet ou d'une situation.",
        link: "https://www.example.com/phobias",
        relatedThemes: ["PHOBIE_SPECIFIQUE"],
      },
      {
        code: "TOC",
        name: "Tu veux connaître plus sur le trouble obsessionnel-compulsif ?",
        response:
          "Le TOC se manifeste par des pensées obsessionnelles et des actions répétitives.",
        link: "https://www.example.com/ocd",
        relatedThemes: ["ADDICTION"],
      },
      {
        code: "ADDICTION",
        name: "Tu veux connaître plus sur l'addiction ?",
        response:
          "C'est un état de dépendance à une substance ou un comportement.",
        link: "https://www.example.com/addiction",
        relatedThemes: ["TOC"],
      },
      {
        code: "TROUBLE_BIPOLAIRE",
        name: "Tu veux connaître plus sur le trouble bipolaire ?",
        response:
          "Il se caractérise par des fluctuations extrêmes de l'humeur.",
        link: "https://www.example.com/bipolar-disorder",
        relatedThemes: [],
      },
      {
        code: "TROUBLE_SOMATIQUE",
        name: "Tu veux connaître plus sur le trouble somatique ?",
        response:
          "Des symptômes physiques non expliqués médicalement, souvent liés à des facteurs psychologiques.",
        link: "https://www.example.com/somatic-disorder",
        relatedThemes: [],
      },
      {
        code: "TROUBLE_SPECTRE_AUTISTIQUE",
        name: "Tu veux connaître plus sur le trouble du spectre autistique ?",
        response: "Il affecte la communication et les interactions sociales.",
        link: "https://www.example.com/autism-spectrum-disorder",
        relatedThemes: [],
      },
    ],
  },
  {
    code: "about_website_functionality",
    name: "Tu veux connaître plus sur la fonctionnalité du site ?",
    themes: [
      {
        code: "NAVIGATION",
        name: "Comment naviguer sur le site ?",
        response:
          "Utilisez le menu pour accéder aux différentes sections du site.",
        link: "https://www.example.com/navigation",
        relatedThemes: [],
      },
      {
        code: "RECHERCHE",
        name: "Comment utiliser la fonction de recherche ?",
        response:
          "Entrez des mots-clés dans la barre de recherche pour trouver des articles.",
        link: "https://www.example.com/search",
        relatedThemes: [],
      },
      {
        code: "COMPTE_UTILISATEUR",
        name: "Comment créer un compte utilisateur ?",
        response:
          "Cliquez sur 'S'inscrire' et suivez les instructions pour créer votre compte.",
        link: "https://www.example.com/signup",
        relatedThemes: [],
      },
      {
        code: "ASSISTANCE",
        name: "Comment obtenir de l'assistance ?",
        response:
          "Vous pouvez contacter notre support via la page d'assistance.",
        link: "https://www.example.com/support",
        relatedThemes: [],
      },
    ],
  },
];
