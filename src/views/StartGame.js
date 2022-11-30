import {NavBar} from "../components/NavBar";
import {Button, Col, FormGroup, Input, Label, Row} from "reactstrap";
import {OpenXlsFile} from "../components/OpenXlsFile";
import {LS_SCHOOLS, LS_STUDENT} from "./App";
import React, {useState} from "react";
import {StudentsList} from "../components/StudentsList";
import {useNavigate} from "react-router-dom";

function CustomInput(props: { label: string, type: string, id: string, name: string }) {
    return null;
}

export function StartGame(){
    const [schools] = useState(JSON.parse(localStorage.getItem(LS_SCHOOLS)));
    const navigate = useNavigate();

    return(
        <>
            <NavBar/>
            <div  className="m-auto w-75 my-2">
                <Row className="row-cols-lg-auto g-3 align-items-center"
                     style={{display: "flex", justifyContent: "end", alignItems: "flex-end"}}>
                    <Col>
                        <Input  label='Upload' type="file" name="file" id="xlsxClassList"  onChange={(e)=>{
                            const file = e.target.files[0];
                            OpenXlsFile(file);
                            window.location.reload();
                            window.alert("File "+file.name.toString()+" uploaded")
                        }}/>

                    </Col>
                    <Button type="button" className="btn btn-success mx-4" onClick={() => {
                        localStorage.setItem(LS_STUDENT, JSON.stringify({
                            idSchool: schools[0].id,
                            class: "",
                            fullName: "",
                            dob: ""
                           }))
                        navigate('/studentForm');
                    }
                    }>
                        New student
                    </Button>
                </Row>
                <StudentsList/>
            </div>
        </>
    )
}