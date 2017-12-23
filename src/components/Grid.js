import React from 'react';
import PropTypes from 'prop-types';
import {View, InteractionManager} from 'react-native';
import {ScreenInfo} from '../lib/ScreenInfo';

export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...props.state, layout: {}}
        this.animFrame
    }

    static childContextTypes = {
        ____GRID____: PropTypes.bool
    }

    static contextTypes = {
        ____GRID____: PropTypes.bool
    }
     
    getChildContext() {
        return {
            ____GRID____: true
        }
    }

    componentWillUnmount = () => {
        cancelAnimationFrame(this.animFrame)
    }

    callback = (e) => {
        const layout = {
          screen: ScreenInfo(), 
          grid: e.nativeEvent.layout
        }
        this.setState((state) => {
            return {...state, layout}
        })
    }

    render() {
        if (this.context.____GRID____) {
            if (__DEV__) 
                console.error('Grid should bre used once as the root of the component tree. All others are nullified.')
            return null
        } 
        return (
            <View
                style={[
                    {
                        flex: 1
                    },
                    this.props.style
                ]}
                
                onLayout={(e) => {
                    e.persist()
                    InteractionManager.runAfterInteractions(() => {
                        this.animFrame = requestAnimationFrame(() => {
                        this.callback(e)
                        })
                    })
                }}
            >
                {this.props.children({
                    state: this.state,
                    setState: (...args) => this.setState(...args),
                })}
            </View>)
    }
}