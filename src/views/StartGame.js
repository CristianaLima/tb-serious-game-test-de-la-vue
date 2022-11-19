import React, {useState} from "react";
import {NavBar} from "../components/NavBar";
import {StudentsList} from "../components/StudentList";
import {OpenXlsFile} from "../components/OpenXlsFile";
import {Input,  Col, Button, Row} from "reactstrap";
import StudentForm from "../components/StudentForm";

export function StartGame(){
    const [content, setContent] = useState(0)

    return(
        <div>
            <NavBar/>

            <div  className="px-3 m-auto w-75 my-2">
                {content===0 ?
                    <>
                        <Row className="row-cols-lg-auto g-3 align-items-center"  style={{display: "flex",
                            justifyContent: "end", alignItems: "flex-end"
                        }}>
                            <Col>
                                <Input  label='Upload' type="file" name="file" id="xlsxClassList"  onChange={(e)=>{
                                    const file = e.target.files[0];
                                    OpenXlsFile(file);
                                    window.location.reload();
                                    window.alert("File "+file.name.toString()+" uploaded")
                                }}/>
                            </Col>
                            <Button type="button" className="btn btn-success mx-4"   onClick={() => {setContent(1)}}>
                                New student
                            </Button>
                        </Row>
                        <StudentsList/>
                    </>
                    :
                    <>
                        <button type="button" className="btn btn-danger btn-lg m-5"
                                onClick={() => {setContent(0)}}>
                            Back to student list
                        </button>
                        <StudentForm/>
                    </>}
            </div>

        </div>
            )
}