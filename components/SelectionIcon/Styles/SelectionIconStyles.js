import { StyleSheet } from "react-native"

export default StyleSheet.create({
	crossIconContainer: {
		position: "absolute",
		top     : "50%",
		left    : "27%",
		right   : 0,
		bottom  : 0
	},
	first: {
		position       : "absolute",
		height         : 2,
		width          : 25,
		backgroundColor: "#fff",
		transform      : [{ rotate: "45deg" }]
	},
	second: {
		position       : "absolute",
		height         : 2,
		width          : 25,
		backgroundColor: "#fff",
		transform      : [{ rotate: "-45deg" }]
	},
	third: {
		position       : "absolute",
		height         : 2,
		width          : 10,
		backgroundColor: "#fff",
		transform      : [{ rotate: "-45deg" }]
	}
})
