import { StyleSheet, Dimensions } from "react-native"
const { scale, width, height } = Dimensions.get("window")

let dayWidth = width / 7
const mod = (scale * width) % 7
if (mod) {
	dayWidth = ((7 - mod) / scale + width) / 7
}

let iconSize = 22
let resultFontSize = 24
let slashLength = 80
if (width < 350) {
	resultFontSize = 20
	iconSize = 20
	slashLength = 70
}

export default StyleSheet.create({
	container: {
		height  : "100%",
		position: "absolute",
		top     : 0,
		left    : 0,
		right   : 0
	},
	subContainer: {
		height  : "100%",
		position: "relative"
	},
	ctrl: {
		flex          : 0.5,
		justifyContent: "space-between",
		flexDirection : "row",
		alignItems    : "flex-end"
	},
	week: {
		flex          : 0.2,
		flexDirection : "row",
		justifyContent: "space-between",
		alignItems    : "flex-end",
		elevation     : 5
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
		borderColor   : "rgba(255, 255, 255, 0.5)"
	},
	confirmContainer: {
		flex           : 1,
		paddingVertical: 7,
		alignSelf      : "stretch",
		marginRight    : 5,
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
		color: "rgba(255, 255, 255, 0.40)"
	},
	closeIcon: {
		width : iconSize,
		height: iconSize
	},
	bottomBar: {
		height      : height / 4,
		position    : "absolute",
		bottom      : 0,
		right       : 0,
		left        : 0,
		elevation   : 5,
		shadowColor : "#000000",
		shadowOffset: {
			width : 0,
			height: -5
		},
		shadowRadius : 4,
		shadowOpacity: 0.3,
		zIndex       : 99
	}
})
