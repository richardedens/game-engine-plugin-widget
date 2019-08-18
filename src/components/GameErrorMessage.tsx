import React, { createElement } from "react";
import Log from "./GameLog";

const log = new Log();

// Graphic 3D layer
export default class GameErrorMessage extends React.Component {
    componentDidMount() {
        log.info("game error message mounted.");
    }
    render() {
        return <div></div>
    }
}