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

import MinutePicker from '../../src/pickers/timePicker/MinutePicker';
import MinuteView from '../../src/views/MinuteView';

Enzyme.configure({ adapter: new Adapter() });

describe('<MinutePicker />', () => {
  it('initialized with moment', () => {
    const date = moment('2015-05-01');
    const wrapper = shallow(<MinutePicker initializeWith={date} />);
    assert(
      moment.isMoment(wrapper.state('date')),
      'has moment instance in `date` state field');
    assert(
      wrapper.state('date').isSame(date),
      'initialize `date` state field with moment provided in `initializeWith` prop');
  });

  it('render <MinutePicker /> properly', () => {
    const date = moment('2015-05-01');
    const wrapper = shallow(<MinutePicker
      initializeWith={date} />);
    assert(wrapper.is(MinuteView), 'renders <MinuteView />');
    // assert(_.isArray(wrapper.prop('hours')), 'provide array to `hours` prop on MinuteView');
    // assert.equal(wrapper.prop('hours').length, 24, 'provide array of length 24 to `hours` prop on MinuteView');
    // wrapper.prop('hours').forEach((hour) => {
    //   assert(_.isString(hour), 'contains strings');
    // });
    // assert(_.isFunction(wrapper.prop('onNextPageBtnClick')), 'provide function for `onNextPageBtnClick` prop on MinuteView');
    // assert(_.isFunction(wrapper.prop('onPrevPageBtnClick')), 'provide function for `onPrevPageBtnClick` prop on MinuteView');
    // assert(_.isFunction(wrapper.prop('onHourClick')), 'provide function for `onHourClick` prop on MinuteView');
    // assert(_.isBoolean(wrapper.prop('hasPrevPage')), 'provide boolean for `hasPrevPage` prop on MinuteView');
    // assert(_.isBoolean(wrapper.prop('hasNextPage')), 'provide boolean for `hasNextPage` prop on MinuteView');
    // assert(_.isString(wrapper.prop('currentDate')), 'provide string for `currentDate` prop on MinuteView');
    // assert(_.has(wrapper.props(), 'active'), 'provide `active` prop to MinuteView');
    // assert(_.has(wrapper.props(), 'disabled'), 'provide `disabled` prop to MinuteView');
  });

  it('pass unhandled props to <MinuteView />', () => {
    const date = moment('2015-05-01');
    const wrapper = shallow(<MinutePicker
      a="prop a"
      b="prop b"
      initializeWith={date} />);
    assert(wrapper.is(MinuteView), 'renders <MinuteView />');
    assert.equal(wrapper.prop('a'), 'prop a', 'provide unhandled prop `a` to MinuteView');
    assert.equal(wrapper.prop('b'), 'prop b', 'provide unhandled prop `b` to MinuteView');
  });
});

describe('<MinutePicker />: buildMinutes', () => {
  const date = moment('2018-08-12 15:00');

  describe('`timeFormat` not provided', () => {
    it('return array of strings', () => {
      const wrapper = shallow(<MinutePicker initializeWith={date} />);
      const shouldReturn = [
        '15:00', '15:05', '15:10', '15:15', '15:20', '15:25',
        '15:30', '15:35', '15:40', '15:45', '15:50', '15:55',
      ];
      assert(_.isArray(wrapper.instance().buildMinutes()), 'return array');
      assert.equal(wrapper.instance().buildMinutes().length, 12, 'return array of length 12');
      wrapper.instance().buildMinutes().forEach((minutePosition, i) => {
        assert.equal(minutePosition, shouldReturn[i], 'contains corect minute positions');
      });
    });
  });

  describe('`timeFormat` is ampm', () => {
    it('return array of strings', () => {
      const wrapper = shallow(<MinutePicker
        timeFormat="ampm"
        initializeWith={date} />);
      const shouldReturn = [
        '03:00 pm', '03:05 pm', '03:10 pm', '03:15 pm', '03:20 pm', '03:25 pm',
        '03:30 pm', '03:35 pm', '03:40 pm', '03:45 pm', '03:50 pm', '03:55 pm',
      ];
      assert(_.isArray(wrapper.instance().buildMinutes()), 'return array');
      assert.equal(wrapper.instance().buildMinutes().length, 12, 'return array of length 12');
      wrapper.instance().buildMinutes().forEach((minutePosition, i) => {
        assert.equal(minutePosition, shouldReturn[i], 'contains corect minute positions');
      });
    });
  });

  describe('`timeFormat` is AMPM', () => {
    it('return array of strings', () => {
      const wrapper = shallow(<MinutePicker
        timeFormat="AMPM"
        initializeWith={date} />);
      const shouldReturn = [
        '03:00 PM', '03:05 PM', '03:10 PM', '03:15 PM', '03:20 PM', '03:25 PM',
        '03:30 PM', '03:35 PM', '03:40 PM', '03:45 PM', '03:50 PM', '03:55 PM',
      ];
      assert(_.isArray(wrapper.instance().buildMinutes()), 'return array');
      assert.equal(wrapper.instance().buildMinutes().length, 12, 'return array of length 12');
      wrapper.instance().buildMinutes().forEach((minutePosition, i) => {
        assert.equal(minutePosition, shouldReturn[i], 'contains corect minute positions');
      });
    });
  });
});

