import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Cell from './Cell';

function buildRows(data/*array*/, width/*number*/) {
  const height = data.length / width;
  const rows = [];
  for (let i = 0; i < height; i++) {
    rows.push(data.slice((i * width), (i * width) + width));
  }
  return rows;
}

function Body(props) {
  const {
    data,
    width,
    onCellClick,
  } = props;
  const content = buildRows(data, parseInt(width)).map((row, rowIndex) => (
    <Table.Row key={`${rowIndex}${row[0]}`}>
      { row.map((item, itemIndex) => (
        <Cell
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
};

export default Body;
