import React, {useEffect} from 'react';
import {useState} from "react";
import {
    LS_NEW_RESULTS,
    LS_RESULTS
} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";
import {Row, Table} from "reactstrap";
import moment from "moment/moment";
import {CSVDownload} from 'react-csv';
import {render} from "@testing-library/react";

export function ResultsList() {
    const [allResults] = useState(JSON.parse(localStorage.getItem(LS_RESULTS)).concat(JSON.parse(localStorage.getItem(LS_NEW_RESULTS))));
    const [filterSchool, setFilterSchool] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterFullName, setFilterFullName] = useState("");
    const [filteredResults, setFilteredResults] = useState(filterResults());

    function filterResults(){
        return allResults.map((element) => ({
            'schoolName': getSchoolNameFromLS(getStudentFromLS(element)),
            'class': getStudentFromLS(element).class,
            'fullName': getStudentFromLS(element).fullName,
            'dob': getStudentFromLS(element).dob,
            'dateTest': moment(element.dateTest).format('YYYY-MM-DD h:mm a'),
            'correction': element.correction.toString(),
            'comprehension': element.comprehension.toString(),
            'rounds': element.rounds,
            'vaRe': Math.round(element.vaRe * 100) / 100,
            'vaLe': Math.round(element.vaLe * 100) / 100,
            'synchronise': element.id == null ? "False" : "True"}))
    }

    /**
     * Refresh search each time search inputs change
     */
    useEffect(() => {
        setFilteredResults(filterResults()
            .filter(r => (r.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(r => (r.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(r => (r.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
    }, [filterSchool, filterClass, filterFullName]);

    /**
     * Array with results in database
     */
    function FilteredResults() {
        if (allResults.length > 0) {
            return <div id="results">
                <h1>All results</h1>
                <NewTableConstruction tbodyData={filteredResults}></NewTableConstruction>
            </div>;
        }
        return <div/>;
    }

    function ListToCSV(){
        render(<CSVDownload data={filteredResults} separator={";"}/>)
    }

    function NewTableConstruction({tbodyData}) {
        return (
            <div>
                <Table size="sm">
                    <thead>
                    <tr>
                        <th key={"schoolName"}>School</th>
                        <th key={"classs"}>Class</th>
                        <th key={"fullName"}>Fullname</th>
                        <th key={"dob"}>DOB</th>
                        <th key={"dateTest"}>Date</th>
                        <th key={"correction"}>Glasses </th>
                        <th key={"comprehension"}>Understood </th>
                        <th key={"rounds"}>Rounds </th>
                        <th key={"vaRe"}>vaRe</th>
                        <th key={"vaLe"}>vaLe</th>
                        <th key={"synchronise"}>Synchronise</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tbodyData.map(item => {
                            return (
                                <tr>
                                    {
                                        Object.values(item).map(value => {
                                            return (<td>{value}</td>)
                                        })
                                    }
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }

    return(
        <div>
            <label>
                School:
                <input type="text" className="m-3" id="inputSearchSchool" placeholder="Search..."
                       onChange={(e) => {setFilterSchool(e.target.value)}}></input>
            </label>
            <label>
                Class :
                <input type="text" className="m-3" id="inputSearchClass" placeholder="Search..."
                       onChange={(e) => {setFilterClass(e.target.value)}}>
                </input>
            </label>
            <label>
                Fullname :
                <input type="text" className="m-3" id="inputSearchFullName" placeholder="Search..."
                       onChange={(e) => {setFilterFullName(e.target.value)}}>
                </input>
            </label>
            <Row className="row-cols-lg-auto g-3 align-items-center"
                 style={{ display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                <button type="button" className="btn btn-primary" onClick={()=>ListToCSV()}>
                    Export results
                </button>
            </Row>
            <FilteredResults/>
        </div>
    )
}