import React, { useState, useRef } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import AddWater from "./components/addWater/addWater.js";

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

    const stateTaRef = useRef(null);
    const waterTaRef = useRef(null);

    const handleCountryChange = (selection) => {
        const country = selection[0];
        setSelectedCountry(country);
        fetchStates(country);
        stateTaRef.current.focus(); 
    };

    const handleStateChange = (selection) => {
        const state = selection[0];
        setSelectedState(state);
        fetchWaters(state);
        waterTaRef.current.focus();
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

    const fetchWaters = (state) => {
        if (state) {
            const waters = waterData.filter((water) => water.state_id === state.id).sort((water) => water.name);
            setWaterList(waters);
        }
    };

    const handleAddWater = (newWater) => {
        const newWaterList = [newWater].concat(waterList);

        setWaterList(newWaterList);
        setSelectedWater(newWater);
        waterTaRef.current.focus();
    };

    return (
        <div className="App">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-1 label-col"> Country:</div>
                    <div className="col-3">
                        <Typeahead id="ctry-dd" labelKey="name" filterBy={countryFilter} options={countryList} onChange={handleCountryChange} />
                    </div>
                    <div className="col-1 label-col">&nbsp;</div>
                    <div className="col-7 info-col">
                        <div>{JSON.stringify(selectedCountry)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 label-col"> State:</div>
                    <div className="col-3">
                        <Typeahead id="st-dd" ref={stateTaRef} labelKey="name" options={stateList} onChange={handleStateChange} />
                    </div>
                    <div className="col-1 label-col">&nbsp;</div>
                    <div className="col-7 info-col">
                        <div>{JSON.stringify(selectedState)}</div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 label-col"> Water:</div>
                    <div className="col-3">
                        <Typeahead id="wtr-dd" ref={waterTaRef} labelKey="name" options={waterList} onChange={handleWaterChange} />
                    </div>
                    <div className="col-1 info-col">
                        <AddWater onAdded={handleAddWater} />
                    </div>
                    <div className="col-7 info-col">
                        <div>{JSON.stringify(selectedWater)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
