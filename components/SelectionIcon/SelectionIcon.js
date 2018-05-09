import React, { Component } from "react"
import { Animated, View } from "react-native"

import PropTypes from "prop-types"

import styles from "./Styles/SelectionIconStyles.js"

class SelectionIcon extends Component {
	constructor (props) {
		super(props)

		this.crossIconAngle = new Animated.Value(0)
	}
	componentWillReceiveProps (nextProps) {
		const { valid } = nextProps

		if (valid) {
			Animated.spring(this.crossIconAngle, {
				toValue : 1,
				duration: 3000
			}).start()
		} else {
			Animated.spring(this.crossIconAngle, {
				toValue : 0,
				duration: 3000
			}).start()
		}
	}

	setNativeProps (nativeProps) {
		this.crossIconRef.setNativeProps(nativeProps)
	}

	render () {
		return (
			<View ref={ref => (this.crossIconRef = ref)} style={styles.crossIconContainer}>
				<Animated.View
					style={[
						styles.first,
						{
							transform: [
								{
									rotate: this.crossIconAngle.interpolate({
										inputRange : [0, 1],
										outputRange: ["45deg", "-45deg"]
									})
								}
							]
						}
					]}
				/>
				<Animated.View style={styles.second} />
				<Animated.View
					style={[
						styles.third,
						{
							top: this.crossIconAngle.interpolate({
								inputRange : [0, 1],
								outputRange: [0, 4]
							}),
							left: this.crossIconAngle.interpolate({
								inputRange : [0, 1],
								outputRange: [7, -5]
							}),
							transform: [
								{
									rotate: this.crossIconAngle.interpolate({
										inputRange : [0, 1],
										outputRange: ["-45deg", "45deg"]
									})
								}
							]
						}
					]}
				/>
			</View>
		)
	}
}

SelectionIcon.defaultProps = {
	valid: false
}

SelectionIcon.propTypes = {
	valid: PropTypes.bool
}

export default SelectionIcon
