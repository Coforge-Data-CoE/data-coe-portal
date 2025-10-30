import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickerValidValue, PickerValue } from "@mui/x-date-pickers/internals";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface DatePickerProps {
  value: PickerValue;
  onValueChange: (value: PickerValue, context: PickerChangeHandlerContext<DateValidationError>) => void
}

const BasicDatePicker = ({ value, onValueChange }: DatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          className="ssis-datepicker"
          sx={{ width: 150 }}
          value={value}
          onChange={(newValue: PickerValue, context: PickerChangeHandlerContext<DateValidationError>) => onValueChange(newValue, context)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default BasicDatePicker;
