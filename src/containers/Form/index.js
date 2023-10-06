import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // State pour gérer les valeurs des champs du formulaire
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const erreur = ("Veillez renseignez tous les champs");

  // if (!name || !firstName || !email || !message){
  //   // Si l'un des c'est champs sont vide, affiche un message d'erreur
  //   // !title: Cela vérifie si la variable title est évaluée à faux. !=signifie faux
  //   // erreur.textContent = "Veillez renseignez tous les champs";
  
  //     return (
  //       <p>{erreur} </p>
  //     ) 
  // }
  

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
        setShowConfirmation(true);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <div>
      {showConfirmation ? (
        <div>Votre demande a bien été prise en compte.</div>
      ) : (
        <form onSubmit={sendContact}>
          <div className="row">
            <div className="col">
              <Field
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                label="Nom"
              />
              <Field
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=""
                label="Prénom"
              />
              <Select
                selection={["Personnel", "Entreprise"]}
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
                label="Personnel / Entreprise"
                type="large"
                titleEmpty
              />
              <Field
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
                label="Email"
              />
              <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
                {sending ? "En cours" : "Envoyer"}
              </Button>
            </div>
            <div className="col">
              <Field
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                placeholder="message"
                label="Message"
                type={FIELD_TYPES.TEXTAREA}
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
