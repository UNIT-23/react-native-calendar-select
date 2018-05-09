/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react"
import { Animated, View, Text, TouchableHighlight, Dimensions } from "react-native"
import PropTypes from "prop-types"
import Moment from "moment"
import { swipeable } from "react-native-gesture-recognizers"

import MonthList from "./MonthList"
import SwipeContainer from "./components/SwipeContainer/SwipeContainer"
import { darkenRgb, hexToRgb } from "./utils"

import styles from "./CalendarStyle"
import SelectionIcon from "./components/SelectionIcon/SelectionIcon"

const { height, width } = Dimensions.get("window")
const {
	directions: { SWIPE_UP, SWIPE_DOWN }
} = swipeable

class Calendar extends Component {
	constructor (props) {
		super(props)

		this.state = {
			selectionType: "manual"
		}

		this.modalAnimation = new Animated.Value(-height)
		this.botBarTopOffset = new Animated.Value(0)

		this.daysOfTheWeek = [7, 1, 2, 3, 4, 5, 6]
		this.weekDaysNames = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

		this._getDateRange = this._getDateRange.bind(this)
		this._onChoose = this._onChoose.bind(this)
		this._resetCalendar = this._resetCalendar.bind(this)
		this.close = this.close.bind(this)
		this.selection = this.selection.bind(this)
		this.cancel = this.cancel.bind(this)
		this.open = this.open.bind(this)
		this.clear = this.clear.bind(this)
		this.confirm = this.confirm.bind(this)
		this.handleBotBar = this.handleBotBar.bind(this)

		this.open()
	}

	componentWillMount () {
		const { i18n, dow } = this.props

		for (let i = 1; i < dow + 1; i++) {
			const last = this.daysOfTheWeek.shift()
			this.daysOfTheWeek = [...this.daysOfTheWeek, last]
		}

		Moment.updateLocale(i18n, {
			week: {
				// Monday is the first day of the week
				dow
			}
		})

		this._today = Moment()
		this._year = this._today.year()
		this._getDateRange()
	}

	componentWillReceiveProps (nextProps) {
		const { selectionType } = nextProps
		this._resetCalendar()

		this.setState({
			selectionType
		})
	}

	componentDidUpdate (nextProps, nextState) {
		const { startDate, endDate, selectionType } = this.state

		if (startDate && !endDate && selectionType === "week") {
			this._onChoose(startDate, "week")
		}
	}

	_resetCalendar () {
		const { startDate, endDate, format } = this.props
		const start = Moment(startDate, format)
		const end = Moment(endDate, format)
		const isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate
		const isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate
		this.setState({
			startDate: isStartValid ? start : null,
			endDate  : isEndValid ? end : null
		})
	}

	_getDateRange () {
		const { maxDate, minDate, format } = this.props
		let max = Moment(maxDate, format)
		let min = Moment(minDate, format)
		const maxValid = max.isValid()
		const minValid = min.isValid()
		if (!maxValid && !minValid) {
			max = Moment().add(3, "months")
			min = Moment()
		}
		if (!maxValid && minValid) {
			max = min.add(3, "months")
		}
		if (maxValid && !minValid) {
			min = max.subtract(3, "months")
		}
		if (min.isSameOrAfter(max)) {
			return {}
		}
		this._minDate = min
		this._maxDate = max
	}

	_onChoose (day, selectionType) {
		const { startDate, endDate } = this.state

		if (selectionType === "day") {
			if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
				this.setState({
					startDate: day,
					endDate  : day
				})

				this.confirm({ startDate: day, endDate: day })
			}
			return
		}

