import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })


const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
   // State pour gérer les valeurs des champs du formulaire
   const [name, setName] = useState("");
   const [firstname, setFirstName]= useState("");
   const [type, setType]= useState("");

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      console.log("Formulaire soumis", name);
      setSending(true);

      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, name]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div  className="col">
        {/* <input id="nom" placeholder="Nom" value={name}  onChange={(e) => setName(e.target.value)}  /> */}
          <Field  placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
