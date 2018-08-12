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
} from '../../src/pickers/DayPicker';

Enzyme.configure({ adapter: new Adapter() });

describe('<DayPicker />', () => {
  it.only('initialized with moment', () => {
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

describe('getDaysArray', () => {
  const start = 30;
  const brakepoints = [31, 31];
  const length = 6 * 7;

  it.only('return array of numbers', () => {
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
  const date = moment('2018-08-12');

  it.only('return array of numbers', () => {
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
