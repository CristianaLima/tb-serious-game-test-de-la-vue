import React, {useEffect} from 'react';
import {useState} from "react";
import {
    LS_NEW_RESULTS,
    LS_RESULTS
} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";
import {Button, Row, Table} from "reactstrap";
import moment from "moment/moment";
import {CSVLink} from 'react-csv';

export function ResultsList() {
    const [allResults] = useState(JSON.parse(localStorage.getItem(LS_RESULTS)).concat(JSON.parse(localStorage.getItem(LS_NEW_RESULTS))));
    const [filterSchool, setFilterSchool] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterFullName, setFilterFullName] = useState("");
    const [filteredResults, setFilteredResults] = useState(filterResults());

    function filterResults(){
        return allResults.map((result) => {
            const student = getStudentFromLS(result);
            return ({
            'schoolName': getSchoolNameFromLS(student),
            'class': student.class,
            'fullName': student.fullName,
            'dob': student.dob,
            'dateTest': moment(result.dateTest).format('YYYY-MM-DD h:mm a'),
            'correction': result.correction.toString(),
            'comprehension': result.comprehension.toString(),
            'rounds': result.rounds,
            'vaRe': Math.round(result.vaRe * 100) / 100,
            'vaLe': Math.round(result.vaLe * 100) / 100,
            'synchronised': result.id == null ? "false" : "true"
            })
        })
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

    function ResultsTable({tbodyData}) {
        return (
            <div>
                <Table size="sm">
                    <thead>
                    <tr>
                        <th style={{width: "15%"}} key={"schoolName"}>School</th>
                        <th key={"class"}>Class</th>
                        <th style={{width: "15%"}} key={"fullName"}>Fullname</th>
                        <th key={"dob"}>DOB</th>
                        <th key={"dateTest"}>Date</th>
                        <th key={"correction"}>Glasses </th>
                        <th key={"comprehension"}>Understood </th>
                        <th key={"rounds"}>Rounds </th>
                        <th key={"vaRe"}>vaRe</th>
                        <th key={"vaLe"}>vaLe</th>
                        <th key={"synchronised"}>Synchronised</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        tbodyData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    {Object.values(item).map((value, index) => {
                                            return (<td key={index}>{value}</td>)
                                        })}
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
        <>
            <h1>All results</h1>
            {allResults.length > 0 ?
                <>
                    <Row className="row-cols-lg-auto g-3 align-items-center"
                         style={{ display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                        <label>
                            School:
                            <input type="text" className="m-3" placeholder="Search..."
                                   onChange={(e) => {setFilterSchool(e.target.value)}}></input>
                        </label>
                        <label>
                            Class :
                            <input type="text" className="m-3" placeholder="Search..."
                                   onChange={(e) => {setFilterClass(e.target.value)}}>
                            </input>
                        </label>
                        <label>
                            Fullname :
                            <input type="text" className="m-3" placeholder="Search..."
                                   onChange={(e) => {setFilterFullName(e.target.value)}}>
                            </input>
                        </label>
                        <CSVLink
                            data={filteredResults} separator={";"}
                            filename={"Results"+ moment(Date.now()).format('YYYY-MM-DD')+".csv"}>
                            <Button color="primary">
                                Export results
                            </Button>
                        </CSVLink>
                    </Row>
                    <ResultsTable tbodyData={filteredResults}></ResultsTable>
                </>
                :
                <p>No results</p>
            }
        </>
    )
}