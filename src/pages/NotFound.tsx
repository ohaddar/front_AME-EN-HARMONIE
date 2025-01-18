import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  /*const error = useRouteError() as Error;*/

  return (
    <div className="not-found">
      <Link to="/">Retourner vers la page d'accueil</Link>
    </div>
  );
};

export default NotFound;
/* <p>La ressource demandée est introuvable...</p>
    {error?.statusText ||
        (error?.message && (
          <p>
            <small>{`Erreur : ${error?.statusText || error?.message}`}</small>
          </p>
        ))}*/
