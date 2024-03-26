import React, { useEffect } from "react";
import Header from "../../components/Header/Header";
import Account_Header from "../../components/Account_Header/Header";
import Info from "../../components/Info/Info";
import Card from "../../components/Card/Card";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import "./Home.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProfessionals,
  searchPropositions,
  searchByJob,
  searchByProfile,
  searchAllProfessionals,
} from "../../store/search/searchActions";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { FaHistory } from "react-icons/fa";
import { updateSearchPropositions } from "../../store/search/searchSlice";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { propositions } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const debouncedFetchData = debounce(async () => {
      if (searchTerm) {
        try {
          await dispatch(searchPropositions(searchTerm));
        } catch (err) {
          console.error("Failed to get propositions", err);
        }
      }
    }, 300);

    debouncedFetchData();

    return () => debouncedFetchData.cancel();
  }, [searchTerm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!searchTerm) {
        await dispatch(searchAllProfessionals());
        return navigate("/search");
      }
      const action = await dispatch(searchProfessionals(searchTerm));
      setSearchTerm("");
      if (searchProfessionals.fulfilled.match(action)) {
        navigate("/search");
      }
    } catch (err) {
      console.err("Failed to search", err);
    }
  };

  const searchJob = async (job) => {
    try {
      const action = await dispatch(searchByJob(job));
      setSearchTerm("");
      if (searchByJob.fulfilled.match(action)) {
        navigate("/search");
      }
    } catch (err) {
      console.err("Failed to search", err);
    }
  };

  const searchPerson = async (person) => {
    try {
      const action = await dispatch(searchByProfile(person));
      setSearchTerm("");
      if (searchByProfile.fulfilled.match(action)) {
        navigate("/professional");
      }
    } catch (err) {
      console.err("Failed to search", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  if (!searchTerm) {
    dispatch(updateSearchPropositions(""));
  }

  return (
    <div>
      {isAuthenticated ? <Account_Header /> : <Header />}
      <div className="home">
        <div className="background">
          <div className="search">
            <div className="search-right">
              <div className="search-info">
                <h1>Trouvez un rendez-vous avec un vétérinaire</h1>
              </div>
              <div
                className={`search-bar ${
                  propositions && searchTerm ? "remove-border" : ""
                }`}
              >
                <div className="search-input">
                  <IoIosSearch size="1.3rem" />
                  <input
                    autoFocus
                    name="search"
                    type="text"
                    autoComplete="off"
                    placeholder="Nom, spécialité, établissement,..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="button">
                  <button type="submit" onClick={(e) => handleSubmit(e)}>
                    Rechercher
                  </button>
                  <IoIosArrowForward color="white" />
                </div>
              </div>
              <div
                className={`search-propositions ${
                  propositions && searchTerm ? "add-border" : ""
                }`}
              >
                {propositions && searchTerm
                  ? propositions.map((result, index) => (
                      <div key={index} className="proposition">
                        <FaHistory size="1.1rem" color="gray" />
                        {result.first_name ? (
                          <div
                            className="proposition-container"
                            onClick={() => searchPerson(result.id)}
                          >
                            {result.image && (
                              <img
                                className="proposition-img"
                                src={result.image}
                                alt=""
                              />
                            )}
                            <div className="proposition-info">
                              <p className="proposition-name">{`${result.first_name} ${result.last_name}`}</p>
                              <p className="proposition-job proposition-profile">
                                {result.job}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div
                            onClick={() => searchJob(result.job)}
                            className="proposition-container"
                          >
                            <div className="proposition-info">
                              <p className="proposition-job">{result.job}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <img src="home_img.png" className="home_img" />
          </div>
          <div className="info_group">
            <Info
              paragraph="Accédez simplement et rapidement à une large communauté de professionnels animaliers"
              img_src="info_img.jpg"
              button="PRENDRE RENDEZ-VOUS"
              link_to="/search"
            />
            <Info
              paragraph="Gérez le bien-être de votre animal de façon sécurisée"
              img_src="info_img2.jpg"
              button="ACCÉDEZ À VOTRE COMPTE"
              link_to="/login"
            />
          </div>
        </div>
      </div>
      <div className="characteristics">
        <h2>Vetolib: au service de votre animal</h2>
        <div className="card_group">
          <Card
            card_img="card_img.svg"
            card_text="Prenez des décisions éclairées et adaptées aux besoins de votre animal"
          />
          <Card
            card_img="card_img2.svg"
            card_text="Améliorez le bien-être de votre animal en dàcouvrant l'ensemble des services proposés"
          />
          <Card
            card_img="card_img3.svg"
            card_text="Recevez des conseils et astuces pour aider à l'épanouissement de vos animaux"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
