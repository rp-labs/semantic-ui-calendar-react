import moment from 'moment';
import _ from 'lodash';

/** Parse string, moment, Date.
 * 
 * Return unedfined on invalid input.
 */
export function parseValue(value, dateFormat) {
  if (!_.isNil(value) && !_.isNil(dateFormat)) {
    const date = moment(value, dateFormat);
    if (date.isValid()) {
      return date;
    }
  }
}

/** Parse string, moment, Date, string[], moment[], Date[].
 * 
 * Return array of moments or moment. Returned value contains only valid moments.
 * Return undefined if none of the input values are valid.
 */
export function parseArrayOrValue(data, dateFormat) {
  if (_.isArray(data)) {
    const parsed = _.compact(data.map(item => parseValue(item, dateFormat)));
    if (parsed.length > 0) {
      return parsed;
    }
  }
  return parseValue(data, dateFormat);
}

/** Create moment.
 * 
 * Creates moment using either of `value` and `initialDate` arguments (if provided).
 * Precedense order: value -> initialDate -> default value
 */
export function getInitializer(value, initialDate, dateFormat) {
  const parsedValue = parseValue(value, dateFormat);
  if (parsedValue) {
    return parsedValue;
  }
  const parsedInitialDate = parseValue(initialDate, dateFormat);
  if (parsedInitialDate) {
    return parsedInitialDate;
  }
  return moment();
}

export function parseInput(value, dateFormat) {
  if (_.isString(value)) {
    return parseValue(value, dateFormat);
  }
}
