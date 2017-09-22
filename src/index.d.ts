declare module "react-native-responsive-grid" {
    import { Component } from "react";
    import { ViewProperties } from "react-native";

    export interface ColumnProps {
        size?: number,
        sizePoints?: number,
        offset?: number,
        offsetPoints?: number,
        smSize?: number,
        smSizePoints?: number,
        smOffset?: number,
        smOffsetPoints?: number,
        smHidden?: boolean,
        mdSize?: number,
        mdSizePoints?: number,
        mdOffset?: number,
        mdOffsetPoints?: number,
        mdHidden?: boolean,
        lgSize?: number,
        lgSizePoints?: number,
        lgOffset?: number,
        lgOffsetPoints?: number,
        lgHidden?: boolean,
        xlSize?: number,
        xlSizePoints?: number,
        xlOffset?: number,
        xlOffsetPoints?: number,
        xlHidden?: boolean,
        vAlign?: 'space' | 'distribute' | 'middle' | 'bottom' | 'top',
        hAlign?: 'stretch' | 'center' | 'right' | 'left',
        alignSelf?: 'auto' | 'top' | 'bottom' | 'middle' | 'stretch' | 'baseline',
        fullWidth?: boolean,
        aspectRatio?: object,
        layoutEvent?: string,
    }

    export interface RowProps {
        rtl?: boolean,
        noWrap?: boolean,
        hAlign?: 'space' | 'distribute' | 'center' | 'left' | 'right',
        vAlign?: 'stretch' | 'middle' | 'right' | 'left',
        alignSelf?: 'auto' | 'left' | 'right' | 'center' | 'stretch',
        fullHeight?: boolean,
        alignLines?: string,
        layoutEvent?: string
    }

    export class Row extends Component<ViewProperties & RowProps, any> { }
    export class Column extends Component<ViewProperties & ColumnProps, any> { }

    export interface ScreenParams {
        mediaSize: 'sm' | 'md' | 'lg' | 'xl',
        width: number,
        height: number,
        aspectRatio?: {
            currentNearestRatio: string,
            currentOrientation: 'square' | 'landscape' | 'portrait'
        }
    }

    export function ScreenInfo(onlySize?: boolean): ScreenParams;
}

