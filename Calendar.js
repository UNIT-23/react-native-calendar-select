/**
 * Created by TinySymphony on 2017-05-08.
 */

import React, { Component } from "react"
import PropTypes from "prop-types"

import { View, Text, Modal, Image, TouchableHighlight } from "react-native"
import Moment from "moment"
import styles from "./CalendarStyle"
import MonthList from "./MonthList"
const ICON = {
	close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAEAklEQVRIicWXT4gUVxDGf98yh2FYZAmyiIccZJFFgoclufcGMT0i9EREBA+5heQSDyEsIssii4dFQsA/l5CLhEAQWWwQtxNIpq+BEHIIIiI55CCLiIgMwyDil0P362lnekwuMe/4pqp+r75XVa9HxrzpNffGiUCraTPd6bcQi7b2Sgxs/9Xrrr74p2Bpls8Be4F9hoHgYRJHo0m7qUzTLG+B3jHakvgJ+1tJ75cB/2F5CXMR6IOvY46mO3ln0kr1Oy2AHLY5J3EcaAPYvivpLPBzEkcvm7PsHwBdBE4XMYXsX5G2sO8k3dXhVKa3dvI542Xsc8gVsFyHgC0gbso43ekvgTYCUAgBiBVgDelImuVVvCqA5AWhMxbHhdpBAWMkYfuw7Q3D8To4zfKDSBu2T9kF0A7qaQ7zrs0XtvcHn1ohqQMsCbWLQxbOBbCyXRGcL2G3gSVgHTghqR1gkoojl/6CQ6D5BiiPbX4QPoK0UAHLTCkO0QKv2JwHHZB4D+jZ7kgKigQQSEVkexu0OyVvEkcjxE2kLeCZSoeQcZGFAFqSVoQ3sU9SAids6ut7pEvA40rTyYmUZnnH+BNgTWixPGm4eKjsx1lN2RiQR1g3EBeSOPqzzpiqxCSOhkJfY74CHhq/NMUdjTN5FWgXNRtKD3kIuonYnAQ2QkvwQOgq5ppgVzDOKARmDESg8d0PbbaxN5M4etAUf+aUSbrRwOKyzRXEkyozF0pKxhTA4gwCeA7cAm0m3dX7s2K/drT14mgg6UdgECq56lsoh4BAQXqeA79IbszwX0HTLF8GPgcWQ+OrLCahqqbCvnEbfAZ07HWzeuYPadZfBtbBPZt2vS2qehfAeE+oZbMCXgeOpVm/MX7jZprlB7HOAz2bzis1pLJ3a61TDYNitUArttexjjZlPNWnt7L8gGADOMX4lakBGgfAhA0AL7B/N6xJyuuvUwVNs3zO9pKkC8Dp2Y1vkEa2HyHmMW8p7Aeb8hCl/13grE3e60YvoCavYY/ER5PAsl5rja8heFvSh8AlSQ+BVwZI6F0MxoeADYm3A2v8tNnzoIOlQpVcKuUqJ/GQ0Idx9BvmKuYasFtUdEhW4/lR9PWyoTMFRXoK9IHdcWtUKmBpVADZTOLoHkCvuzoAXwZfAT1yODBjpSSNJN8RPJmCJnE0AG8bvgHvhnspVUBw03AhACu/7uoAuCqxhfRMFri6mhFwG/RloUZQdbJ6d/L9iE8FHwOL5fYN4FzT8K78sn5H6DNgDVgASiAXgT+SOKq+JqegAGmW7wOfAK0C98HXk3j2LK2BF0AnhT/AemDxneBeHTgTWoLnDXsEQ+DZrK/AKfBO3pbYiz1EetrkNxP6X67/5W/F3zVbIFz7WMkJAAAAAElFTkSuQmCC"
}
export default class Calendar extends Component {
	static propTypes = {
		i18n      : PropTypes.string,
		format    : PropTypes.string,
		customI18n: PropTypes.object,
		styles: PropTypes.shape({
			tabBarContainer: PropTypes.object,
			tabBarSelectedBtn: PropTypes.object,
			tabBarSelectedBtnText: PropTypes.object,
			tabBarBtn: PropTypes.object,
			tabBarBtnText: PropTypes.object,
			selectedMidDays: PropTypes.object,
  			selectedMidDaysText: PropTypes.object,
  			selectedDay:PropTypes.object,
  			selectedDayText: PropTypes.object,
			dayText: PropTypes.object,
			week: PropTypes.object,
			weekText: PropTypes.object,
			monthTitle: PropTypes.object,
  			monthTitleText: PropTypes.object,
			dateHeadingText: PropTypes.object
		}),
		dow          : PropTypes.number,
		minDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		maxDate      : PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
		selectionType: PropTypes.oneOf(["manual", "week", "day"]),
		animationType: PropTypes.oneOf(["none", "slide", "fade"]),
		underlayColor: PropTypes.string
	}
	
