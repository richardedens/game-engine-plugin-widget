import React, { Component, ReactNode, createElement, CSSProperties } from "react";
import GameCore from "./GameCore";
import GameErrorMessage from "./GameErrorMessage";
import Log from "./GameLog";

const log = new Log();

// Can only load this the old fashion way.
// @ts-ignore -- sorry also need to ignore this one.
const safeEval = require('safe-eval');

/**
 * Export what is needed.
 */
export interface GameEngineProps {
    className?: string;
    style?: CSSProperties;
    tabIndex?: number;
    jssrc?: string;
}

export class GameEngine extends Component<GameEngineProps> {
    private gameCore: React.RefObject<GameCore>;

    private jsSourceValue: string;

    constructor(props: any) {
        super(props);
        this.gameCore = React.createRef();
        this.jsSourceValue = "";
    }

    executeJS() {
        if (typeof this.props.jssrc !== "undefined") {
            log.info("Evaluating the following JavaScript");
            log.info(this.jsSourceValue);
            try {
                log.info("try the JavaScript -- gameCore should be available.");
                if (typeof this.gameCore !== "undefined" && this.gameCore !== null && typeof this.gameCore.current !== "undefined" && this.gameCore.current !== null) {
                    log.info("eval the JavaScript");
                    safeEval(this.props.jssrc + "\r\n//# sourceURL=GameCore.tsx", { gameEngine: this.gameCore.current });
                };
            } catch (e) {
                log.error(e);
            }
        }

    }

    componentDidUpdate() {
        log.info("game engine updated.");
        this.executeJS();
    }

    componentDidMount() {
        log.info("game engine mounted.");
    }

    render(): ReactNode {
        return <div className="game-container"><GameCore ref={this.gameCore} /><GameErrorMessage /></div>;
    }
}
