declare module "react-native-responsive-grid" {
    import { Component } from "react";
    import { ViewProperties } from "react-native";

    export interface GridProps {

    }

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
        aspectRatio?: object
    }

    export interface RowProps {
        rtl?: boolean,
        noWrap?: boolean,
        hAlign?: 'space' | 'distribute' | 'center' | 'left' | 'right',
        vAlign?: 'stretch' | 'middle' | 'right' | 'left',
        alignSelf?: 'auto' | 'left' | 'right' | 'center' | 'stretch',
        fullHeight?: boolean,
        alignLines?: string,
        size?: number,
        sizePoints?: number
        smSizePoints?: number,
        mdSizePoints?: number,
        lgSizePoints?: number,
        xlSizePoints?: number
    }

    export type AspectRatio = '16:9' | '16:10' | '3:2' | '4:3' | '1:1' |'4:3' | '3:2' | '16:10' | '16:9'

    export class Row extends Component<ViewProperties & RowProps, any> { }
    export class Column extends Component<ViewProperties & ColumnProps, any> { }
    export class Grid extends Component<ViewProperties & GridProps, any> { }

    export interface ScreenParams {
        mediaSize: 'sm' | 'md' | 'lg' | 'xl',
        width: number,
        height: number,
        aspectRatio?: {
            currentNearestRatio: AspectRatio,
            currentOrientation: 'square' | 'landscape' | 'portrait'
        }
    }

    export function ScreenInfo(onlySize?: boolean): ScreenParams;
}