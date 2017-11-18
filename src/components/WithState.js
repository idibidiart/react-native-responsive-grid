import React from 'react';

export default class WithState extends React.Component {
    constructor(props) {
        super(props)
        this.state = props.state
        this.componentWillReceiveProps = props.componentWillReceiveProps && props.componentWillReceiveProps.bind(this)
        this.componentWillMount = props.componentWillMount && props.componentWillMount.bind(this)
        this.componentDidMount = props.componentDidMount && props.componentDidMount.bind(this) 
        this.componentWillUnmount = props.componentWillUnmount && props.componentWillUnmount.bind(this)
        this.componentWillUpdate = props.componentWillUpdate && props.componentWillUpdate.bind(this)
        this.componentDidUpdate = props.componentDidUpdate && props.componentDidUpdate.bind(this)
        this.componentDidCatch = props.componentDidCatch && props.componentDidCatch.bind(this)
        this.shouldComponentUpdate = props.shouldComponentUpdate && props.shouldComponentUpdate.bind(this)
    }

    render() {
        return this.props.children({
            setState: (...args) => this.setState.bind(this, ...args),
            ...this.state
        })
    }
}