import React from 'react';
import {useState} from "react";
import {
    LS_NEW_VISUALSTESTS,
    LS_VISUALSTESTS
} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";
import {Row} from "reactstrap";

export function ResultsList() {
    const [tests] = useState(JSON.parse(localStorage.getItem(LS_VISUALSTESTS)));
    const [newTests] = useState(JSON.parse(localStorage.getItem(LS_NEW_VISUALSTESTS)));

    function tableToCSV() {

        // Variable to store the final csv data
        var csv_data = [];

        // Get each row data
        var rows = document.getElementsByTagName('tr');
        for (var i = 0; i < rows.length; i++) {

            // Get each column data
            var cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            var csvrow = [];
            for (var j = 0; j < cols.length; j++) {

                // Get the text data of each cell
                // of a row and push it to csvrow
                csvrow.push(cols[j].innerHTML);
            }

            // Combine each column value with comma
            csv_data.push(csvrow.join(";"));
        }
        console.log(csv_data);
        // Combine each row data with new line character
        csv_data = csv_data.join('\n');

        // Call this function to download csv file
        downloadCSVFile(csv_data);

    }

    function downloadCSVFile(csv_data) {

        // Create CSV file object and feed
        // our csv_data into it
        const CSVFile = new Blob([csv_data], {
            type: "text/csv"
        });

        // Create to temporary link to initiate
        // download process
        const temp_link = document.createElement('a');

        // Download csv file with predefine name
        temp_link.download = "ExportResult.csv";
        temp_link.href =  window.URL.createObjectURL(CSVFile);

        // This link should not be displayed
        temp_link.style.display = "none";
        document.body.appendChild(temp_link);

        // Automatically click the link to
        // trigger download
        temp_link.click();
        document.body.removeChild(temp_link);

    }


    function TestsFromFirebase() {
        if (tests.length > 0) {
            return <>
                <h1>Results in database</h1>
                <TableConstruction theadData={Object.keys(tests[0])} tbodyData={tests}/>
            </>;
        }
        return <div/>;
    }

    function NewTests() {
        if (newTests.length > 0) {
            return <>
                <h1>Results not synchronised</h1>
                <TableConstruction theadData={Object.keys(newTests[0])} tbodyData={newTests}/>
            </>;
        }
        return <div/>;
    }

    function TableConstruction({theadData, tbodyData}) {
        return (

            <div>
                <input type="text" id="myInput" placeholder="Search for..."
                       title="Type in a name"></input>
            <table className="table">
                <thead>
                <tr>
                    {theadData.map(heading => {
                        switch(heading) {
                            case "idStudent":
                            case "localIdStudent":   return <>
                                <th key={"schoolName"}>School</th>
                                <th key={"class"}>Class</th>
                                <th key={"fullName"}>Fullname</th>
                                <th key={"dob"}>DOB</th>
                            </>;
                            // TODO: key warning is because of <>
                            case "dateTest":   return <th key={"dateTest"}>Date</th>;
                            case "correction":   return <th key={"correction"}>Glasses </th>;
                            case "comprehension":   return <th key={"comprehension"}>Understood </th>;
                            case "rounds":   return <th key={"rounds"}>Rounds </th>;
                            case "vaRe":   return <th key={"vaRe"}>vaRe</th>;
                            case "vaLe":   return <th key={"vaLe"}>vaLe</th>;
                            default: return }
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((row, index) => {
                    return <tr key={index}>
                        {theadData.map((key, index) => {
                            switch(key) {
                                case "idStudent":
                                case "localIdStudent": {
                                    const student = getStudentFromLS(row);
                                    return <>
                                        <td key={{index}+"schoolName"}>{getSchoolNameFromLS(student)}</td>
                                        <td key={{index}+"class"}>{student.class}</td>
                                        <td key={{index}+"fullName"}>{student.fullName}</td>
                                        <td key={{index}+"dob"}>{student.dob}</td>
                                    </>;
                                }
                                case "dateTest": return <td key={index}>{row[key]}</td>;
                                case "correction":   return <td key={index}>{row[key].toString()}</td>;
                                case "comprehension":   return <td key={index}>{row[key].toString()}</td>;
                                case "rounds":   return <td key={index}>{row[key]}</td>;
                                case "vaRe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                case "vaLe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                default: return}
                        })}
                    </tr>;
                })}
                </tbody>
            </table>
            </div>
        );
    }

    return(
            <div>
                <Row className="row-cols-lg-auto g-3 align-items-center"
                     style={{ display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                    <button type="button" className="btn btn-primary" onClick={()=>tableToCSV()}>
                        Export all results
                    </button>
                </Row>
                <TestsFromFirebase/>
                <NewTests/>
            </div>
    )
}