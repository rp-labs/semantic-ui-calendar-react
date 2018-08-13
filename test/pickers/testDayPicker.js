import { assert } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  shallow,
} from 'enzyme';
import sinon from 'sinon';
import React from 'react';
import _ from 'lodash';
import moment from 'moment';

import DayPicker from '../../src/pickers/DayPicker';
import DayView from '../../src/views/DayView';
import {
  getDaysArray,
  getBrakepoints,
  getAnabledOnlyPositions,
  isNextPageUnavailable,
  isPrevPageUnavailable,
} from '../../src/pickers/DayPicker';

Enzyme.configure({ adapter: new Adapter() });

describe.only('<DayPicker />', () => {
  it('initialized with moment', () => {
    const date = moment('2015-05-01');
    const wrapper = shallow(<DayPicker initializeWith={date} />);
    assert(moment.isMoment(wrapper.state('date')), 'has moment instance in `date` state field');
    assert(wrapper.state('date').isSame(date), 'initialize `date` state field with moment provided in `initializeWith` prop');
  });

  // it('render <DayPicker /> properly', () => {
  //   const date = moment('2015-05-01');
  //   const wrapper = shallow(<DayPicker
  //     initializeWith={date} />);
  //   assert(wrapper.is(DayView), 'renders <DayView />');
  //   assert(_.isArray(wrapper.prop('months')), 'provide array to `months` prop on MonthView');
  //   assert.equal(wrapper.prop('months').length, 12, 'provide array of length 12 to `months` prop on MonthView');
  //   wrapper.prop('months').forEach((month) => {
  //     assert(_.isString(month), 'contains strings');
  //   });
  //   assert(_.isFunction(wrapper.prop('onNextPageBtnClick')), 'provide function for `onNextPageBtnClick` prop on MonthView');
  //   assert(_.isFunction(wrapper.prop('onPrevPageBtnClick')), 'provide function for `onPrevPageBtnClick` prop on MonthView');
  //   assert(_.isFunction(wrapper.prop('onMonthClick')), 'provide function for `onMonthClick` prop on MonthView');
  //   assert(_.isBoolean(wrapper.prop('hasPrevPage')), 'provide boolean for `hasPrevPage` prop on MonthView');
  //   assert(_.isBoolean(wrapper.prop('hasNextPage')), 'provide boolean for `hasNextPage` prop on MonthView');
  //   assert(_.has(wrapper.props(), 'active'), 'provide `active` prop to MonthView');
  //   assert(_.has(wrapper.props(), 'disabled'), 'provide `disabled` prop to MonthView');
  //   assert(_.has(wrapper.props(), 'currentYear'), 'provide `currentYear` prop to MonthView');
  // });

  // it('pass unhandled props to <MonthView />', () => {
  //   const date = moment('2015-05-01');
  //   const wrapper = shallow(<MonthPicker
  //     a="prop a"
  //     b="prop b"
  //     initializeWith={date} />);
  //   assert(wrapper.is(MonthView), 'renders <MonthView />');
  //   assert.equal(wrapper.prop('a'), 'prop a', 'provide unhandled prop `a` to MonthView');
  //   assert.equal(wrapper.prop('b'), 'prop b', 'provide unhandled prop `b` to MonthView');
  // });
});

