import { useEffect, useState, useContext } from "react"
import { Form, Jumbotron, Button } from "react-bootstrap"
import ShirtContext from "./ShirtContext"
import axios from "axios"; //for http requests
//import sharp, { format } from "sharp"; // to resize images

import "./../Styles/DisplayStyles.css" //general display styles

//get the url from the config file
import config from "./../config.js"
const api_url = config.api_url



function FileForm(props) {
    const { resp, setResp } = useContext(ShirtContext)
    //const { setResp } = props; // this is used to set the App state when we get response
    //const { stylesList = ["starry Night", "escher"] } = props;
    const [validated, setValidated] = useState(false);
    const [hasError, setErrors] = useState(false);

    // when form is submitted
    function handleSubmit(event) {
        event.preventDefault(); // stop page from reloading
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        // get the form data so we can access it
        const formData = new FormData(event.target),
            formDataObj = Object.fromEntries(formData.entries());
        setValidated(true);
        // request an analysis from the API. 
        // provide the setter and the appropriate file
        requestFromApi(setResp, formDataObj["heart_file"])

    };

    return (
        <Jumbotron className="fluid  display-panel">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group id="fileInputGroup" controlId="inputForm.file" size="lg">
                    <Form.File id="inputFile" label="1. Upload Image" name="heart_file" />
                </Form.Group>
                <hr />
                <Button type="submit">2. Recieve Analysis</Button>
            </Form>

        </ Jumbotron>
    )
}

async function requestFromApi(setter, heart_file) {
    // make the request

    let form_data = new FormData();
    // config the headers and include the image
    let config = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }
    // send the file with the appropriate key name so it is parsed
    form_data.append('file', heart_file) //, image.name);

    axios.post(api_url + "analyze", form_data, config)
        .then(res => res.data)
        .then(res => setter({ contents: res })) // set {disp_str:"...", threat_level:"..."}
        .catch(err => console.log(err))
}

export default FileForm