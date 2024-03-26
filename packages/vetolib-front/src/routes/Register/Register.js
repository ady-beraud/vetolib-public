import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { registerUser } from "../../store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { IoIosWarning } from "react-icons/io";

function Register() {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [requiredErrors, setRequiredErrors] = useState([]);
    const [emailExists, setEmailExists] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const registerSchema = Yup.object().shape({
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        email: Yup.string().email('Veuillez entrer une adresse e-mail valide').required(),
        password: Yup.string().min(5, 'Mot de passe doit contenir au moins 5 caractères').required()
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerSchema.validate({first_name, last_name, email, password});
            const action = await dispatch(registerUser({first_name, last_name, email, password}));
            setEmailErrors([]);
            setPasswordErrors([]);
            setRequiredErrors([]);
            setEmailExists(false);
            if (registerUser.fulfilled.match(action)) {
                navigate('/account/appointments');
            } else {
                setEmailExists(true);
            }
        } catch (error) {
            if (error.name === 'ValidationError') {
                
                if (error.type === 'required') {
                    setRequiredErrors('Veuillez remplir tous les champs obligatoires');
                    setPasswordErrors([]);
                    setEmailErrors([]);
                    setEmailExists(false);
                } else if (error.type === 'email') {
                    setEmailErrors(error.message);
                    setPasswordErrors([]);
                    setRequiredErrors([]);
                    setEmailExists(false);
                } else {
                    setPasswordErrors(error.message);
                    setEmailErrors([]);
                    setRequiredErrors([]);
                    setEmailExists(false);
                }

            }
            console.error('Registration failed:', error);
        }
    }

    return (
        <div>
            <div className="login_register">
                <Header />
                <div className="page">
                    <div className="login">
                        <h1>J'ai déjà un compte Vetolib</h1>
                        <Link to="/login" className="register-link">SE CONNECTER</Link>
                    </div>
                    <div className="register">
                        <h1>Nouveau sur Vetolib ?</h1>
                        {emailErrors.length > 0 && <div className="error-details"><IoIosWarning className="svg"/>{emailErrors}</div>}
                        {passwordErrors.length > 0 && <div className="error-details"><IoIosWarning className="svg"/>{passwordErrors}</div>}
                        {requiredErrors.length > 0 && <div className="error-details"><IoIosWarning className="svg"/>{requiredErrors}</div>}
                        {emailExists && <div className="error-details"><IoIosWarning className="svg"/>L'adresse email est déjà enregistrée</div>}
                        <input 
                            type="text" 
                            name="first_name" 
                            placeholder="Votre prénom" 
                            className="login_input"
                            value={first_name}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                        <input 
                            type="text" 
                            name="last_name" 
                            placeholder="Votre nom" 
                            className="login_input"
                            value={last_name}
                            onChange={(e) => setLastName(e.target.value)} 
                            />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Votre adresse e-mail" 
                            className="login_input" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <input 
                            type="password" 
                            name="password"
                            placeholder="Choisissez un mot de passe" 
                            className="login_input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        <button type="submit" className="connect" onClick={handleSubmit}>SE CONNECTER</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;