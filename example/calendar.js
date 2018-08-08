import React from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'semantic-ui-react';
// import {
//   DateInput,
//   TimeInput,
//   DateTimeInput,
//   DatesRangeInput,
//   YearInput,
//   MonthInput
// } from '../src';
import moment from 'moment';

import HourView from '../src/views/HourView';

moment.locale('en');

function App() {
  return (
    <div className="example-calendar-container">
      <HourView
        // days={[
        //   '28','29','30','31','1','2','3',
        //   '4','5','6','7','8','9','10',
        //   '11','12','13','14','15','16','17',
        //   '18','19','20','21','22','23','24',
        //   '25','26','27','28','29','30','1',
        //   '2','3','4','5','6','7','8',
        // ]}
        hasHeader
        hours={[
          '00:00', '01:00', '02:00', '03:00', '04:00',
          '05:00', '06:00', '07:00', '08:00', '09:00',
          '10:00', '11:00', '12:00', '13:00', '14:00',
          '15:00', '16:00', '17:00', '18:00', '19:00',
          '20:00', '21:00', '22:00', '23:00'
        ]}
        onHourClick={(e, {value}) => console.log(value)}
        // active={{start: 8, end: 12}}
        // disabled={[0,1,2,3]}
        currentDate="hello world" />
      {/* <h2>As text fields</h2>
      <DateTimeForm />
      <h2>Inline</h2>
      <DateTimeFormInline /> */}
    </div>
  );
}

// class DateTimeForm extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       year: '',
//       month: '',
//       date: '',
//       dateStartYear: '',
//       time: '',
//       dateTime: '',
//       datesRange: ''
//     };
//   }

//   handleChange = (event, {name = undefined, value}) => {
//     if (this.state.hasOwnProperty(name)) {
//       this.setState({ [name]: value });
//     }
//   }

//   render() {
//     return (
//       <Form>
//         <DateInput
//           placeholder="Date"
//           className="example-calendar-input"
//           name="date"
//           value={this.state.date}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <DateInput
//           startMode="year"
//           popupPosition="bottom left"
//           placeholder="Date startMode year"
//           className="example-calendar-input"
//           name="dateStartYear"
//           value={this.state.dateStartYear}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <TimeInput
//           placeholder="Time"
//           className="example-calendar-input"
//           name="time"
//           value={this.state.time}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <DateTimeInput
//           placeholder="Date Time"
//           className="example-calendar-input"
//           name="dateTime"
//           value={this.state.dateTime}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <DatesRangeInput
//           dateFormat="DD.MM.YY"
//           placeholder="From - To"
//           className="example-calendar-input"
//           name="datesRange"
//           value={this.state.datesRange}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <YearInput
//           placeholder="Year"
//           className="example-calendar-input"
//           name="year"
//           value={this.state.year}
//           iconPosition="left"
//           onChange={this.handleChange} />
//         <br />
//         <MonthInput
//           placeholder="Month"
//           className="example-calendar-input"
//           name="month"
//           value={this.state.month}
//           iconPosition="left"
//           onChange={this.handleChange} />
//       </Form>
//     );
//   }
// }

// class DateTimeFormInline extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       year: '',
//       month: '',
//       date: '',
//       time: '',
//       dateTime: '',
//       datesRange: ''
//     };
//   }

//   handleYearChange = (event, { value }) => {
//     this.setState({ year: value });
//   }

//   handleMonthChange = (event, { value }) => {
//     this.setState({ month: value });
//   }

//   handleDateChange = (event, { value }) => {
//     this.setState({ date: value });
//   }

//   handleTimeChange = (event, { value }) => {
//     this.setState({ time: value });
//   }

//   handleDateTimeChange = (event, { value }) => {
//     this.setState({ dateTime: value });
//   }

//   handleDatesRangeChange = (event, { value }) => {
//     this.setState({ datesRange: value });
//   }

//   render() {
//     return (
//       <Form>
//         <DateInput
//           disable={['17-05-2018', '21-05-2018']}
//           inline
//           className="example-calendar-input"
//           value={this.state.date}
//           onChange={this.handleDateChange} />
//         <br />
//         <TimeInput
//           inline
//           className="example-calendar-input"
//           value={this.state.time}
//           onChange={this.handleTimeChange} />
//         <br />
//         <DateTimeInput
//           inline
//           className="example-calendar-input"
//           value={this.state.dateTime}
//           onChange={this.handleDateTimeChange} />
//         <br />
//         <DatesRangeInput
//           inline
//           className="example-calendar-input"
//           value={this.state.datesRange}
//           onChange={this.handleDatesRangeChange} />
//         <br />
//         <YearInput
//           inline
//           className="example-calendar-input"
//           value={this.state.year}
//           onChange={this.handleYearChange} />
//         <br />
//         <MonthInput
//           inline
//           className="example-calendar-input"
//           value={this.state.month}
//           onChange={this.handleMonthChange} />
//       </Form>
//     );
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('root')
);