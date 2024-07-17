import { useState } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import "./css/contact.css";

export default function Contact() {
    const { register, handleSubmit, reset } = useForm();
    const [isSuccess, setIsSuccess] = useState(false);
    const [result, setResult] = useState(null);

    // Remplacez par votre clé d'accès Web3Forms
    const accessKey = "bc7d307c-96bc-4571-a722-df7b9f905e17";

    const { submit: onSubmit } = useWeb3Forms({
        access_key: accessKey,
        settings: {
            from_name: "Sumfy.fr",
            subject: " Nouveau Message client pour le support",
            // Ajoutez d'autres paramètres si nécessaire
        },
        onSuccess: (msg, data) => {
            setIsSuccess(true);
            setResult(msg);
            reset();
        },
        onError: (msg, data) => {
            setIsSuccess(false);
            setResult(msg);
        },
    });

    const onSubmitForm = (formData) => {
        onSubmit(formData);
    };

    return (
        <div className="contact-container">
            <h2>Contactez-nous</h2>
            <form className="contact-form" onSubmit={handleSubmit(onSubmitForm)}>
                <div className="form-group">
                    <label>Nom:</label>
                    <input type="text" {...register("name", { required: true })} />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" {...register("email", { required: true })} />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea {...register("message", { required: true })} />
                </div>
                <button type="submit">Envoyer</button>
            </form>

            {isSuccess && <p className="success-message">

                <Alert severity={"success"} >
                    <AlertTitle>Message envoyé avec succès !</AlertTitle>

                </Alert>

            </p>}
            {result && <Alert severity={"error"} >
                <AlertTitle>Une erreur est survenue. Veuillez réessayer plus tard.</AlertTitle>
            </Alert>}
        </div>
    );
}
