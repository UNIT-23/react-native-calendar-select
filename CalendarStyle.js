import { StyleSheet, Dimensions } from "react-native"
const { scale, width, height } = Dimensions.get("window")

let dayWidth = width / 7
const mod = (scale * width) % 7
if (mod) {
	dayWidth = ((7 - mod) / scale + width) / 7
}

let iconSize = 22
if (width < 350) {
	iconSize = 20
}

export default StyleSheet.create({
	container: {
		height  : "100%",
		position: "absolute",
		top     : 0,
		left    : 0,
		right   : 0,
		overflow: "hidden"
	},
	subContainer: {
		height  : "100%",
		position: "relative"
	},
	topContents: {
		height: "100%"
	},
	ctrl: {
		flex          : 0.5,
		justifyContent: "space-between",
		flexDirection : "row",
		alignItems    : "flex-end",
		elevation     : 5
	},
	week: {
		flex          : 0.2,
		flexDirection : "row",
		justifyContent: "space-between",
		alignItems    : "flex-end",
		elevation     : 5,
		shadowColor   : "#000000",
		shadowOffset  : {
			width : 0,
			height: 7
		},
		shadowRadius : 4,
		shadowOpacity: 0.3,
		zIndex       : 99
	},
	weekText: {
		flex         : 1,
		fontSize     : 12,
		textAlign    : "center",
		paddingBottom: 5
	},
	scroll: {
		height           : "70%",
		borderTopWidth   : 0,
		borderBottomWidth: 0
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
		justifyContent: "flex-end"
	},
	selectionBtn: {
		width         : dayWidth,
		height        : dayWidth,
		borderRadius  : dayWidth / 2,
		borderWidth   : StyleSheet.hairlineWidth,
		marginRight   : 10,
		justifyContent: "center",
		alignItems    : "center",
		borderColor   : "#fff"
	},
	closeIcon: {
		width : iconSize,
		height: iconSize
	},
	bottomBarOuter: {
		height  : height,
		width   : width * 2,
		position: "absolute",
		bottom  : 0,
		right   : 0,
		left    : 0
	},
	bottomBar: {
		height      : height,
		width       : width * 2,
		top         : dayWidth / 2,
		right       : 0,
		left        : 0,
		elevation   : 100,
		shadowColor : "#000000",
		shadowOffset: {
			width : 0,
			height: -5
		},
		shadowRadius : 4,
		shadowOpacity: 0.3,
		zIndex       : 10
	},
	bottomBarInner: {
		top      : -dayWidth / 2.2,
		height   : "100%",
		width    : width,
		transform: [{ translateX: width / 2.06 }, { rotate: "-7deg" }]
	},
	confirmBtn: {
		position      : "absolute",
		top           : dayWidth / 4,
		left          : width * 1.34,
		width         : dayWidth,
		height        : dayWidth,
		borderRadius  : dayWidth / 2,
		borderWidth   : StyleSheet.hairlineWidth,
		justifyContent: "center",
		alignItems    : "center",
		borderColor   : "#fff",
		elevation     : 101,
		zIndex        : 100,
		shadowColor   : "#000000",
		shadowOffset  : {
			width : 0,
			height: 0
		},
		shadowRadius : 4,
		shadowOpacity: 0.3
	},
	eventsListContainer: {
		position        : "absolute",
		width           : width,
		height          : height / 1.5,
		marginTop       : dayWidth * 1.2,
		marginHorizontal: 5
	},
	text: {
		color: "#fff"
	}
})