describe.only('getDaysArray', () => {
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

describe.only('getBrakepoints', () => {
  const date = moment('2018-08-12');

  it('return array of numbers', () => {
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
});

describe.only('<DayPicker />: buildDays', () => {
  const date = moment('2018-08-12');

  it('return array of strings', () => {
    const wrapper = shallow(<DayPicker initializeWith={date} />);
    const shouldReturn = [
      '29', '30', '31', '1', '2', '3', '4',
      '5', '6', '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17', '18',
      '19', '20', '21', '22', '23', '24', '25',
      '26', '27', '28', '29', '30', '31', '1',
      '2', '3', '4', '5', '6', '7', '8',
    ];
    assert(_.isArray(wrapper.instance().buildDays()), 'return array');
    assert.equal(wrapper.instance().buildDays().length, 42, 'return array of length 42');
    wrapper.instance().buildDays().forEach((date, i) => {
      assert.equal(date, shouldReturn[i], 'contains corect dates');
    });
  });
});

describe.only('<DayPicker />: getActiveDay', () => {
  const date = moment('2018-08-12');

  it('return active day', () => {
    const wrapper = shallow(<DayPicker
      value={moment('2018-08-22')}
      initializeWith={date} />);
    /*
      [
      '29', '30', '31', '1', '2', '3', '4',
      '5', '6', '7', '8', '9', '10', '11',
      '12', '13', '14', '15', '16', '17', '18',
      '19', '20', '21', '22', '23', '24', '25',
      '26', '27', '28', '29', '30', '31', '1',
      '2', '3', '4', '5', '6', '7', '8',
    ]
    */
    assert(_.isNumber(wrapper.instance().getActiveDay()), 'return number');
    assert.equal(wrapper.instance().getActiveDay(), 24, 'return active day position number');
  });
});

describe.only('getAnabledOnlyPositions', () => {
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
      assert(_.isArray(getAnabledOnlyPositions(allDays, date)), 'return array');
      assert.equal(getAnabledOnlyPositions(allDays, date).length, 31, 'return array of length 31');
      getAnabledOnlyPositions(allDays, date).forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = getAnabledOnlyPositions(allDays, date);
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });
});

describe.only('<DayPicker />: getDisabledDays', () => {
  const date = moment('2018-08-12');

  describe('return disabled days based on `disable` prop', () => {
    it('return disabled days position numbers', () => {
      const wrapper = shallow(<DayPicker
        disable={[moment('2018-08-22'), moment('2018-08-25')]}
        initializeWith={date} />);
      /*
        [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ]
      */
      const shouldReturn = [
        0, 1, 2,
        24, 27,
        34, 35, 36, 37, 38, 39, 40, 41,
      ]; //disabled days position numbers
      assert(_.isArray(wrapper.instance().getDisabledDays()), 'return array of numbers');
      assert.equal(wrapper.instance().getDisabledDays().length, 13, 'return array of length 13');
      wrapper.instance().getDisabledDays().forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = wrapper.instance().getDisabledDays();
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });

  describe('return disabled days based on `maxDate` prop', () => {
    it('return disabled days position numbers', () => {
      const wrapper = shallow(<DayPicker
        maxDate={moment('2018-08-22')}
        initializeWith={date} />);
      /*
        [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ]
      */
      const shouldReturn = [
        0, 1, 2,
        25, 26, 27, 28, 29, 30, 31, 32, 33,
        34, 35, 36, 37, 38, 39, 40, 41,
      ]; //disabled days position numbers
      assert(_.isArray(wrapper.instance().getDisabledDays()), 'return array of numbers');
      assert.equal(wrapper.instance().getDisabledDays().length, 20, 'return array of length 20');
      wrapper.instance().getDisabledDays().forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = wrapper.instance().getDisabledDays();
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });

  describe('return disabled days based on `minDate` prop', () => {
    it('return disabled days position numbers', () => {
      const wrapper = shallow(<DayPicker
        minDate={moment('2018-08-04')}
        initializeWith={date} />);
      /*
        [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ]
      */
      const shouldReturn = [
        0, 1, 2,
        3, 4, 5,
        34, 35, 36, 37, 38, 39, 40, 41,
      ]; //disabled days position numbers
      assert(_.isArray(wrapper.instance().getDisabledDays()), 'return array of numbers');
      assert.equal(wrapper.instance().getDisabledDays().length, 14, 'return array of length 14');
      wrapper.instance().getDisabledDays().forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = wrapper.instance().getDisabledDays();
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });

  describe('return disabled days based on `minDate`, `maxDate`, `disable` props', () => {
    it('return disabled days position numbers', () => {
      const wrapper = shallow(<DayPicker
        minDate={moment('2018-08-04')}
        maxDate={moment('2018-08-29')}
        disable={[moment('2018-08-14'), moment('2018-08-16')]}
        initializeWith={date} />);
      /*
        [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ]
      */
      const shouldReturn = [
        0, 1, 2, 3, 4, 5,
        16, 18,
        32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
      ]; //disabled days position numbers
      assert(_.isArray(wrapper.instance().getDisabledDays()), 'return array of numbers');
      assert.equal(wrapper.instance().getDisabledDays().length, 18, 'return array of length 18');
      wrapper.instance().getDisabledDays().forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = wrapper.instance().getDisabledDays();
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });

  describe('return disabled days when none of `minDate`, `maxDate`, `disable` props provided', () => {
    it('return disabled days position numbers (only days that are not in currently displayed month', () => {
      const wrapper = shallow(<DayPicker
        initializeWith={date} />);
      /*
        [
        '29', '30', '31', '1', '2', '3', '4',
        '5', '6', '7', '8', '9', '10', '11',
        '12', '13', '14', '15', '16', '17', '18',
        '19', '20', '21', '22', '23', '24', '25',
        '26', '27', '28', '29', '30', '31', '1',
        '2', '3', '4', '5', '6', '7', '8',
      ]
      */
      const shouldReturn = [
        0, 1, 2,
        34, 35, 36, 37, 38, 39, 40, 41,
      ]; //disabled days position numbers
      assert(_.isArray(wrapper.instance().getDisabledDays()), 'return array of numbers');
      assert.equal(wrapper.instance().getDisabledDays().length, 11, 'return array of length 11');
      wrapper.instance().getDisabledDays().forEach((day) => {
        assert(_.isNumber(day), 'contains numbers');
      });
      const producedDays = wrapper.instance().getDisabledDays();
      shouldReturn.forEach((expectedDay) => {
        assert(_.includes(producedDays, expectedDay), 'contains correct posiotion numbers');
      });
    });
  });
});

describe.only('DayPicker: isNextPageUnavailable', () => {
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

describe.only('DayPicker: isPrevPageUnavailable', () => {
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

describe.only('<DayPicker />: isNextPageAvailable', () => {
  const date = moment('2018-08-12');

  describe('all days in next month are disabled', () => {
    const disabledDays = _.range(1, 31).map((date) => {
      return moment({ year: 2018, month: 8, date: date });
    });

    it('return false', () => {
      const wrapper = shallow(<DayPicker
        disable={disabledDays}
        initializeWith={date} />);
      
      assert(_.isBoolean(wrapper.instance().isNextPageAvailable()), 'return boolean');
      assert.isFalse(wrapper.instance().isNextPageAvailable(), 'return false');
    });
  });

  describe('not all days in next month are disabled', () => {
    const disabledDays = _.range(2, 29).map((date) => {
      return moment({ year: 2018, month: 8, date: date });
    });

    it('return true', () => {
      const wrapper = shallow(<DayPicker
        disable={disabledDays}
        initializeWith={date} />);
      
      assert(_.isBoolean(wrapper.instance().isNextPageAvailable()), 'return boolean');
      assert.isTrue(wrapper.instance().isNextPageAvailable(), 'return true');
    });
  });
});

describe.only('<DayPicker />: isPrevPageAvailable', () => {
  const date = moment('2018-08-12');

  describe('all days in prev month are disabled', () => {
    const disabledDays = _.range(1, 32).map((date) => {
      return moment({ year: 2018, month: 6, date: date });
    });

    it('return false', () => {
      const wrapper = shallow(<DayPicker
        disable={disabledDays}
        initializeWith={date} />);
      
      assert(_.isBoolean(wrapper.instance().isPrevPageAvailable()), 'return boolean');
      assert.isFalse(wrapper.instance().isPrevPageAvailable(), 'return false');
    });
  });

  describe('not all days in prev month are disabled', () => {
    const disabledDays = _.range(2, 29).map((date) => {
      return moment({ year: 2018, month: 6, date: date });
    });

    it('return true', () => {
      const wrapper = shallow(<DayPicker
        disable={disabledDays}
        initializeWith={date} />);
      
      assert(_.isBoolean(wrapper.instance().isPrevPageAvailable()), 'return boolean');
      assert.isTrue(wrapper.instance().isPrevPageAvailable(), 'return true');
    });
  });
});

describe.only('<DayPicker />: getCurrentMonth', () => {
  const date = moment('2018-08-12');

  it('return string in format `MMMM YYYY`', () => {
    const wrapper = shallow(<DayPicker
      initializeWith={date} />);
    
    assert(_.isString(wrapper.instance().getCurrentMonth()), 'return string');
    assert.equal(wrapper.instance().getCurrentMonth(), date.format('MMMM YYYY'), 'return proper value');
  });
});

describe.only('<DayPicker />: handleChange', () => {
  const date = moment('2018-08-12');
  /*
    [
    '29', '30', '31', '1', '2', '3', '4',
    '5', '6', '7', '8', '9', '10', '11',
    '12', '13', '14', '15', '16', '17', '18',
    '19', '20', '21', '22', '23', '24', '25',
    '26', '27', '28', '29', '30', '31', '1',
    '2', '3', '4', '5', '6', '7', '8',
  ]
  */

  it('call onChangeFake with { year: number, month: number, date: number }', () => {
    const onChangeFake = sinon.fake();
    const wrapper = shallow(<DayPicker
      onChange={onChangeFake}
      initializeWith={date} />);
    wrapper.instance().handleChange('click', { key: '17', value: '15'});
    const calledWithArgs = onChangeFake.args[0];

    assert(onChangeFake.calledOnce, 'onChangeFake called once');
    assert.equal(wrapper.instance().getCurrentMonth(), date.format('MMMM YYYY'), 'return proper value');
    assert.equal(calledWithArgs[0], 'click', 'correct first argument');
    assert.equal(calledWithArgs[1].value.year, 2018, 'correct year');
    assert.equal(calledWithArgs[1].value.month, 7, 'correct month');
    assert.equal(calledWithArgs[1].value.date, 15, 'correct date');
  });
});

describe.only('<DayPicker />: switchToNextPage', () => {
  const date = moment('2018-08-12');

  it('shift `date` state field one month forward', () => {
    const wrapper = shallow(<DayPicker
      initializeWith={date} />);
    
    assert.equal(wrapper.state('date').month(), 7, 'month not changed yet');
    wrapper.instance().switchToNextPage();
    assert.equal(wrapper.state('date').month(), 7 + 1, 'month shifted one month forward');
  });
});

describe.only('<DayPicker />: switchToPrevPage', () => {
  const date = moment('2018-08-12');

  it('shift `date` state field one month backward', () => {
    const wrapper = shallow(<DayPicker
      initializeWith={date} />);
    
    assert.equal(wrapper.state('date').month(), 7, 'month not changed yet');
    wrapper.instance().switchToPrevPage();
    assert.equal(wrapper.state('date').month(), 7 - 1, 'month shifted one month backward');
  });
});