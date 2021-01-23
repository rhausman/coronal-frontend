import React, { useContext, StyleSheet } from "react";
import { Jumbotron } from "react-bootstrap"
import ShirtContext from "./ShirtContext"
//import { PhotoContainer } from "./ComponentIndex"
import "./../Styles/OverlapStyles.css" //to overlap shirts
import "./../Styles/DisplayStyles.css" //general display styles

function get_color(threat_level) {
    const color_map = { "unknown": "grey", "low": "green", "medium": "orange", "high": "red" }
    if (threat_level in color_map) return color_map[threat_level]
    return "grey"
}

function ShirtDisplay(props) {
    //const { context } = props;
    const { resp, setResp } = useContext(ShirtContext)
    const { disp_str, threat_level } = resp.contents

    return (
        <Jumbotron className="display-panel">
            3. Results
            <p>{disp_str}</p>
            <hr />
            <p className="warning">Threat Level</p>
            <p style={{ color: get_color(threat_level) }}>{threat_level}</p>





        </Jumbotron>
    )
}

/*<div className="container" >
<img className="img" src={resp.url} alt="none" />
</div>
*/




//<PhotoContainer file={resp.data} />
export default ShirtDisplay