import { assert } from 'chai';
import _ from 'lodash';
import moment from 'moment';

import {
  getInitializer,
} from '../../src/inputs/parse';

describe('getInitializer', () => {
  const dateFormat = 'YYYY-MM-DD HH:mm';
  describe('`value` param provided', () => {
    it('return valid moment created from `value`', () => {
      const value = '2018-05-15 14:12';
      assert(moment.isMoment(getInitializer(value, undefined, dateFormat)), 'return moment');
      assert(getInitializer(value, undefined, dateFormat).isValid(), 'return valid moment');
      assert(
        getInitializer(value, undefined, dateFormat).isSame(moment(value, dateFormat), 'minute'),
        'return correct moment');
    });
  });

  describe('`initialDate` param provided', () => {
    it('return valid moment created from `initialDate`', () => {
      const initialDate = '2018-05-15 14:12';
      assert(moment.isMoment(getInitializer(undefined, initialDate, dateFormat)), 'return moment');
      assert(getInitializer(undefined, initialDate, dateFormat).isValid(), 'return valid moment');
      assert(
        getInitializer(undefined, initialDate, dateFormat).isSame(moment(initialDate, dateFormat), 'minute'),
        'return correct moment');
    });
  });

  describe('`value` and `initialDate` params provided', () => {
    it('return valid moment created from `value`', () => {
      const value = '2018-05-15 14:12';
      const initialDate = '2020-05-15 15:00';
      assert(moment.isMoment(getInitializer(value, initialDate, dateFormat)), 'return moment');
      assert(getInitializer(value, initialDate, dateFormat).isValid(), 'return valid moment');
      assert(
        getInitializer(value, initialDate, dateFormat).isSame(moment(value, dateFormat), 'minute'),
        'return correct moment');
    });
  });

  describe('`value` and `initialDate` params are not provided', () => {
    it('return valid default moment', () => {
      assert(moment.isMoment(getInitializer(undefined, undefined, dateFormat)), 'return moment');
      assert(getInitializer(undefined, undefined, dateFormat).isValid(), 'return valid moment');
    });
  });
});
