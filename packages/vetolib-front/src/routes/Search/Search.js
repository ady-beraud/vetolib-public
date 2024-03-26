import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Account_Header from "../../components/Account_Header/Header";
import "./Search.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { searchProfessionals, searchByJob, searchByProfile, searchPropositions } from "../../store/search/searchActions";
import Professional from "../../components/Professional/Professional";
import { useNavigate } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import debounce from 'lodash.debounce';
import { updateSearchPropositions } from "../../store/search/searchSlice";

function Search() {

    const {isAuthenticated} = useSelector(state => state.auth);
    const {searchResults, propositions} = useSelector(state => state.search);

    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const debouncedFetchData = debounce(async () => {
            if (searchTerm) {
                try {
                    await dispatch(searchPropositions(searchTerm));
                } catch (err) {
                    console.error('Failed to get propositions', err);
                }
            }
        }, 300);

        debouncedFetchData();

        return () => debouncedFetchData.cancel();

    }, [searchTerm]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(searchProfessionals(searchTerm));
            setSearchTerm('');
        } catch (err) {
            console.err('Failed to search', err);
        }
    };

    const searchJob = async (job) => {
        try {
            const action = await dispatch(searchByJob(job));
            setSearchTerm('');
            if (searchByJob.fulfilled.match(action)) {
                navigate('/search');
            }
        } catch (err) {
            console.err('Failed to search', err);
        }
    }

    const searchPerson = async (person) => {
        try {
            const action = await dispatch(searchByProfile(person));
            setSearchTerm('');
            if (searchByProfile.fulfilled.match(action)) {
                navigate('/professional');
            }
        } catch (err) {
            console.err('Failed to search', err);
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    if (!searchTerm) {
        dispatch(updateSearchPropositions(''));
    }

    return (
        <div className="search-page">
            {isAuthenticated ? <Account_Header /> : <Header />}
            <div className="searching">
                <div className="search-wrapper">
                    <div className={`search-bar ${propositions && searchTerm ? 'remove-border' : ''}`}>
                        <div className="search-input">
                            <IoIosSearch size='1.3rem'/>
                                <input 
                                name="search" 
                                type="text" 
                                placeholder="Nom, spécialité, établissement,..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoComplete="off"
                                onKeyDown={handleKeyDown}
                                />
                        </div>
                        <div className="button blue">
                            <button type="submit" className="blue" onClick={handleSubmit}>Rechercher</button>
                            <IoIosArrowForward color="white" />
                        </div>
                    </div>
                    <div className={`search-propositions ${propositions && searchTerm ? 'add-border' : ''}`}>
                            {propositions && searchTerm ? propositions.map((result, index) => (
                                <div key={index} className="proposition">
                                    <FaHistory size='1.1rem' color="gray" />
                                    {result.first_name ? (
                                    <div className="proposition-container" onClick={() => searchPerson(result.id)}>
                                    {result.image && <img className="proposition-img" src={result.image} alt="" />}
                                        <div className="proposition-info">
                                            <p className='proposition-name'>{`${result.first_name} ${result.last_name}`}</p>
                                            <p className="proposition-job proposition-profile">{result.job}</p>
                                        </div>
                                    </div>
                                    ) : (
                                    <div onClick={() => searchJob(result.job)} className="proposition-container">
                                        <div className="proposition-info">
                                            <p className="proposition-job">{result.job}</p>
                                        </div>
                                    </div>
                                    )}
                                </div>
                                )) : null}
                    </div>
                </div>
                <div className="search-results">
                {searchResults ? searchResults.map((result, index) => (
                    <Professional key={index} professional={result} />
                )) : <p className="no-result">Aucun resultat</p>}
                </div>
            </div>
        </div>
    )
}

export default Search