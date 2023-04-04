import React, { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import countryList from "./data/country.json";
import stateData from "./data/state.json";
import waterData from "./data/water.json";

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState();

    const [stateList, setStateList] = useState(stateData);
    const [selectedState, setSelectedState] = useState();

    const [waterList, setWaterList] = useState(waterData);
    const [selectedWater, setSelectedWater] = useState();

    const countryFilter = (option, props) => option.name.toLowerCase().indexOf(props.text.toLowerCase()) !== -1;

    const handleCountryChange = (selection) => {
        const country = selection[0];
        setSelectedCountry(country);
        fetchStates(country);
    };

    const handleStateChange = (selection) => {
        const state = selection[0];
        setSelectedState(state);
        fetchWaters(state);
    };

    const handleWaterChange = (selection) => {
        const water = selection[0];
        setSelectedWater(water);
    };

    const fetchStates = (country) => {
        if (country) {
            setStateList(stateData.filter((state) => state.country_id === country.id));
        }
    };

    // eslint-disable-next-line no-unused-vars
    const apiFetchWaters = (state) => {
        if (state) {
            fetch("http://localhost:3033/water/state/" + state.id)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw response;
                })
                .then((waters) => {
                    setWaterList(waters);
                })
                .catch((error) => console.log("FETCH waters ERROR: ", error));
        }
    };

    // eslint-disable-next-line no-unused-vars
    const fetchWaters = (state) => {
        if (state) {
            debugger;
            const waters = waterData.filter((water) => water.state_id === state.id);
            setWaterList(waters);
        }
    };

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 label-col"> Country:</div>
                    <div className="col-3">
                        <Typeahead id="ctry-dd" labelKey="name" filterBy={countryFilter} options={countryList} onChange={handleCountryChange} />
                    </div>
                    <div className="col-8 info-col">
                        <div>{JSON.stringify(selectedCountry)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 label-col"> State:</div>
                    <div className="col-3">
                        <Typeahead id="st-dd" labelKey="name" options={stateList} onChange={handleStateChange} />
                    </div>
                    <div className="col-8 info-col">
                        <div>{JSON.stringify(selectedState)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 label-col"> Water:</div>
                    <div className="col-3">
                        <Typeahead id="wtr-dd" labelKey="name" options={waterList} onChange={handleWaterChange} />
                    </div>
                    <div className="col-8 info-col">
                        <div>{JSON.stringify(selectedWater)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
