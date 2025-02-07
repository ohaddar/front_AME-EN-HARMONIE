import styled from "styled-components";

const Container = styled.div`
  padding: 60px;
  font-family: Arial, sans-serif;
  line-height: 1.6;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
`;

const PrivacyPolicy = () => {
  return (
    <Container>
      <Title>Politique de Confidentialité</Title>
      <p>
        <strong>Dernière mise à jour :</strong> 31/01/2025
      </p>
      <p>
        <strong>
          Bienvenue sur ÂmeEnHarmonie. Votre confidentialité est essentielle
          pour nous.
        </strong>{" "}
        Cette politique de confidentialité décrit la manière dont nous
        collectons, utilisons et protégeons vos données personnelles lorsque
        vous utilisez notre plateforme.
      </p>
      <Section>
        <SectionTitle>1. Données collectées</SectionTitle>
        <p>
          Dans le cadre de l'utilisation de notre site, nous pouvons collecter
          les types de données suivants :
        </p>
        <ul>
          <li>
            <strong>Données d’identification :</strong> nom, prénom, adresse
            email (lors de l’inscription ou du contact avec nous).
          </li>
          <li>
            <strong>Données techniques :</strong> adresse IP, type de
            navigateur, système d’exploitation, pages visitées, temps de
            navigation.
          </li>
          <li>
            <strong>Données fournies volontairement :</strong> réponses aux
            questionnaires interactifs, témoignages ou messages envoyés via nos
            formulaires.
          </li>
          <li>
            <strong>Données d’utilisation :</strong> préférences et interactions
            avec le site afin d’améliorer votre expérience.
          </li>
        </ul>
        <p>
          Nous veillons à ne collecter que les informations strictement
          nécessaires à la finalité du traitement.
        </p>
      </Section>
      <Section>
        <SectionTitle>2. Finalités de la collecte des données</SectionTitle>
        <p>
          Vos données sont collectées et traitées pour les finalités suivantes :
        </p>
        <ul>
          <li>
            Fournir et améliorer nos services, notamment l'accès aux
            questionnaires et aux ressources informatives.
          </li>
          <li>
            Analyser les résultats du questionnaire interactif pour proposer des
            conseils et orientations personnalisés.
          </li>
          <li>Assurer la sécurité et le bon fonctionnement du site.</li>
          <li>
            Envoyer des communications (si vous avez donné votre consentement,
            par exemple pour recevoir des articles ou des notifications).
          </li>
          <li>Répondre à vos demandes via notre formulaire de contact.</li>
          <li>
            Garantir la conformité légale et assurer la protection contre les
            abus ou fraudes éventuelles.
          </li>
        </ul>
      </Section>
      <Section>
        <SectionTitle>3. Partage des données</SectionTitle>
        <p>
          Nous ne vendons ni ne louons vos données personnelles. Toutefois,
          certaines informations peuvent être partagées avec :
        </p>
        <ul>
          <li>
            Nos prestataires techniques (hébergement, analyses de performance du
            site).
          </li>
          <li>
            Des professionnels partenaires si vous souhaitez être mis en
            relation avec un spécialiste (uniquement avec votre consentement
            explicite).
          </li>
          <li>
            Les autorités compétentes, si nous y sommes contraints par la loi.
          </li>
        </ul>
        <p>
          Tous nos partenaires sont tenus de respecter la réglementation en
          matière de protection des données.
        </p>
      </Section>
      <Section>
        <SectionTitle>4. Durée de conservation des données</SectionTitle>
        <p>
          Nous conservons vos données aussi longtemps que nécessaire, selon les
          finalités suivantes :
        </p>
        <ul>
          <li>
            Données de compte utilisateur : jusqu’à la suppression de votre
            compte ou 3 ans après votre dernière activité.
          </li>
          <li>
            Données des questionnaires : anonymisées après [durée] ou supprimées
            si vous en faites la demande.
          </li>
          <li>
            Données techniques et cookies : 13 mois maximum après leur collecte.
          </li>
          <li>
            Données de communication : 3 ans après votre dernier contact avec
            nous.
          </li>
        </ul>
        <p>
          Une fois la période de conservation expirée, vos données sont
          supprimées ou anonymisées.
        </p>
      </Section>
      <Section>
        <SectionTitle>5. Vos droits sur vos données</SectionTitle>
        <p>
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez des droits suivants :
        </p>
        <ul>
          <li>
            <strong>Droit d'accès :</strong> obtenir une copie de vos données
            personnelles.
          </li>
          <li>
            <strong>Droit de rectification :</strong> corriger des données
            inexactes ou incomplètes.
          </li>
          <li>
            <strong>Droit à l’effacement :</strong> demander la suppression de
            vos données sous certaines conditions.
          </li>
          <li>
            <strong>Droit à la limitation du traitement :</strong> restreindre
            temporairement l’utilisation de vos données.
          </li>
          <li>
            <strong>Droit à la portabilité :</strong> récupérer vos données dans
            un format structuré et lisible.
          </li>
          <li>
            <strong>Droit d’opposition :</strong> refuser certains traitements,
            notamment pour le marketing.
          </li>
          <li>
            <strong>Droit de retirer votre consentement :</strong> à tout moment
            si le traitement repose sur celui-ci.
          </li>
        </ul>
        <p>
          📧 Pour exercer ces droits, vous pouvez nous contacter à : [email de
          contact].
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez
          saisir la CNIL ou l’autorité compétente de votre pays.
        </p>
      </Section>
      <Section>
        <SectionTitle>6. Sécurité des données</SectionTitle>
        <p>
          Nous mettons en œuvre des mesures de protection adaptées pour garantir
          la sécurité de vos informations :
        </p>
        <ul>
          <li>Chiffrement des données sensibles.</li>
          <li>
            Accès restreint aux informations personnelles (uniquement aux
            personnes autorisées).
          </li>
          <li>
            Stockage sécurisé des données sur des serveurs conformes aux normes
            de protection européennes.
          </li>
          <li>
            Surveillance régulière pour détecter et prévenir toute faille de
            sécurité.
          </li>
        </ul>
      </Section>
      <Section>
        <SectionTitle>7. Utilisation des cookies</SectionTitle>
        <p>
          Les cookies nous permettent d'améliorer votre expérience utilisateur.
          Nous utilisons :
        </p>
        <ul>
          <li>Cookies essentiels : pour le bon fonctionnement du site.</li>
          <li>
            Cookies analytiques : pour comprendre comment vous utilisez notre
            site (Google Analytics, par exemple).
          </li>
          <li>
            Cookies de personnalisation : pour adapter le contenu affiché selon
            vos préférences.
          </li>
        </ul>
        <p>
          Vous pouvez gérer ou refuser les cookies via notre bandeau de
          consentement ou dans les paramètres de votre navigateur.
        </p>
      </Section>
      <Section>
        <SectionTitle>8. Contact et réclamations</SectionTitle>
        <p>
          Si vous avez des questions sur cette politique de confidentialité,
          vous pouvez nous contacter :
        </p>
        <ul>
          <li>📧 Email : [contact@ameenharmonie.com]</li>
          <li>📍 Adresse : [Votre adresse]</li>
          <li>📞 Téléphone : [Votre numéro]</li>
        </ul>
        <p>
          Si vous estimez que le traitement de vos données n’est pas conforme,
          vous pouvez déposer une réclamation auprès de la CNIL (www.cnil.fr).
        </p>
      </Section>
      <Section>
        <SectionTitle>
          9. Modifications de la politique de confidentialité
        </SectionTitle>
        <p>
          Nous nous réservons le droit de modifier cette politique à tout
          moment. Toute mise à jour sera publiée sur cette page avec une date de
          révision.
        </p>
        <p>
          Nous vous encourageons à consulter cette politique régulièrement afin
          de rester informé(e) sur la manière dont nous protégeons vos données.
        </p>
        <p>
          En utilisant ÂmeEnHarmonie, vous acceptez notre politique de
          confidentialité.
        </p>
      </Section>
    </Container>
  );
};

export default PrivacyPolicy;
