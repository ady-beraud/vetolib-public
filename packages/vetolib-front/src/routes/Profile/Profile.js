import React, { useState } from "react";
import Header from "../../components/Account_Header/Header";
import { MdPerson } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import "./Profile.css";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { saveAnimal, fetchInfo, savePhone } from "../../store/user/userActions";
import { useEffect } from "react";
import * as Yup from 'yup';

function Profile() {
    
    const { user } = useSelector(state => state.auth);
    const { animals, telephone } = useSelector(state => state.user);
    const [newAnimal, setNewAnimal] = useState("");
    const [phone, setPhone] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [phoneClicked, setPhoneClicked] = useState(false);
    const [animalErrors, setAnimalErrors] = useState(false);
    const [phoneErrors, setPhoneErrors] = useState(false);
    const dispatch = useDispatch();

    const infoSchema = Yup.object().shape({
        newValue: Yup.string().required(),
      });

    useEffect(() => {
        dispatch(fetchInfo({ id: user.id }));
    }, [dispatch, user.id]);

    const handleClick = () => {
        setIsClicked(!isClicked);
        setAnimalErrors(false);
        setPhoneErrors(false);
    }

    const handlePhone = () => {
        setPhoneClicked(!phoneClicked);
        setAnimalErrors(false);
        setPhoneErrors(false);
    }

    const handleSubmit = async (e, saveInfo, newValue, type) => {
        e.preventDefault();
        try {
            await infoSchema.validate({ newValue }, { abortEarly: false });
            await dispatch(saveInfo({newValue, id: user.id}));
            if (type === "animal") {
                setIsClicked(false);
                setNewAnimal("");
                setAnimalErrors(false);
                setPhoneErrors(false);
            } else {
                setPhoneClicked(false);
                setPhone("");
                setAnimalErrors(false);
                setPhoneErrors(false);
            }
        } catch (err) {
            if (err.name === 'ValidationError') {
                
                const valueErrors = err.inner.filter((e) => e.type === 'required');

                if (valueErrors.length > 0 && type === "animal") {
                    setAnimalErrors(true);
                    setPhoneErrors(false);
                } else {
                    setAnimalErrors(false);
                    setPhoneErrors(true);
                }
            } else {
                console.error('Failed to add user info', err);
            }
        }
    }

    return (
        <div className="profile_content">
            <Header />
            <div className="profile_centered">
                <h1>Mon compte</h1>
                <div className="section">
                    <h2>Identité</h2>
                    <div className="section-info">
                        <h3><MdPerson className="svg"/>Mon profil</h3>
                        <p className="user-info">{user.google_name ?`${user.google_name}` : `${user.first_name} ${user.last_name}`}</p>
                        <div className="add-user-info">
                            <h3><MdOutlinePets className="svg"/>Mes animaux</h3>
                            <p className="gray" onClick={handleClick}>Ajouter{isClicked ? <MdKeyboardArrowDown className="margin-left" /> : <FaPlus className="margin-left"/>}</p>
                        </div>
                        {isClicked && 
                        <div className="name-animal">
                            <input 
                                type='text'
                                name='animal'
                                placeholder="Nom de votre animal"
                                className={`animal-input ${animalErrors ? 'error' : ''}` }
                                value={newAnimal}
                                onChange={(e) => setNewAnimal(e.target.value)}
                                />
                            <button type="submit" className="animal-btn" onClick={(e) => handleSubmit(e, saveAnimal, newAnimal, "animal")}>Enregistrer</button>
                        </div>}
                        {animals && animals.map((animal, index) => (
                            <p className="user-info margin-bottom" key={index}>{animal}</p>
                        ))}
                    </div>
                </div>
                <div className="section">
                    <h2>Connexion</h2>
                    <div className="section-info">
                        <div className="add-user-info">
                        <h3><FaPhoneAlt className="svg"/>Téléphone</h3>
                        {telephone ? 
                        (<p className="gray" onClick={handlePhone}>Modifier</p>) : 
                        (<p className="gray" onClick={handlePhone}>Ajouter <FaPlus className="margin-left"/></p>)}
                        </div>
                        {phoneClicked && 
                        <div className="name-animal">
                            <input 
                                type='text'
                                name='phone'
                                placeholder="Numéro de téléphone"
                                className={`animal-input ${phoneErrors ? 'error' : ''}` }
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                />
                            <button type="submit" className="animal-btn" onClick={(e) => handleSubmit(e, savePhone, phone, "phone")}>Enregistrer</button>
                        </div>}
                        {telephone && <p className="user-info margin-bottom">{telephone}</p>}
                        <h3><MdEmail className="svg"/>E-mail</h3>
                        <p className="user-info">{user.google_name ? "Connecté avec Google" : `${user.email}`}</p>
                        <div className="add-user-info">
                        <h3><FaLock className="svg" />Mot de passe</h3>
                        <p className="gray">{user.google_name ? "" : "Modifier"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;