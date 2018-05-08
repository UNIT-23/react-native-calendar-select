import React, { Component } from "react"
import { View } from "react-native"
import { swipeable } from "react-native-gesture-recognizers"

import styles from "./Styles/SwipeContainerStyles.js"

class SwipeContainer extends Component {
	render () {
		const { style } = this.props
		return <View style={[styles.swipeContainer, style]} />
	}
}

export default swipeable({
	vertical                : true,
	continuous              : false,
	initialVelocityThreshold: 0.7
})(SwipeContainer)
