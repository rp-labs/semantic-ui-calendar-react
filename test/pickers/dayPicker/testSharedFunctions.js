import { assert } from 'chai';
import _ from 'lodash';
import moment from 'moment';

import {
  getDaysArray,
  getBrakepoints,
  getDefaultEnabledDayPositions,
  isNextPageUnavailable,
  isPrevPageUnavailable,
} from '../../../src/pickers/dayPicker/sharedFunctions';

describe('getDaysArray', () => {
  const start = 30;
  const brakepoints = [31, 31];
  const length = 6 * 7;

  it('return array of numbers', () => {
    const shouldReturn = [
      30, 31, 1, 2, 3, 4, 5,
      6, 7, 8, 9, 10, 11, 12,
      13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 1, 2,
      3, 4, 5, 6, 7, 8, 9,
    ];
    assert(_.isArray(getDaysArray(start, brakepoints, length)), 'return array');
    assert.equal(getDaysArray(start, brakepoints, length).length, length, 'return array of length 6 * 7');
    getDaysArray(start, brakepoints, length).forEach((day, i) => {
      assert.equal(day, shouldReturn[i], 'contains corect days');
    });
  });
});

describe('getBrakepoints', () => {

  it('return array of correct numbers', () => {
    const date = moment('2018-08-12');
    /*[
      29, 30, 31, 1, 2, 3, 4,
      5, 6, 7, 8, 9, 10, 11,
      12, 13, 14, 15, 16, 17, 18,
      19, 20, 21, 22, 23, 24, 25,
      26, 27, 28, 29, 30, 31, 1,
      2, 3, 4, 5, 6, 7, 8,
    ]
    */
    const shouldReturn = [31, 31];
    assert(_.isArray(getBrakepoints(date)), 'return array');
    assert.equal(getBrakepoints(date).length, 2, 'return array of length 2');
    getBrakepoints(date).forEach((bp, i) => {
      assert.equal(bp, shouldReturn[i], 'contains corect brakepoints');
    });
  });

  it('return array of correct numbers', () => {
    const date = moment('2018-09-12');
    /*[
      26, 27, 28, 29, 30, 31, 1,
      2, 3, 4, 5, 6, 7, 8,
      9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22,
      23, 24, 25, 26, 27, 28, 29,
      30, 1, 2, 3, 4, 5, 6,
    ]
    */
    const shouldReturn = [31, 30];
    assert(_.isArray(getBrakepoints(date)), 'return array');
    assert.equal(getBrakepoints(date).length, 2, 'return array of length 2');
    getBrakepoints(date).forEach((bp, i) => {
      assert.equal(bp, shouldReturn[i], 'contains corect brakepoints');
    });
  });
});

describe('getDefaultEnabledDayPositions', () => {
  const date = moment('2018-08-12');

  describe('return array of day positions (days from given month)', () => {
    it('return expected object', () => {
      
      const allDays = [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ];
      
      const shouldReturn = [
        3, 4, 5, 6, 7, 8, 9,
        10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
        32, 33,
      ]; // days in given month position numbers
      assert(_.isArray(getDefaultEnabledDayPositions(allDays, date)), 'return array');
      assert.equal(getDefaultEnabledDayPositions(allDays, date).length, 31, 'return array of length 31');
      getDefaultEnabledDayPositions(allDays, date).forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = getDefaultEnabledDayPositions(allDays, date);
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });
});

describe('DayPicker: isNextPageUnavailable', () => {
  const date = moment('2018-08-12');

  describe('byDisable', () => {
    it('return true because all days in next month are disabled', () => {
      const disabledDays = _.range(1, 31).map((date) => {
        return moment({ year: 2018, month: 8, date: date});
      });

      assert(_.isBoolean(isNextPageUnavailable.byDisable(date, disabledDays)), 'return boolean');
      assert.isTrue(isNextPageUnavailable.byDisable(date, disabledDays), 'return true');
    });

    it('return false because  not all days in next month are disabled', () => {
      const disabledDays = _.range(1, 30).map((date) => {
        return moment({ year: 2018, month: 8, date: date});
      });

      assert(_.isBoolean(isNextPageUnavailable.byDisable(date, disabledDays)), 'return boolean');
      assert.isFalse(isNextPageUnavailable.byDisable(date, disabledDays), 'return false');
    });

    it('return false because disabledDays is undefined', () => {
      assert(_.isBoolean(isNextPageUnavailable.byDisable(date, undefined)), 'return boolean');
      assert.isFalse(isNextPageUnavailable.byDisable(date, undefined), 'return false');
    });
  });

  describe('byMaxDate', () => {
    it('return true because all days after current month are disabled', () => {
      const maxDate = moment('2018-08-31');

      assert(_.isBoolean(isNextPageUnavailable.byMaxDate(date, maxDate)), 'return boolean');
      assert.isTrue(isNextPageUnavailable.byMaxDate(date, maxDate), 'return true');
    });

    it('return false because maxDate is in next month or after', () => {
      const maxDate = moment('2018-09-01');

      assert(_.isBoolean(isNextPageUnavailable.byMaxDate(date, maxDate)), 'return boolean');
      assert.isFalse(isNextPageUnavailable.byMaxDate(date, maxDate), 'return false');
    });

    it('return false because maxDate is undefined', () => {
      assert(_.isBoolean(isNextPageUnavailable.byMaxDate(date, undefined)), 'return boolean');
      assert.isFalse(isNextPageUnavailable.byMaxDate(date, undefined), 'return false');
    });
  });

});

describe('DayPicker: isPrevPageUnavailable', () => {
  const date = moment('2018-08-12');

  describe('byDisable', () => {
    it('return true because all days in previous month are disabled', () => {
      const disabledDays = _.range(1, 32).map((date) => {
        return moment({ year: 2018, month: 6, date: date});
      });

      assert(_.isBoolean(isPrevPageUnavailable.byDisable(date, disabledDays)), 'return boolean');
      assert.isTrue(isPrevPageUnavailable.byDisable(date, disabledDays), 'return true');
    });

    it('return false because  not all days in previous month are disabled', () => {
      const disabledDays = _.range(1, 31).map((date) => {
        return moment({ year: 2018, month: 6, date: date});
      });

      assert(_.isBoolean(isPrevPageUnavailable.byDisable(date, disabledDays)), 'return boolean');
      assert.isFalse(isPrevPageUnavailable.byDisable(date, disabledDays), 'return false');
    });

    it('return false because  disabledDays is undefined', () => {
      assert(_.isBoolean(isPrevPageUnavailable.byDisable(date, undefined)), 'return boolean');
      assert.isFalse(isPrevPageUnavailable.byDisable(date, undefined), 'return false');
    });
  });

  describe('byMinDate', () => {
    it('return true because all days before current month are disabled', () => {
      const minDate = moment('2018-08-01');

      assert(_.isBoolean(isPrevPageUnavailable.byMinDate(date, minDate)), 'return boolean');
      assert.isTrue(isPrevPageUnavailable.byMinDate(date, minDate), 'return true');
    });

    it('return false because minDate is in previous month or before', () => {
      const minDate = moment('2018-07-31');

      assert(_.isBoolean(isPrevPageUnavailable.byMinDate(date, minDate)), 'return boolean');
      assert.isFalse(isPrevPageUnavailable.byMinDate(date, minDate), 'return false');
    });

    it('return false because  minDate is undefined', () => {
      assert(_.isBoolean(isPrevPageUnavailable.byMinDate(date, undefined)), 'return boolean');
      assert.isFalse(isPrevPageUnavailable.byMinDate(date, undefined), 'return false');
    });
  });

});