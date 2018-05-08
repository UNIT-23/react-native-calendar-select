/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react"
import { Animated, View, Text, Image, TouchableHighlight, Dimensions, ListView } from "react-native"
import PropTypes from "prop-types"
import Moment from "moment"
import { swipeable } from "react-native-gesture-recognizers"

import MonthList from "./MonthList"
import SwipeContainer from "./components/SwipeContainer/SwipeContainer"
import { darkenRgb, hexToRgb } from "./utils"

import styles from "./CalendarStyle"

const { height, width } = Dimensions.get("window")
const {
	directions: { SWIPE_UP, SWIPE_DOWN }
} = swipeable

const ICON = {
	close:
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADGklEQVR4Xu3b3XXTMBTAcV1Leu8I3YAyAWECygSlE9BOQJmAdAK6QWGCphNQNmAE+mzZl6Mc5xzXtiLJ1r0STfLqJM3/Z9muPwTiwF9w4P3iCHAcAQ4BRDxt2/aDEOKkqqqfAPD0P2EZYy6EEJ/sbwaATVVVtwDwd9gwuQkYY+wHv9n43QcQca21vi4dARFPmqa5F0Ks+r8VEZ+UUu+HCCMAu+abpvnVj+990Z1S6rJUBBtvjHkAgLOp34iIX7XWN/1lI4Cmaa4Q0a5916tIBF+8jUHER631i5ExAqjr+gYAvnjWclEIIfHBAIh41m0CvpFeBEJofBdzqZS627sJ2IV1Xa8B4LNPQAiRFSEmfmr4b48QrkhjjJWyhxLfKwtCZPxvpdQq+DC4Ky4VIVX83hFQKkLK+CAA+6ZSRkLq+GCAEhAo4qMAciJQxUcD5ECgjJ8FwIlAHT8bgAOBI34RACUCV/xiAAoEzvgkACkRuOOTAaRAyBGfFGAJQq745ABzEHLGkwDEItgLMK5reP3zcER0ntL6ztf3LSe7MRJxAuX9/VTxZCNgxqm0E4EynhwgcnMYIVDHswDMReCIZwOIReCKZwOIOdR12wHbhVayo8Bug54Rv/soCwIpwIJ4NgQygATxLAgkAAnjyRGSA8TE27199+BFtjtQSQFi43e3qyL+bU6+Y0wGMDd+xr/NSRGSACyNz4mwGCBVfC6ERQCp43MgzAagiudGmAVAHc+JEA3AFc+FEAXAHc+BEAyQK54aIQggdzwlgheglHgqhL0ApcVTIDgBSo1PjTAJUHp8SgTXfIGH4fP2U3cuOK/euu6chJ5KI+Kt1vpq+D0jgG6yxHfnrZpuQQnxsSNBSvl2OPNl6nH5DQC82wdQUnwMAgBcSynX/bZogBLjIxA+KqV++ACcEyZKjg9AeJZSnobMGbLzbuxm8KYvZZ+3V0qdTz1y7ttfcC+fmO/wjIjnWuuNdydo39AdBu0eczu/BgDsdbgXMy24o2L/nn3wom3bFSL+kVLaFTqaMrdti/3i1/b+I8BrW6OxPQc/Av4BDSZYbnPWwJkAAAAASUVORK5CYII="
}

export default class Calendar extends Component {
	static propTypes = {
		i18n      : PropTypes.string,
		format    : PropTypes.string,
		customI18n: PropTypes.object,
		color     : PropTypes.shape({
			mainColor  : PropTypes.string,
			subColor   : PropTypes.string,
			borderColor: PropTypes.string
		}),
		minDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		maxDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		selectionType: PropTypes.oneOf(["manual", "week", "day"]),
		animationType: PropTypes.oneOf(["none", "slide", "fade"])
	}
	static defaultProps = {
		format       : "YYYY-MM-DD",
		i18n         : "en",
		dow          : 1,
		customI18n   : {},
		color        : {},
		selectionType: "manual",
		animationType: "slide"
	}
	static I18N_MAP = {
		zh: {
			w      : ["", "一", "二", "三", "四", "五", "六", "日"],
			weekday: ["", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
			text   : {
				start: "开 始",
				apply: "开 始",
				end  : "结 束",
				date : "日 期",
				save : "保 存",
				clear: "清除"
			},
			date: "M月D日"
		},
		en: {
			w      : ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			weekday: [
				"",
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday",
				"Sunday"
			],
			text: {
				start: "Start",
				apply: "Apply",
				end  : "End",
				date : "Date",
				save : "Save",
				clear: "Reset"
			},
			date: "DD / MM"
		},
		jp: {
			w      : ["", "月", "火", "水", "木", "金", "土", "日"],
			weekday: ["", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
			text   : {
				start: "スタート",
				apply: "スタート",
				end  : "エンド",
				date : "時　間",
				save : "確　認",
				clear: "クリア"
			},
			date: "M月D日"
		}
	}

	constructor (props) {
		super(props)
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
			dataSource: this.ds.cloneWithRows([
				{ key: 1, text: "Item 1" },
				{ key: 2, text: "Item 2" },
				{ key: 3, text: "Item 3" },
				{ key: 4, text: "Item 4" },
				{ key: 5, text: "Item 5" },
				{ key: 6, text: "Item 6" }
			]),
			scrollY      : new Animated.Value(0),
			selectionType: "manual"
		}

		this.modalAnimation = new Animated.Value(-height)
		this.botBarTopOffset = new Animated.Value(0)

		this.daysOfTheWeek = [7, 1, 2, 3, 4, 5, 6]

		this._i18n = this._i18n.bind(this)
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

	_i18n (data, type) {
		const { i18n, customI18n } = this.props
		if (~["w", "weekday", "text"].indexOf(type)) {
			return (customI18n[type] || {})[data] || Calendar.I18N_MAP[i18n][type][data]
		}
		if (type === "date") {
			return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type])
		}
	}

