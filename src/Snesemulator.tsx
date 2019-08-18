import { Component, ReactNode, createElement } from "react";
import { GameEngine } from "./components/GameEngine";
import { hot } from "react-hot-loader/root";
import { SnesemulatorContainerProps } from "../typings/SnesemulatorProps";

import "./ui/Snesemulator.css";

class Snesemulator extends Component<SnesemulatorContainerProps> {
    render(): ReactNode { 
        const value = this.props.jssrc.value || "";
        return <GameEngine
            jssrc={value}
            style={this.props.style}
            className={this.props.class}
            tabIndex={this.props.tabIndex}
        />;
    }
}

export default hot(Snesemulator);
