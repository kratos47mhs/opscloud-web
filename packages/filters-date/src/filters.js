// Date and time related filter
// https://github.com/iamkun/dayjs/blob/master/docs/zh-cn/API-reference.md

import dayjs from 'dayjs'

// Object Agent
const P = Day => {
  return new Proxy(Day, {
    get (target, key) {
      if (dayjs.isDayjs(target)) {
        // Is a Dayjs object, return normally
        return target[key]
      } else {
        // Not a Dayjs object
        if (dayjs(target).isValid()) {
          // Try to help users parse into Dayjs objects
          return dayjs(target)[key]
        } else {
          // Unresolved
          return function () {
            return 'Invalid date'
          }
        }
      }
    },
    set (target, key, value) {
      target[key] = value
    }
  })
}

export default {
  // ---------- [ Dayjs Parsing ] ----------
  // Time String | Date object | Unix timestamp (milliseconds)
  day: value => dayjs(value),
  // Unix timestamp (seconds)
  date_unix: value => dayjs.unix(value),
  // ---------- [ Obtain ] ----------
  date_year: Day => P(Day).year(),
  date_month: Day => P(Day).month(),
  date_date: Day => P(Day).date(),
  date_day: Day => P(Day).day(),
  date_hour: Day => P(Day).hour(),
  date_minute: Day => P(Day).minute(),
  date_second: Day => P(Day).second(),
  date_millisecond: Day => P(Day).millisecond(),
  // ---------- [ SetUp ] ----------
  // date | day | month | year | hour | minute | second | millisecond
  // Insensitive to case
  date_set: (Day, unit, value) => P(Day).set(unit, value),
  // ---------- [ 操作 ] ----------
  // Addition
  date_add: (Day, value, unit) => P(Day).add(value, unit),
  // Subtraction
  date_subtract: (Day, value, unit) => P(Day).subtract(value, unit),
  // Start time
  date_startof: (Day, unit) => P(Day).startOf(unit),
  // End time
  date_endof: (Day, unit) => P(Day).endOf(unit),
  // ---------- [ 显示 ] ----------
  // Format
  date_format: (Day, setting = 'YYYY-MM-DD HH:mm:ss') => P(Day).format(setting),
  // Time difference
  date_diff: (Day, Day2 = '', unit = 'millisecond', accurate = false) => P(Day).diff(dayjs(Day2), unit, accurate),
  // Unix timestamp (milliseconds)
  date_value_millisecond: Day => P(Day).valueOf(),
  // Unix timestamp (seconds)
  date_value_second: Day => P(Day).unix(),
  // Days of month
  date_days_in_month: Day => P(Day).daysInMonth(),
  // Date object
  date_to_date: Day => P(Day).toDate(),
  // JSON
  date_to_json: Day => P(Day).toJSON(),
  // ISO8601 format
  date_to_iso: Day => P(Day).toISOString(),
  // Character
  date_to_string: Day => P(Day).toString(),
  // ---------- [ Inquire ] ----------
  // Before
  date_is_before: (Day, Day2, unit = 'millisecond') => P(Day).isBefore(dayjs(Day2), unit),
  // After
  date_is_after: (Day, Day2, unit = 'millisecond') => P(Day).isAfter(dayjs(Day2), unit),
  // Are they the same
  date_is_same: (Day, Day2, unit = 'millisecond') => P(Day).isSame(dayjs(Day2), unit)
}
