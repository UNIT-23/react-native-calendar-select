## react-native-calendar-select

Calendar and Events listing for React Native

### Examples

#### Selection Types Example

<a href="#selectionType" id="selectionType"><img src="./screenshots/eventsLists1.png" width="200"></a>
<a href="#selectionType" id="selectionType"><img src="./screenshots/eventsLists2.png" width="200"></a>

### Usage

> This component use `moment.js` to process date.

**install from npm**

It will be published soon to npm, but for now.

```shell
npm install --save https://github.com/ahmad2smile/react-native-calendar-select/tarball/master
```

**import in project**

```js
import Calendar from "react-native-calendar-select"
```

```js
constructor (props) {
  super(props);
  this.state = {
    startDate: new Date(2017, 6, 12),  
    endDate: new Date(2017, 8, 2)
  };
  this.confirmDate = this.confirmDate.bind(this);
  this.openCalendar = this.openCalendar.bind(this);
}
// when confirm button is clicked, an object is conveyed to outer component
// contains following property:
// startDate [Date Object], endDate [Date Object]
// startMoment [Moment Object], endMoment [Moment Object]
confirmDate({startDate, endDate, startMoment, endMoment}) {
  this.setState({
    startDate,
    endDate
  });
}
openCalendar() {
  this.calendar && this.calendar.open();
}
// in render function
render() {
  // It's an optional property, I use this to show the structure of customI18n object.
  let customI18n = {
    'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    'text': {
      'start': 'Check in',
      'end': 'Check out',
      'date': 'Date',
      'save': 'Confirm',
      'clear': 'Reset'
    },
    'date': 'DD / MM'  // date format
  };
  // optional property, too.
  let color = {
    subColor: '#f0f0f0',
    mainColor: "#f4995d"
  };
  return (
    <View>
      <Button title="Open Calendar" onPress={this.openCalendar}>
      <Calendar
        i18n="en"
        ref={(calendar) => {this.calendar = calendar;}}
        customI18n={customI18n}
        color={color}
        format="YYYYMMDD"
        disableEventsList={false}
        eventsList={MyListComponent}
        minDate="20170510"
        maxDate="20180312"
        startDate={this.state.startDate}
        endDate={this.state.endDate}
        onConfirm={this.confirmDate}
      />
    </View>
  );
}
```

### Properties

| Property          | Type                          | Default      | Description                                                                                                                                                         |
| ----------------- | ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| i18n              | String                        | 'en'         | Region for `moment`                                                                                                                                                 |
| dow               | Number                        | 1            | Day of the week default 1 is 'Monday'                                                                                                                               |
| disableEventsList | Boolean                       | false        | Are you going to show a events list of not                                                                                                                          |
| eventsList        | Node                          | -            | Custom Component for events                                                                                                                                         |
| color             | Object                        | {}           | Customize color.                                                                                                                                                    |
| format            | string                        | 'YYYY-MM-DD' | Define date format, you can also pass Date Object or Moment Object as props.                                                                                        |
| minDate           | String / Object               | -            | Min date of calendar                                                                                                                                                |
| maxDate           | String / Object               | -            | Max date of calendar                                                                                                                                                |
| startDate         | String / Object               | null         | Start date of selection                                                                                                                                             |
| endDate           | String / Object               | null         | End date of selection                                                                                                                                               |
| onConfirm         | Function                      | -            | Callback function when the period is confirmed, receives an object as only parameter, contains `startDate` / `endDate` / `startMoment` / `endMoment` four property. |
| selectionType     | enum(`manual`, `week`, `day`) | "manual"     | Initial (optional) selection type can be one of `manual`, `week` and `day`                                                                                          |
| animationType     | enum(`slide`, `fade`, `none`) | "slide"      | Initial (optional) animation type can be one of `slide`, `fade` and `none`                                                                                          |

### Instance methods

| Method  | Description                                  |
| ------- | -------------------------------------------- |
| cancel  | Cancel modification of state and close modal |
| close   | Close select modal                           |
| open    | Open select modal                            |
| clear   | Reset state of component                     |
| confirm | Confirm selection and close modal            |

### Color properties

| Prop              | Description                                         |
| ----------------- | --------------------------------------------------- |
| subColor          | Sets the Text Color                                 |
| mainColor         | Sets the Background Color of the Calendar           |
| borderColor       | Sets the Color of the Calendar border               |
| topBarColor       | Upper bar color where type of selection btns are    |
| selectionBtnColor | Lower bar color where events List and select btn is |

LICENSE MIT

dev: [Ahmad](https://github.com/ahmad2smile/)
