import React from 'react';
import { Table } from 'semantic-ui-react';

import { getWeekDays } from '../../lib';

const cellStyle = { 
  border: 'none',
  borderBottom: '1px solid rgba(34,36,38,.1)'
};

const weekDayCells = getWeekDays().map((weekDay) => (
  <Table.HeaderCell
    key={weekDay}
    style={cellStyle}
    colSpan="1">
    {weekDay}
  </Table.HeaderCell>
));

function HeaderWeeks() {
  return (
    <Table.Row>
      { weekDayCells }
    </Table.Row>
  );
}

export default HeaderWeeks;
