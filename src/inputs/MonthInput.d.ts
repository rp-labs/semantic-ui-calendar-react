import * as React from 'react';
import Moment from 'moment';

export interface MonthInputProps {
  [key: string]: any;

  /**
   * Called when the user attempts to change the value.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props and proposed value.
   */
  onChange: (
    event: React.SyntheticEvent<HTMLInputElement>,
    data: MonthInputOnChangeData
  ) => void;

  /** Shorthand for Icon. */
  icon?: any;

  /** Position for the popup. */
  popupPosition?:
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center';

  /** Should close when cursor leaves calendar popup */
  closeOnMouseLeave?: boolean;

  /** A month input can be formatted to appear inline in other content. */
  inline?: boolean;

  /** Current value. Creates a controlled component. */
  value?: string;

  /** Should popup close after date selection. */
  closable?: boolean;

  /** A field can have its label next to instead of above it. */
  inlineLabel?: boolean;

  /** Moment date formatting string. */
  dateFormat?: string;

  /** Date or list of dates that are displayed as disabled. */
  disable?: string | Moment | Date | string[] | Moment[] | Date[];

  /** Maximum date that can be selected. */
  maxDate?: string | Moment | Date | string[] | Moment[] | Date[];

  /** Minimum date that can be selected. */
  minDate?: string | Moment | Date | string[] | Moment[] | Date[];
}

export interface MonthInputOnChangeData extends MonthInputProps {
  value: string;
}

declare class MonthInput extends React.Component<MonthInputProps, {}> {}

export default MonthInput;
