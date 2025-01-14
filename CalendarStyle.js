import { StyleSheet, Dimensions } from "react-native"
const { scale, width } = Dimensions.get("window")
let iconSize = 22
let resultFontSize = 24
let weekTextFontSize = 16
let slashLength = 80
if (width < 350) {
	resultFontSize = 20
	weekTextFontSize = 14
	iconSize = 20
	slashLength = 70
}

export default StyleSheet.create({
	container: {
		flex: 1
	},
	ctrl: {
		flex             : 1.5,
		justifyContent   : "space-between",
		flexDirection    : "row",
		alignItems       : "flex-end",
		paddingHorizontal: 15
	},
	result: {
		flex             : 2.5,
		paddingHorizontal: 15,
		flexDirection    : "row",
		alignItems       : "center",
		justifyContent   : "space-between"
	},
	resultSlash: {
		width    : slashLength,
		height   : 1 / scale,
		transform: [
			{
				rotateZ: "-45deg"
			}
		]
	},
	resultPart: {
		flex: 1
	},
	resultText: {
		fontSize      : resultFontSize,
		marginVertical: 4,
		color: '#252631'
	},
	clearText: {
		fontSize  : 18,
		textAlign : "center",
		fontWeight: "400"
	},
	startText: {
		textAlign: "left"
	},
	endText: {
		textAlign: "right"
	},
	week: {
		flex          : 1,
		flexDirection : "row",
		justifyContent: "space-between",
		alignItems    : "center",
		backgroundColor: '#F8FAFB'
	},
	weekText: {
		flex     : 1,
		fontSize : weekTextFontSize,
		textAlign: "center",
		color: '#252631'
	},
	scroll: {
		flex             : 9
	},
	scrollArea: {
		flex: 1
	},
	btn: {
		flex          : 1.5,
		flexDirection : "row",
		justifyContent: "center",
		alignItems    : "center"
	},
	radioBtns: {
		flex          : 4,
		flexDirection : "row",
		justifyContent: "flex-end",
		paddingLeft   : 9
	},
	tabBarBtn: {
		flex           : 1,
		paddingVertical: 7,
		alignSelf      : "stretch",

		marginRight    : 5,
		borderRadius   : 5,
		borderWidth    : 1,
		borderColor    : "#1DB954"
	},
	tabBarBtnText: {
		color: '#252631',
		fontSize  : 18,
		textAlign : "center"
	},
	tabBarSelectedBtn:{

	},
	tabBarSelectedBtnText:{
		color: '#1DB954',
	},
	confirmContainer: {
		flex           : 1,
		overflow       : "hidden",
		backgroundColor: "rgba(255, 255, 255, 0.40)",
		margin         : 14,
		alignSelf      : "stretch",
		justifyContent : "center",
		borderRadius   : 5,
		borderWidth    : 1,
		borderColor    : "rgba(255, 255, 255, 0.5)"
	},
	confirmContainerDisabled: {
		backgroundColor: "rgba(255, 255, 255, 0.20)"
	},
	confirmText: {
		fontSize  : 16,
		fontWeight: "bold",
		textAlign : "center"
	},
	confirmTextDisabled: {
		color: "#98A9BC"
	},
	closeIcon: {
		width : iconSize,
		height: iconSize
	}
})