// describe('<HourPicker />: getActiveHour', () => {
//   const date = moment('2018-08-12');

//   it('return active hour', () => {
//     const wrapper = shallow(<HourPicker
//       value={moment({ hour: 15 })}
//       initializeWith={date} />);
//     /*
//       [
//         '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
//         '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
//         '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
//         '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
//       ]
//     */
//     assert(_.isNumber(wrapper.instance().getActiveHour()), 'return number');
//     assert.equal(wrapper.instance().getActiveHour(), 15, 'return active hour position number');
//   });
// });

// describe('<HourPicker />: getDisabledHours', () => {
//   const date = moment('2018-08-12');

//   describe('return disabled hour positions based on `disable` prop', () => {
//     it('return disabled hour positions position numbers', () => {
//       const wrapper = shallow(<HourPicker
//         disable={[moment('2018-08-12 12:00'), moment('2018-08-12 14:00')]}
//         initializeWith={date} />);
      
//       assert(_.isArray(wrapper.instance().getDisabledHours()), 'return array of numbers');
//       assert.equal(wrapper.instance().getDisabledHours().length, 2, 'return array of length 2');
//       wrapper.instance().getDisabledHours().forEach((hour) => {
//         assert(_.isNumber(hour), 'contains numbers');
//       });
//       assert(_.includes(wrapper.instance().getDisabledHours(), 12), 'contains correct hour positions');
//       assert(_.includes(wrapper.instance().getDisabledHours(), 14), 'contains correct hour positions');
//     });
//   });

//   describe('return disabled hour positions based on `maxDate` prop', () => {
//     it('return disabled hour positions position numbers', () => {
//       const wrapper = shallow(<HourPicker
//         maxDate={moment('2018-08-12 15:00')}
//         initializeWith={date} />);
//       const shouldReturn = [
//         16, 17, 18, 19, 20, 21, 22, 23,
//       ]; //disabled hours position numbers
//       assert(_.isArray(wrapper.instance().getDisabledHours()), 'return array of numbers');
//       assert.equal(wrapper.instance().getDisabledHours().length, 8, 'return array of length 8');
//       wrapper.instance().getDisabledHours().forEach((hourPos) => {
//         assert(_.isNumber(hourPos), 'contains numbers');
//       });
//       const producedHourPositions = wrapper.instance().getDisabledHours();
//       shouldReturn.forEach((expectedPosition) => {
//         assert(_.includes(producedHourPositions, expectedPosition), 'contains correct posiotion numbers');
//       });
//     });
//   });

//   describe('return disabled hour positions based on `minDate` prop', () => {
//     it('return disabled hour positions position numbers', () => {
//       const wrapper = shallow(<HourPicker
//         minDate={moment('2018-08-12 03:00')}
//         initializeWith={date} />);
      
//       const shouldReturn = [
//         0, 1, 2,
//       ]; //disabled hours position numbers
//       assert(_.isArray(wrapper.instance().getDisabledHours()), 'return array of numbers');
//       assert.equal(wrapper.instance().getDisabledHours().length, 3, 'return array of length 3');
//       wrapper.instance().getDisabledHours().forEach((hourPos) => {
//         assert(_.isNumber(hourPos), 'contains numbers');
//       });
//       const producedHourPositions = wrapper.instance().getDisabledHours();
//       shouldReturn.forEach((expectedHourPos) => {
//         assert(_.includes(producedHourPositions, expectedHourPos), 'contains correct posiotion numbers');
//       });
//     });
//   });

//   describe('return disabled hour positions based on `minDate`, `maxDate`, `disable` props', () => {
//     it('return disabled hour positions position numbers', () => {
//       const wrapper = shallow(<HourPicker
//         minDate={moment('2018-08-12 03:00')}
//         maxDate={moment('2018-08-12 19:00')}
//         disable={[moment('2018-08-12 12:00'), moment('2018-08-12 14:00')]}
//         initializeWith={date} />);
//       const shouldReturn = [
//         0, 1, 2,
//         12, 14,
//         20, 21, 22, 23,
//       ]; //disabled hours position numbers
//       assert(_.isArray(wrapper.instance().getDisabledHours()), 'return array of numbers');
//       assert.equal(wrapper.instance().getDisabledHours().length, 9, 'return array of length 9');
//       wrapper.instance().getDisabledHours().forEach((hourPos) => {
//         assert(_.isNumber(hourPos), 'contains numbers');
//       });
//       const producedHourPositions = wrapper.instance().getDisabledHours();
//       shouldReturn.forEach((expectedHourPos) => {
//         assert(_.includes(producedHourPositions, expectedHourPos), 'contains correct posiotion numbers');
//       });
//     });
//   });