	_resetCalendar () {
		const { startDate, endDate, format } = this.props
		const start = Moment(startDate, format)
		const end = Moment(endDate, format)
		const isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate
		const isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate
		this.setState({
			startDate       : isStartValid ? start : null,
			startDateText   : isStartValid ? this._i18n(start, "date") : "",
			startWeekdayText: isStartValid ? this._i18n(start.weekday(), "weekday") : "",
			endDate         : isEndValid ? end : null,
			endDateText     : isEndValid ? this._i18n(end, "date") : "",
			endWeekdayText  : isEndValid ? this._i18n(end.weekday(), "weekday") : ""
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
					startDate       : day,
					endDate         : day,
					startDateText   : this._i18n(day, "date"),
					startWeekdayText: this._i18n(day.weekday(), "weekday"),
					endDateText     : this._i18n(day, "date"),
					endWeekdayText  : this._i18n(day.weekday(), "weekday")
				})

				this.confirm({ startDate: day, endDate: day })
			}
			return
		}

		if (selectionType === "week") {
			if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
				const startDay = day.clone().startOf("week")
				this.setState({
					startDate       : startDay,
					endDate         : null,
					startDateText   : this._i18n(startDay, "date"),
					startWeekdayText: this._i18n(startDay.weekday(), "weekday"),
					endDateText     : "",
					endWeekdayText  : ""
				})
			} else if (startDate && !endDate) {
				const endDay = day.clone().endOf("week")
				this.setState({
					endDate       : endDay,
					endDateText   : this._i18n(endDay, "date"),
					endWeekdayText: this._i18n(endDay.weekday(), "weekday")
				})
			}
			return
		}

		if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
			this.setState({
				startDate       : day,
				endDate         : null,
				startDateText   : this._i18n(day, "date"),
				startWeekdayText: this._i18n(day.weekday(), "weekday"),
				endDateText     : "",
				endWeekdayText  : ""
			})
		} else if (startDate && !endDate && day > startDate) {
			this.setState({
				endDate       : day,
				endDateText   : this._i18n(day, "date"),
				endWeekdayText: this._i18n(day.weekday(), "weekday")
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
			duration       : 350,
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
		Animated.timing(this.modalAnimation, {
			toValue        : 0,
			duration       : 350,
			useNativeDriver: true
		}).start()
	}

	clear () {
		this.setState({
			startDate       : null,
			endDate         : null,
			startDateText   : "",
			startWeekdayText: "",
			endDateText     : "",
			endWeekdayText  : ""
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
			Animated.timing(this.botBarTopOffset, {
				toValue        : 200,
				duration       : 350,
				useNativeDriver: true
			}).start()
		}

		if (SWIPE_DOWN === direction) {
			Animated.timing(this.botBarTopOffset, {
				toValue        : 0,
				duration       : 350,
				useNativeDriver: true
			}).start()
		}
	}

	render () {
		const { selectionType, dataSource } = this.state
		const {
			mainColor = "#15aaaa",
			selectionBtnColor = "#15aaaa",
			subColor = "#fff",
			borderColor = "rgba(255, 255, 255, 0.50)",
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
							{this.daysOfTheWeek.map(item => (
								<Text style={[styles.weekText, subFontColor]} key={item}>
									{this._i18n(item, "w")}
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
							testID="applyBtn"
							underlayColor="rgba(255, 255, 255, 0.45)"
							style={[styles.confirmBtn, { backgroundColor: selectionBtnColor }]}
							onPress={this.confirm}
						>
							<Image
								style={styles.closeIcon}
								source={{ uri: ICON.close }}
								resizeMode="cover"
							/>
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
								<SwipeContainer
									style={{
										backgroundColor: "transparent",
										height         : height / 9,
										width          : width
									}}
									onSwipeBegin={this.handleBotBar}
								/>
								<View style={styles.eventsListContainer}>
									<ListView
										dataSource={dataSource}
										renderRow={row => (
											<View style={{ height: 100 }}>
												<Text>{row.text}</Text>
											</View>
										)}
										renderHeader={() => <View />}
										showsVerticalScrollIndicator={false}
										renderScrollComponent={props => (
											<Animated.ScrollView
												{...props}
												scrollEventThrottle={16}
											/>
										)}
									/>
								</View>
							</View>
						</View>
					</Animated.View>
				</View>
			</Animated.View>
		)
	}
}
