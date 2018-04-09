import React from 'react';
import PropTypes from 'prop-types';
import {View, InteractionManager} from 'react-native';
import {ScreenInfo} from '../lib/ScreenInfo';

export default class Grid extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...props.state, layout: {}}
        this.animFrame
        this.unmounting = false
    }

    componentWillUnmount = () => {
        this.unmounting = true
        cancelAnimationFrame(this.animFrame)
    }

    callback = (e) => {

        if (this.unmounting) return

        const layout = {
          screen: ScreenInfo(), 
          grid: e.nativeEvent.layout
        }
        this.setState((state) => {
            return this.unmounting ? null : {...state, layout}
        })
    }

    render() {
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
                        cancelAnimationFrame(this.animFrame)
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