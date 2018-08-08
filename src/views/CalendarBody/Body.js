import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Cell from './Cell';

const cellStyleWidth3 = {
  width: '33.333333%',
  minWidth: '7em'
};

function buildRows(data/*array*/, width/*number*/) {
  const height = data.length / width;
  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(data.slice((i * width), (i * width) + width));
  }
  return rows;
}

function isActive(rowIndex, rowWidth, colIndex, activeIndex) {
  if (_.isNil(activeIndex)) return false;
  return rowIndex * rowWidth + colIndex === activeIndex;
}

function isDisabled(rowIndex, rowWidth, colIndex, disabledIndexes) {
  if (_.isNil(disabledIndexes) || disabledIndexes.length === 0) return false;
  for (let i = 0; i < disabledIndexes.length; i++) {
    if (rowIndex * rowWidth + colIndex === disabledIndexes[i]) return true;
  }
  return false;
}

function getCellStyle(width) {
  if (width === '3') {
    return cellStyleWidth3;
  }
  return;
}

function Body(props) {
  const {
    data,
    width,
    onCellClick,
    active,
    disabled,
  } = props;
  const content = buildRows(data, parseInt(width)).map((row, rowIndex) => (
    <Table.Row key={`${rowIndex}${row[0]}`}>
      { row.map((item, itemIndex) => (
        <Cell
          style={getCellStyle(width)}
          active={isActive(rowIndex, parseInt(width), itemIndex, active)}
          disabled={isDisabled(rowIndex, parseInt(width), itemIndex, disabled)}
          key={`${itemIndex}${item}`}
          content={item}
          onClick={onCellClick} />
      )) }
    </Table.Row>
  ));
  return (
    <Table.Body>
      { content }
    </Table.Body>
  );
}

Body.propTypes = {
  /** A number of columns in a row. */
  width: PropTypes.oneOf(
    ['3', '4', '7']
  ).isRequired,
  /** Data that is used to fill a calendar. */
  data: PropTypes.oneOfType(
    [
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.number),
    ]
  ).isRequired,
  /** Called after a click on calendar's cell. */
  onCellClick: PropTypes.func,
  /** Index of an element in `data` array that should be displayed as active. */
  active: PropTypes.number,
  /** Array of element indexes in `data` array that should be displayed as disabled. */
  disabled: PropTypes.arrayOf(PropTypes.number),
};

export default Body;
