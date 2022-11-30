import React, {useEffect} from 'react';
import {useState} from "react";
import {
    LS_NEW_RESULTS,
    LS_RESULTS
} from "../views/App";
import {getSchoolNameFromLS, getStudentFromLS} from "../config/SearchLocalStorage";
import {Row, Table} from "reactstrap";
import moment from "moment/moment";

export function ResultsList() {
    const [tests] = useState(JSON.parse(localStorage.getItem(LS_RESULTS)));
    const [newTests] = useState(JSON.parse(localStorage.getItem(LS_NEW_RESULTS)));
    const [searchRadio, setSearchRadio] = useState("school")

    /**
     * Refresh search each time radiobutton of search is changed
     */
    useEffect(() => {
        let inputSearch = document.getElementById("inputSearch");
        SelectColumnToFilter(inputSearch.value)
    }, [searchRadio]);

    /**
     * Create a csv data form a html table
     */
    function tableToCSV() {
        // Variable to store the final csv data
        let csv_data = [];

        // Get each row data
        let rows = document.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {

            // Get each column data
            let cols = rows[i].querySelectorAll('td,th');

            // Stores each csv row data
            let csvrow = [];
            for (let j = 0; j < cols.length; j++) {

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

    /**
     * Download csv data
     * @param csv_data
     */
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

    /**
     * Array with results in database
     */
    function AllResults() {
        if (tests.length > 0) {
            return <div id="results">
                <h1>All results</h1>
                <TableConstruction theadData={Object.keys(tests[0])} tbodyData1={tests} tbodyData2={newTests}/>
            </div>;
        }
        return <div/>;
    }

    /**
     * Select where apply filter based on radio button
     * @param input of searching
     */
    function SelectColumnToFilter(input) {
        switch(searchRadio){
            case 'school':
                new ColumnFilter("results",0, input);
                break;
            case 'class':
                new ColumnFilter("results",1, input);
                break;
            case 'fullName':
                new ColumnFilter("results",2, input);
                break;
            default:
                break;
        }
    }

    /**
     * Hide row of column based on filter input
     * @param table to filter
     * @param columnNumberToFilter
     * @param input of searching
     * @constructor
     */
    function ColumnFilter(table, columnNumberToFilter, input) {
        let i, td;
        const inputUpperCase = input.toUpperCase();
        const tableById = document.getElementById(table);
        const tr = tableById.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[columnNumberToFilter];
            for (let i = 0; i < tr.length; i++) {
                const td = tr[i].getElementsByTagName("td")[columnNumberToFilter];
                if (td) {
                    const txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(inputUpperCase) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
    }

    /**
     * Construction of student's rows
     * Not in return because creating a warning the <> with no key value
     * @param row
     */
    function UnderTableStudentConstruction(row){
        const student = getStudentFromLS(row);
        return (
            <>
                <td style={{width: "15%"}} key={"schoolName"}>{getSchoolNameFromLS(student)}</td>
                <td key={"class"}>{student.class}</td>
                <td style={{width: "15%"}} key={"fullName"}>{student.fullName}</td>
                <td key={"dob"}>{student.dob}</td>
            </>
        )
    }

    /**
     * Construct the results table html with 2 list
     * @param theadData for headers
     * @param tbodyData for data
     */
    function TableConstruction({theadData, tbodyData1, tbodyData2}) {
        return (
            <div>

                <Table size="sm">
                    <thead>
                    <tr>
                        <th key={"schoolName"}>School</th>
                        <th key={"classs"}>Class</th>
                        <th key={"fullName"}>Fullname</th>
                        <th key={"dob"}>DOB</th>
                        {theadData.map(heading => {
                            switch(heading) {
                                case "dateTest":   return <th key={"dateTest"}>Date</th>;
                                case "correction":   return <th key={"correction"}>Glasses </th>;
                                case "comprehension":   return <th key={"comprehension"}>Understood </th>;
                                case "rounds":   return <th key={"rounds"}>Rounds </th>;
                                case "vaRe":   return <th key={"vaRe"}>vaRe</th>;
                                case "vaLe":   return <th key={"vaLe"}>vaLe</th>;
                                default: return }
                        })}
                        <th key={"synchronise"}>Synchronise</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tbodyData1.map((row, index) => {
                        return <tr key={index}>
                            {UnderTableStudentConstruction(row)}
                            {theadData.map((key, index) => {
                                switch(key) {
                                    case "dateTest": return <td key={index}>{moment(row[key]).format('YYYY-MM-DD h:mm a')}</td>;
                                    case "correction":   return <td key={index}>{row[key].toString()}</td>;
                                    case "comprehension":   return <td key={index}>{row[key].toString()}</td>;
                                    case "rounds":   return <td key={index}>{row[key]}</td>;
                                    case "vaRe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                    case "vaLe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                    default: return}
                            })}
                            <td key={index}>True</td>
                        </tr>;
                    })}
                    {tbodyData2.map((row, index) => {
                        return <tr key={index}>
                            {UnderTableStudentConstruction(row)}
                            {theadData.map((key, index) => {
                                switch(key) {
                                    case "dateTest": return <td key={index}>{moment(row[key]).format('YYYY-MM-DD h:mm a')}</td>;
                                    case "correction":   return <td key={index}>{row[key].toString()}</td>;
                                    case "comprehension":   return <td key={index}>{row[key].toString()}</td>;
                                    case "rounds":   return <td key={index}>{row[key]}</td>;
                                    case "vaRe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                    case "vaLe":   return <td key={index}>{Math.round(row[key] * 100) / 100}</td>;
                                    default: return}
                            })}
                            <td key={index}>False</td>
                        </tr>;
                    })}
                    </tbody>
                </Table>
            </div>
        );
    }


    return(
        <div>
            <label>Search : </label>
            <input type="text" className="m-3" id="inputSearch" placeholder="Search..."
                   onChange={(e) => {SelectColumnToFilter(e.target.value)}}>
            </input>
            <label>
                <input type="radio" checked={searchRadio === 'school'} className="m-1" value="school" name="search" onChange={(e)=>setSearchRadio(e.target.value)}/>
                School
            </label>
            <label>
                <input type="radio" className="m-1" value="class" name="search" onChange={(e)=>setSearchRadio(e.target.value)} />
                Class
            </label>
            <label>
                <input type="radio" className="m-1" value="fullName" name="search" onChange={(e)=>setSearchRadio(e.target.value)}/>
                FullName
            </label>
            <Row className="row-cols-lg-auto g-3 align-items-center"
                 style={{ display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                <button type="button" className="btn btn-primary" onClick={()=>tableToCSV()}>
                    Export all results
                </button>
            </Row>

            <AllResults/>
        </div>
    )
}