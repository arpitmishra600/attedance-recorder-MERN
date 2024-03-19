import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import useContextHook from './context/contextHook';

export default function Calender() {
  const {setSelectedDate,selectedDate}=useContextHook()
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
          <DateCalendar value={selectedDate} onChange={(newValue) => setSelectedDate(newValue)} />
      </DemoContainer>
    </LocalizationProvider>
  );
}