		if (selectionType === "week") {
			if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
				const startDay = day.clone().startOf("week")
				this.setState({
					startDate: startDay,
					endDate  : null
				})
			} else if (startDate && !endDate) {
				const endDay = day.clone().endOf("week")
				this.setState({
					endDate: endDay
				})
			}
			return
		}

		if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
			this.setState({
				startDate: day,
				endDate  : null
			})
		} else if (startDate && !endDate && day > startDate) {
			this.setState({
				endDate: day
			})
		}
	}

	radioBtnsStyle (_selectionType) {
		const {
			color: { borderColor }
		} = this.props
		const { selectionType } = this.state

		const selected = selectionType === _selectionType
		const btnColor = borderColor || "rgba(255, 255, 255, 0.5)"

		return {
			backgroundColor: selected ? btnColor : "transparent"
		}
	}

	cancel () {
		this.close()
		this._resetCalendar()
	}

	close () {
		Animated.timing(this.modalAnimation, {
			toValue        : -height,
			duration       : 300,
			useNativeDriver: true
		}).start()
	}

	selection (selectionType) {
		this.clear()

		this.setState({
			selectionType
		})
	}

	open () {
		Animated.spring(this.modalAnimation, {
			toValue        : 0,
			speed          : 40,
			bounciness     : 2,
			duration       : 150,
			useNativeDriver: true
		}).start()
	}

	clear () {
		this.setState({
			startDate: null,
			endDate  : null
		})
	}

	confirm (state) {
		let { startDate, endDate } = state // State is proxy coming from touchableOpacity
		startDate = startDate || this.state.startDate
		endDate = endDate || this.state.endDate

		const startMoment = startDate ? startDate.clone() : null
		const endMoment = endDate ? endDate.clone() : null
		this.props.onConfirm &&
			this.props.onConfirm({
				startDate: startMoment ? startMoment.toDate() : null,
				endDate  : endMoment ? endMoment.toDate() : null,
				startMoment,
				endMoment
			})
		this.close()
	}

	handleBotBar ({ direction }) {
		if (SWIPE_UP === direction) {
			Animated.spring(this.botBarTopOffset, {
				toValue        : 200,
				speed          : 40,
				bounciness     : 6,
				duration       : 150,
				useNativeDriver: true
			}).start()
		}

		if (SWIPE_DOWN === direction) {
			Animated.spring(this.botBarTopOffset, {
				toValue        : 0,
				speed          : 40,
				bounciness     : 6,
				duration       : 150,
				useNativeDriver: true
			}).start()
		}
	}

	render () {
		const { selectionType, startDate, endDate } = this.state
		const { eventsList } = this.props
		const {
			mainColor = "#15aaaa",
			selectionBtnColor = "#15aaaa",
			subColor = "#fff",
			borderColor = "#fff",
			topBarColor = darkenRgb(hexToRgb(mainColor), 0.2)
		} = this.props.color
		const color = { mainColor, subColor, borderColor }
		const subFontColor = { color: subColor }

		return (
			<Animated.View
				style={[
					styles.container,
					{
						backgroundColor: mainColor,
						transform      : [{ translateY: this.modalAnimation }]
					}
				]}
			>
				<View style={styles.subContainer}>
					<Animated.View
						style={[
							styles.topContents,
							{
								opacity: this.botBarTopOffset.interpolate({
									inputRange : [0, 200],
									outputRange: [1, 0.3]
								})
							}
						]}
					>
						<View
							style={[
								styles.ctrl,
								{
									backgroundColor: `rgb(${topBarColor})`
								}
							]}
						>
							<View style={styles.btn}>
								<View style={styles.radioBtns}>
									<TouchableHighlight
										style={[styles.selectionBtn, this.radioBtnsStyle("day")]}
										underlayColor={mainColor}
										onPress={() => this.selection("day")}
									>
										<Text style={[styles.clearText, subFontColor]}>Day</Text>
									</TouchableHighlight>
									<TouchableHighlight
										style={[styles.selectionBtn, this.radioBtnsStyle("week")]}
										underlayColor={mainColor}
										onPress={() => this.selection("week")}
									>
										<Text style={[styles.clearText, subFontColor]}>Week</Text>
									</TouchableHighlight>
									<TouchableHighlight
										style={[styles.selectionBtn, this.radioBtnsStyle("manual")]}
										underlayColor={mainColor}
										onPress={() => this.selection("manual")}
									>
										<Text style={[styles.clearText, subFontColor]}>Manual</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>
						<View
							style={[
								styles.week,
								{
									backgroundColor: `rgb(${topBarColor})`
								}
							]}
						>
							{this.daysOfTheWeek.map(dayNum => (
								<Text style={[styles.weekText, subFontColor]} key={dayNum}>
									{this.weekDaysNames[dayNum]}
								</Text>
							))}
						</View>
						<View style={[styles.scroll, { borderColor }]}>
							<MonthList
								today={this._today}
								minDate={this._minDate}
								maxDate={this._maxDate}
								startDate={this.state.startDate}
								endDate={this.state.endDate}
								onChoose={day => this._onChoose(day, selectionType)}
								i18n={this.props.i18n}
								color={color}
							/>
						</View>
					</Animated.View>
					<Animated.View
						style={[
							styles.bottomBarOuter,
							{
								transform: [
									{ translateX: -(width * 1.5) / 3 },
									{
										translateY: this.botBarTopOffset.interpolate({
											inputRange : [0, 100],
											outputRange: [height / 1.2, height / 1.8]
										})
									}
								]
							}
						]}
					>
						<TouchableHighlight
							underlayColor="rgba(255, 255, 255, 0.45)"
							style={[styles.confirmBtn, { backgroundColor: selectionBtnColor }]}
							onPress={this.confirm}
						>
							<SelectionIcon valid={!!startDate && !!endDate} />
						</TouchableHighlight>
						<View
							style={[
								styles.bottomBar,
								{
									backgroundColor: `rgb(${topBarColor})`,
									transform      : [{ rotate: "7deg" }]
								}
							]}
						>
							<View style={styles.bottomBarInner}>
								{!!eventsList && (
									<SwipeContainer
										style={{
											backgroundColor: "transparent",
											height         : height / 9,
											width          : width
										}}
										onSwipeBegin={this.handleBotBar}
									/>
								)}
								<View style={styles.eventsListContainer}>{eventsList}</View>
							</View>
						</View>
					</Animated.View>
				</View>
			</Animated.View>
		)
	}
}

Calendar.defaultProps = {
	format           : "YYYY-MM-DD",
	i18n             : "en",
	dow              : 1,
	customI18n       : {},
	color            : {},
	selectionType    : "manual",
	animationType    : "slide",
	disableEventsList: false
}

Calendar.propTypes = {
	i18n      : PropTypes.string,
	format    : PropTypes.string,
	customI18n: PropTypes.object,
	color     : PropTypes.shape({
		mainColor        : PropTypes.string,
		subColor         : PropTypes.string,
		borderColor      : PropTypes.string,
		topBarColor      : PropTypes.string,
		selectionBtnColor: PropTypes.string
	}),
	eventsList   : PropTypes.node,
	minDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	maxDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
	selectionType: PropTypes.oneOf(["manual", "week", "day"]),
	animationType: PropTypes.oneOf(["none", "slide", "fade"])
}

export default Calendar
