import React, {useEffect, useState} from 'react';
import {LS_NEW_RESULTS, LS_RESULTS} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";
import {Button, Row, Table} from "reactstrap";
import moment from "moment/moment";
import {CSVLink} from 'react-csv';

/**
 * The list of visual acuity test results is construct with data in local storage (LS_RESULTS and LS_NEW_RESULTS)
 *
 * allResults : the concatenation of the local storage data (LS_RESULTS and LS_NEW_RESULTS).
 *            The data is raw (id of the attached data)
 * allResultsCompleted : data of allResults completed with student info (class, fullname, dob) and school name
 *            to allow search (string comparison)
 * filterSchool : contains the character string typed by the user in "School search" field
 * filterClass : contains the character string typed by the user in "Class search" field
 * filterFullName : contains the character string typed by the user in "Fullname search" field
 * resultsFiltered : data from allResultsCompleted after the filters (school, class, fullname) applied
 */
export function ResultsList() {
    const [allResults] = useState(JSON.parse(localStorage.getItem(LS_RESULTS)).concat(JSON.parse(localStorage.getItem(LS_NEW_RESULTS))));
    const allResultsCompleted = allResults.map((result) => {
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
    });
    const [filterSchool, setFilterSchool] = useState("");
    const [filterClass, setFilterClass] = useState("");
    const [filterFullName, setFilterFullName] = useState("");
    const [resultsFiltered, setResultsFiltered] = useState(allResultsCompleted);

    /**
     * Refreshes filteredResults each time a user types in one of the search fields
     */
    useEffect(() => {
        setResultsFiltered(allResultsCompleted
            .filter(r => (r.schoolName).toUpperCase().includes(filterSchool.toUpperCase()))
            .filter(r => (r.class).toUpperCase().includes(filterClass.toUpperCase()))
            .filter(r => (r.fullName).toUpperCase().includes(filterFullName.toUpperCase())));
    }, [filterSchool, filterClass, filterFullName]);

    /**
     * Construction of a html table to show 11 columns :
     * School's name, student's class, student's fullname, student's date of birth (DOB), test's date, wear glasses,
     * results of the comprehension test (true/false), rounds of the comprehension test played, Value Righ eyes,
     * Vale Left eyes, synchronised or not
     * @param tbodyData
     */
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
                    {tbodyData.map((item, index) => { return (
                        <tr key={index}>
                            {Object.values(item).map((value, index) => {
                                return (<td key={index}>{value}</td>)
                            })}
                        </tr>
                    ); })}
                    </tbody>
                </Table>
            </div>
        );
    }

    /**
     * Show the table of results with 3 search fields and "Export results" buttons if there is data
     * If not indicates "No result"
     */
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
                            data={resultsFiltered} separator={";"}
                            filename={"Results"+ moment(Date.now()).format('YYYY-MM-DD')+".csv"}>
                            <Button color="primary">
                                Export results
                            </Button>
                        </CSVLink>
                    </Row>
                    <ResultsTable tbodyData={resultsFiltered}></ResultsTable>
                </>
                :
                <p>No result</p>
            }
        </>
    )
}