/**
 * This file was generated from Snesemulator.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";
import { EditableValue } from "mendix";

interface CommonProps {
    id: string;
    class: string;
    style?: CSSProperties;
    tabIndex: number;
}

export interface SnesemulatorContainerProps extends CommonProps {
    jssrc: EditableValue<string>;
}

export interface SnesemulatorPreviewProps extends CommonProps {
    jssrc: string;
}

export interface VisibilityMap {
    jssrc: boolean;
}
