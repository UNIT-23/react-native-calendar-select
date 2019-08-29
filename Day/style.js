import {
  StyleSheet,
  Dimensions
} from 'react-native';
const {scale, width} = Dimensions.get('window');
let dayWidth = width / 7;
let mod = scale * width % 7;
if (mod) {
  dayWidth = ((7 - mod) / scale + width) / 7;
}
export default StyleSheet.create({
  dayContainer: {
    width: dayWidth,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startContainer: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  endContainer: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  },
  today: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.40)'
  },
  day: {
    width: dayWidth,
    height: dayWidth,
    borderRadius: dayWidth / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dayText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#252631'
  },
  dayTextDisabled: {
    fontSize: 16,
    color: '#98A9BC',
    textAlign: 'center'
  },
  selectedMidDays: {
    backgroundColor: '#f2fdf6'
  },
  selectedMidDaysText: {
    color: '#1DB954'
  },
  selectedDay: {
    backgroundColor: '#1DB954'
  },
  selectedDayText: {
    color: '#fff'
  }
});
