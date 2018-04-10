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

        // callback to runAfterInteractions is async
        // so onLayout might be triggered before component is unmounted
        // and it mifht schedule rAF after component is unmounted 
        // so cAF in componentWillUnmount would then miss that rFA
        if (this.unmounting) return

        const layout = {
          screen: ScreenInfo(), 
          grid: e.nativeEvent.layout
        }
        this.setState((state) => {
            return {...state, layout}
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
                        // avoid queuing up rAF tasks
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