//   describe('return disabled hour positions when none of `minDate`, `maxDate`, `disable` props provided', () => {
//     it('return disabled hour positions position numbers', () => {
//       const wrapper = shallow(<HourPicker
//         initializeWith={date} />);
      
//       assert(_.isUndefined(wrapper.instance().getDisabledHours()), 'return undefined');
//     });
//   });
// });

// describe('<HourPicker />: isNextPageAvailable', () => {
//   const date = moment('2018-08-12');

//   describe('is not available by maxDate', () => {
//     it('return false', () => {
//       const wrapper = shallow(<HourPicker
//         maxDate={moment('2018-08-12')}
//         initializeWith={date} />);
      
//       assert(_.isBoolean(wrapper.instance().isNextPageAvailable()), 'return boolean');
//       assert.isFalse(wrapper.instance().isNextPageAvailable(), 'return false');
//     });
//   });

//   describe('available by maxDate', () => {
//     it('return true', () => {
//       const wrapper = shallow(<HourPicker
//         maxDate={moment('2018-08-13')}
//         initializeWith={date} />);
      
//       assert(_.isBoolean(wrapper.instance().isNextPageAvailable()), 'return boolean');
//       assert.isTrue(wrapper.instance().isNextPageAvailable(), 'return true');
//     });
//   });
// });

// describe('<HourPicker />: isPrevPageAvailable', () => {
//   const date = moment('2018-08-12');

//   describe('is not available by minDate', () => {
//     it('return false', () => {
//       const wrapper = shallow(<HourPicker
//         minDate={moment('2018-08-12')}
//         initializeWith={date} />);
      
//       assert(_.isBoolean(wrapper.instance().isPrevPageAvailable()), 'return boolean');
//       assert.isFalse(wrapper.instance().isPrevPageAvailable(), 'return false');
//     });
//   });

//   describe('available by minDate', () => {
//     it('return true', () => {
//       const wrapper = shallow(<HourPicker
//         minDate={moment('2018-07-11')}
//         initializeWith={date} />);
      
//       assert(_.isBoolean(wrapper.instance().isPrevPageAvailable()), 'return boolean');
//       assert.isTrue(wrapper.instance().isPrevPageAvailable(), 'return true');
//     });
//   });
// });

// describe('<HourPicker />: getCurrentDate', () => {
//   const date = moment('2018-08-12');

//   it('return string in format `MMMM DD, YYYY`', () => {
//     const wrapper = shallow(<HourPicker
//       initializeWith={date} />);
    
//     assert(_.isString(wrapper.instance().getCurrentDate()), 'return string');
//     assert.equal(wrapper.instance().getCurrentDate(), date.format('MMMM DD, YYYY'), 'return proper value');
//   });
// });

// describe('<HourPicker />: handleChange', () => {
//   const date = moment('2018-08-12');

//   it('call onChangeFake with { year: number, month: number, date: number, hour: number }', () => {
//     const onChangeFake = sinon.fake();
//     const wrapper = shallow(<HourPicker
//       onChange={onChangeFake}
//       initializeWith={date} />);
//     const possibleValues = wrapper.instance().buildHours();
//     wrapper.instance().handleChange('click', { value: possibleValues[15]});
//     const calledWithArgs = onChangeFake.args[0];

//     assert(onChangeFake.calledOnce, 'onChangeFake called once');
//     assert.equal(calledWithArgs[0], 'click', 'correct first argument');
//     assert.equal(calledWithArgs[1].value.year, 2018, 'correct year');
//     assert.equal(calledWithArgs[1].value.month, 7, 'correct month');
//     assert.equal(calledWithArgs[1].value.date, 12, 'correct date');
//     assert.equal(calledWithArgs[1].value.hour, 15, 'correct hour');
//   });
// });

// describe('<HourPicker />: switchToNextPage', () => {
//   const date = moment('2018-08-12');

//   it('shift `date` state field one day forward', () => {
//     const wrapper = shallow(<HourPicker
//       initializeWith={date} />);
    
//     assert.equal(wrapper.state('date').date(), 12, 'date not changed yet');
//     wrapper.instance().switchToNextPage();
//     assert.equal(wrapper.state('date').date(), 12 + 1, 'date shifted one day forward');
//   });
// });

// describe('<HourPicker />: switchToPrevPage', () => {
//   const date = moment('2018-08-12');

//   it('shift `date` state field one day backward', () => {
//     const wrapper = shallow(<HourPicker
//       initializeWith={date} />);
    
//     assert.equal(wrapper.state('date').date(), 12, 'date not changed yet');
//     wrapper.instance().switchToPrevPage();
//     assert.equal(wrapper.state('date').date(), 12 - 1, 'date shifted one day backward');
//   });
// });