	static defaultProps = {
		format       : "YYYY-MM-DD",
		i18n         : "en",
		dow          : 1,
		customI18n   : {},
		selectionType: "manual",
		animationType: "slide",
		styles: {
			tabBarContainer: {},
			tabBarSelectedBtn: {},
			tabBarSelectedBtnText: {},
			tabBarBtn: {},
			tabBarBtnText: {},
			selectedMidDays: {},
  			selectedMidDaysText: {},
  			selectedDay: {},
  			selectedDayText: {},
			dayText: {},
			week: {},
			weekText: {},
			monthTitle: {},
			monthTitleText: {},
			dateHeadingText: {}
		},
		underlayColor: "#f2fdf6"
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
			w      : ["", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"],
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
		this.state = {
			isModalVisible: false,
			selectionType : "manual",
			daysOfTheWeek:[7, 1, 2, 3, 4, 5, 6]
		}

		this.daysOfTheWeekDefault = [7, 1, 2, 3, 4, 5, 6]

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
		this.updateRange = this.updateRange.bind(this)
	}

	UNSAFE_componentWillMount () {
		this.updateRange()
	}

	UNSAFE_componentWillReceiveProps (nextProps) {
		const { selectionType,dow } = nextProps
		if(this.props.dow !== dow)
		{
			this.updateRange(nextProps)
		}
		this._resetCalendar(nextProps)

		this.setState({
			selectionType
		})
	}

	updateRange(nextProps = null){
		const { i18n, dow } = nextProps !== null ? nextProps : this.props
		let daysOfTheWeek = JSON.parse(JSON.stringify(this.daysOfTheWeekDefault))
		for (let i = 1; i < dow + 1; i++) {
			const last = daysOfTheWeek.shift()
			daysOfTheWeek = [...daysOfTheWeek, last]
		}

		Moment.updateLocale(i18n, {
			week: {
				// Monday is the first day of the week
				dow
			}
		})
		this._today = Moment()
		this._year = this._today.year()
		this._getDateRange(nextProps)
		this.setState({
			daysOfTheWeek:daysOfTheWeek
		})
	}
	

	componentDidUpdate (nextProps, nextState) {
		const { startDate, endDate, selectionType } = this.state

		if (startDate && !endDate && selectionType === "week") {
			this._onChoose(startDate, "week")
		}
	}

	_i18n (data, type, weekStartDay = 1) {
		const { i18n, customI18n } = this.props
		if (~["w", "weekday", "text"].indexOf(type)) {
				const weekArray = Calendar.I18N_MAP[i18n][type]
				const reArrangedWeek = (Array.isArray(weekArray) && type === 'weekday') ? 
				[
				...weekArray.slice(weekStartDay,weekArray.length),
				...weekArray.slice(1,weekStartDay)
				] 
				: weekArray
			return (customI18n[type] || {})[data] || reArrangedWeek[data]
		}
		if (type === "date") {
			return data.format(customI18n[type] || Calendar.I18N_MAP[i18n][type])
		}
	}

	_resetCalendar (nextProps = null) {
		const { startDate, endDate, format, dow } = (nextProps !== null) ? nextProps : this.props
		const start = Moment(startDate, format)
		const end = Moment(endDate, format)
		const isStartValid = start.isValid() && start >= this._minDate && start <= this._maxDate
		const isEndValid = end.isValid() && end >= this._minDate && end <= this._maxDate

		this.setState({
			startDate       : isStartValid ? start : null,
			startDateText   : isStartValid ? this._i18n(start, "date") : "",
			startWeekdayText: isStartValid ? this._i18n(start.weekday(), "weekday",dow) : "",
			endDate         : isEndValid ? end : null,
			endDateText     : isEndValid ? this._i18n(end, "date") : "",
			endWeekdayText  : isEndValid ? this._i18n(end.weekday(), "weekday",dow) : ""
		})
	}

	_getDateRange (nextProps = null) {
		const { maxDate, minDate, format } = nextProps !== null ? nextProps: this.props
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
					startWeekdayText: this._i18n(day.weekday(), "weekday",this.props.dow),
					endDateText     : this._i18n(day, "date"),
					endWeekdayText  : this._i18n(day.weekday(), "weekday",this.props.dow)
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
					startWeekdayText: this._i18n(startDay.weekday(), "weekday",this.props.dow),
					endDateText     : "",
					endWeekdayText  : ""
				})
			} else if (startDate && !endDate) {
				const endDay = day.clone().endOf("week")
				this.setState({
					endDate       : endDay,
					endDateText   : this._i18n(endDay, "date"),
					endWeekdayText: this._i18n(endDay.weekday(), "weekday",this.props.dow)
				})
			}
			return
		}

		if ((!startDate && !endDate) || day < startDate || (startDate && endDate)) {
			this.setState({
				startDate       : day,
				endDate         : null,
				startDateText   : this._i18n(day, "date"),
				startWeekdayText: this._i18n(day.weekday(), "weekday",this.props.dow),
				endDateText     : "",
				endWeekdayText  : ""
			})
		} else if (startDate && !endDate && day > startDate) {
			this.setState({
				endDate       : day,
				endDateText   : this._i18n(day, "date"),
				endWeekdayText: this._i18n(day.weekday(), "weekday",this.props.dow)
			})
		}
	}

	radioBtnsStyle (_selectionType) {
		const { styles:customStyles } = this.props
		const { selectionType } = this.state

		if(selectionType === _selectionType){
			return  [styles.tabBarSelectedBtn, customStyles.tabBarSelectedBtn]
		}

		return []
	}

	radioBtnsTextStyle (_selectionType) {
		const { styles:customStyles } = this.props
		const { selectionType } = this.state

		if(selectionType === _selectionType){
			return  [styles.tabBarSelectedBtnText, customStyles.tabBarSelectedBtnText]
		}

		return []
	}

	cancel () {
		this.close()
		this._resetCalendar()
	}

	close () {
		this.setState({
			isModalVisible: false
		})
	}

	selection (selectionType) {
		this.clear()

		this.setState({
			selectionType
		})
	}

	open () {
		this.setState({
			isModalVisible: true
		})
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

	render () {
		const {
			startDate,
			endDate,
			startDateText,
			startWeekdayText,
			endDateText,
			endWeekdayText,
			isModalVisible,
			selectionType
		} = this.state
		const { animationType, styles:customStyles,underlayColor } = this.props
		const isValid = !startDate || endDate
		const isClearVisible = startDate || endDate
			
		return (
			<Modal
				animationType={animationType}
				visible={isModalVisible}
				onRequestClose={this.close}
			>
				<View style={[styles.container]}>
					<View style={styles.ctrl}>
						<TouchableHighlight underlayColor="transparent" onPress={this.cancel}>
							<Image
								style={styles.closeIcon}
								source={{ uri: ICON.close }}
								resizeMode="cover"
							/>
						</TouchableHighlight>
						{isClearVisible && (
							<TouchableHighlight
								underlayColor="transparent"
								activeOpacity={0.8}
								onPress={this.clear}
							>
								<Text style={styles.clearText}>
									{this._i18n("clear", "text")}
								</Text>
							</TouchableHighlight>
						)}
					</View>
					<View style={styles.result}>
						<View style={styles.resultPart}>
							<Text style={[styles.resultText, customStyles.dateHeadingText, styles.startText]}>
								{startDateText || this._i18n("start", "text")}
							</Text>
							<Text style={[styles.resultText, customStyles.dateHeadingText, styles.startText]}>
								{startWeekdayText || this._i18n("date", "text")}
							</Text>
						</View>
						<View style={[styles.resultSlash]} />
						<View style={styles.resultPart}>
							<Text style={[styles.resultText, customStyles.dateHeadingText, styles.endText]}>
								{endDateText || this._i18n("end", "text")}
							</Text>
							<Text style={[styles.resultText, customStyles.dateHeadingText, styles.endText]}>
								{endWeekdayText || this._i18n("date", "text")}
							</Text>
						</View>
					</View>
					<View style={[styles.week, customStyles.week]}>
						{this.state.daysOfTheWeek.map(item => (
							<Text style={[styles.weekText, customStyles.weekText]} key={item}>
								{this._i18n(item, "w")}
							</Text>
						))}
					</View>
					<View style={[styles.scroll]}>
						<MonthList
							today={this._today}
							minDate={this._minDate}
							maxDate={this._maxDate}
							startDate={this.state.startDate}
							endDate={this.state.endDate}
							onChoose={day => this._onChoose(day, selectionType)}
							i18n={this.props.i18n}
							styles={customStyles}
							underlayColor={underlayColor}
						/>
					</View>
					<View style={[styles.btn,customStyles.tabBarContainer]}>
						<View style={styles.radioBtns}>
							<TouchableHighlight
								style={[styles.tabBarBtn, customStyles.tabBarBtn, ...this.radioBtnsStyle("day")]}
								underlayColor={underlayColor}
								onPress={() => this.selection("day")}
							>
								<Text style={[styles.tabBarBtnText, customStyles.tabBarBtnText, ...this.radioBtnsTextStyle("day")]}>Day</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={[styles.tabBarBtn, customStyles.tabBarBtn, ...this.radioBtnsStyle("week")]}
								underlayColor={underlayColor}
								onPress={() => this.selection("week")}
							>
								<Text style={[styles.tabBarBtnText, customStyles.tabBarBtnText, ...this.radioBtnsTextStyle("week")]}>Week</Text>
							</TouchableHighlight>
							<TouchableHighlight
								style={[styles.tabBarBtn, customStyles.tabBarBtn, ...this.radioBtnsStyle("manual")]}
								underlayColor={underlayColor}
								underlayTextColor={'#fff'}
								onPress={() => this.selection("manual")}
							>
								<Text style={[styles.tabBarBtnText, customStyles.tabBarBtnText, ...this.radioBtnsTextStyle("manual")]}>Manual</Text>
							</TouchableHighlight>
						</View>
						{isValid ? (
							<TouchableHighlight
								testID="applyBtn"
								underlayColor="rgba(255, 255, 255, 0.45)"
								style={styles.confirmContainer}
								onPress={this.confirm}
							>
								<View style={styles.confirmBtn}>
									<Text
										ellipsisMode="tail"
										numberOfLines={1}
										style={[styles.confirmText]}
									>
										{this._i18n("apply", "text")}
									</Text>
								</View>
							</TouchableHighlight>
						) : (
							<View
								testID="applyBtn"
								style={[styles.confirmContainer, styles.confirmContainerDisabled]}
							>
								<View style={styles.confirmBtn}>
									<Text
										ellipsisMode="tail"
										numberOfLines={1}
										style={[styles.confirmText, styles.confirmTextDisabled]}
									>
										{this._i18n("apply", "text")}
									</Text>
								</View>
							</View>
						)}
					</View>
				</View>
			</Modal>
		)
	}
}
