import './tfl.scss'
import { useState, useEffect } from "react";
import axios from "axios";
// import { types } from "util";
import { linesInterface } from "../utils/types";
import Disruption from "./Disruptions/Disruptions";
import Header from './Header/Header';
import BusTimes from './BusTimes/BusTimes';
import { disruptionInterface } from "../utils/types";
import { BrowserRouter, Routes, Route } from "react-router-dom";





export function Tfl(): JSX.Element {
    const [specificLine, setSpecificLine] = useState<linesInterface>({
        $type: "",
        id: "0",
        operationType: 0,
        vehicleId: "",
        naptanId: "",
        stationName: "",
        lineId: "",
        lineName: "",
        platformName: "",
        direction: "",
        bearing: "",
        destinationNaptanId: "",
        destinationName: "",
        timestamp: "",
        timeToStation: 0,
        currentLocation: "",
        towards: "",
        expectedArrival: "",
        timeToLive: "",
        modeName: "",
        timing: {
            $type: "",
            countdownServerAdjustment: "",
            source: "",
            insert: "",
            read: "",
            sent: "",
            received: ""
        }
    })
    const [allLines, setAllLines] = useState<linesInterface[]>([])
    const [refreshTimes, setRefreshTimes] = useState(false)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [routeNumber, setRouteNumber] = useState<string>("106")
    const [disruptions, setDisruptions] = useState<disruptionInterface[]>([])
    const [mode, setMode] = useState<string>("none")
    const [refresh, setRefresh] = useState(false)
    const [specificDisruption, setSpecificDisruption] = useState<disruptionInterface>({
        $type: "",
        atcoCode: "",
        fromDate: "",
        toDate: "",
        description: "",
        commonName: "0",
        type: "",
        mode: "",
        stationAtcoCode: "",
        appearance: ""
    })
    // const API_KEY = process.env.API_KEY
    // const APP_KEY = process.env.APP_KEY

    const APP_KEY= "289effd732914b13af2cee66a3876905"
    const API_KEY= "587856dbb7ae4388b5bde2edb573fedd"


    useEffect(() => {
        async function getAllLines() {
            try {
                const response = await axios.get(`https://api.tfl.gov.uk/Line/${routeNumber}/Arrivals?app_id=${APP_KEY}&${API_KEY}`)
                setAllLines(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        getAllLines()
    }, [refreshTimes, searchTerm, routeNumber, API_KEY, APP_KEY])


    const filteredRouteLines = routeLine(allLines, searchTerm);

    function routeLine(
        getRoutes: linesInterface[],
        searchTerm: string
    ) {
        const routeSearch = getRoutes.filter(
            (obj) =>
                obj["stationName"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["destinationName"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["towards"].toLowerCase().includes(searchTerm.toLowerCase()) ||
                obj["lineName"].toLowerCase().includes(searchTerm.toLowerCase())
        );

        return routeSearch;
    }

    const sortedRouteLines = filteredRouteLines.sort((a, b) =>
        a.timeToStation > b.timeToStation ? 1 : -1
    );


    return (
        <>
            <Header />
            <Routes>
                <Route path="/tfl-vite"/>
                <Route path="tfl-vite/bus-times" 
                element={
                    <BusTimes sortedRouteLines={sortedRouteLines}
                                searchTerm ={searchTerm}
                                specificLine={specificLine} 
                                setSpecificLine={setSpecificLine} 
                                setRefreshTimes={setRefreshTimes} 
                                setSearchTerm={setSearchTerm} 
                                setRouteNumber={setRouteNumber} />
                            }
                />
                <Route path="tfl-vite/disruptions" 
                element={
                <Disruption
                            disruptions={disruptions} 
                            setDisruptions={setDisruptions} 
                            mode={mode} 
                            setMode={setMode} 
                            refresh={refresh}
                            setRefresh={setRefresh}
                            setSpecificDisruption={setSpecificDisruption}
                            specificDisruption={specificDisruption}
                />} />
            </Routes>
        </>
    )
}