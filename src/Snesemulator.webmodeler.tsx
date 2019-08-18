import { Component, ReactNode, createElement } from "react";
import { GameEngine } from "./components/GameEngine";
import { SnesemulatorPreviewProps } from "../typings/SnesemulatorProps";

declare function require(name: string): string;

export class preview extends Component<SnesemulatorPreviewProps> {
    render(): ReactNode {
        const value = this.props.jssrc || "";
        return <GameEngine
            jssrc={value}
            style={this.props.style}
            className={this.props.class}
            tabIndex={this.props.tabIndex} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Snesemulator.css");
}
