import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

interface DateInputProps {
  value?: string;
  onClick?: () => void;
}

interface DatePickerComponentProps {
  id: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  maxDate?: Date;
  minDate?: Date;
  label: string;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(({ value, onClick }, ref) => {
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation();

  return (
    <div className='relative w-full'>
      <input
        type='text'
        readOnly
        value={value}
        className='rounded border leading-tight w-full py-2 px-3 text-gray-700 focus:outline-none'
        onClick={handleInputClick}
        placeholder='MM/dd/yyyy'
        ref={ref}
      />
      <FaCalendarAlt
        onClick={onClick}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-700'
      />
    </div>
  );
});

DateInput.displayName = 'DateInput';

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  id,
  selectedDate,
  onChange,
  maxDate,
  minDate,
  label
}) => {
  return (
    <div className='mb-4'>
      <label htmlFor={id} className='block mb-2'>
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        maxDate={maxDate}
        minDate={minDate}
        customInput={<DateInput />}
        dateFormat='MM/dd/yyyy'
        wrapperClassName='w-full'
        className='rounded border leading-tight w-full py-2 px-3 text-gray-700 focus:outline-none'
      />
    </div>
  );
};

export default DatePickerComponent;