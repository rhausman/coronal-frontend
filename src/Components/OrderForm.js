import React, { useState, useContext } from "react"
import { Form, Jumbotron, Button } from "react-bootstrap"
import ShirtContext from "./ShirtContext"
//project-level imports
//import AddressForm from "./AddressForm"
import axios from "axios"; //for http requests
import "./../Styles/DisplayStyles.css"

const auth_token = "test_zIGWgWXzQ2HnfT46wYXPCA"

function OrderForm() {
    const { resp, setResp } = useContext(ShirtContext) // resp["img"] is the image, resp["url"] is a base64 representation
    const [hasError, setErrors] = useState(false);
    const [validated, setValidated] = useState(false);

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

        requestFromApi(formDataObj)

    };


    return (
        <Jumbotron noValidate validated={validated} className="display-panel">
            <h2>5. Order</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group id="addressGroup">
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Name" />
                    <Form.Control type="text" name="address1" placeholder="Address - line 1" />
                    <Form.Control type="text" name="address2" placeholder="Address - line 2" />
                    <Form.Control type="text" name="city" placeholder="City" default="New York" />
                    <Form.Control type="text" name="state" placeholder="State - two letter code" />
                    <Form.Control type="text" name="zip" placeholder="5-digit Zip Code" />
                </Form.Group>
                <Form.Group id="sizeGroup">
                    <Form.Label>Select a Size</Form.Label>
                    <Form.Control as="select" size="lg" name="size">
                        <option>sml</option>
                        <option>med</option>
                        <option>lrg</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Place Order</Button>
            </Form>
        </Jumbotron>
    )
}

function requestFromApi(formData) {
    let request_form_data = new FormData()
    let config = {
        headers: {
            'content-type': "multipart/form-data",
        },
        auth: {
            password: auth_token
        }
    }
    let sides_obj = {
        front: 1, //print on front
        back: 0,
        left: 0,
        right: 0,
    }
    let order_product_obj_arr = [{ // TODO allow to change fields
        id: "gildan-ultra-cotton-tall-t",
        color: "white",
        size: formData["size"],
        quantity: 1,
    }]
    let address_obj = {
        name: formData["name"],
        address1: formData["address1"],
        address2: formData["address2"],
        city: formData["city"],
        state: formData["state"],
        zip: formData["zip"],
        //country: assume US
    };

    let quote_obj = {
        type: "dtg", // dtg print type
        sides: sides_obj,
        products: order_product_obj_arr,
        address: address_obj,
        //features: {}, 
        //name: "",
    }
    request_form_data.append("quote_object", quote_obj);
    //quote_obj.map((k, v) => request_form_data.append(k, v))
    //console.log("request: ")
    //console.log(request_form_data)
    axios.post(
        "https://cors-anywhere.herokuapp.com/https://api.scalablepress.com/v2/quote",
        request_form_data,
        config)
        .then(res => res.total)
        .then(res => console.log(res))
        .catch(err => console.log(err))

}

export default OrderForm