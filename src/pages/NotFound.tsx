import React from "react";
import { Link, useRouteError } from "react-router-dom";

import "./NotFound.css";
import { Error } from "../types/types";

const NotFound: React.FC = () => {
  const error = useRouteError() as Error;

  return (
    <div className="not-found">
      <p>La ressource demandée est introuvable...</p>
      {error?.statusText ||
        (error?.message && (
          <p>
            <small>{`Erreur : ${error?.statusText || error?.message}`}</small>
          </p>
        ))}
      <Link to="/">Retourner vers la page d'accueil</Link>
    </div>
  );
};

export default NotFound;
