'use client';

import dayjs from 'dayjs';
import { CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({ date, onDateChange }: DatePickerProps) {
  return (
    <Field orientation="horizontal">
      <FieldLabel htmlFor="date-picker-range">Período</FieldLabel>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className="min-w-55 justify-start px-2.5 font-normal"
            id="date-picker-range"
            variant="outline"
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {dayjs(date.from).format('DD/MM/YYYY')} -{' '}
                  {dayjs(date.to).format('DD/MM/YYYY')}
                </>
              ) : (
                dayjs(date.from).format('DD/MM/YYYY')
              )
            ) : (
              <span>Selecione uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            defaultMonth={date?.from}
            disabled={[
              !!date?.from && !date?.to
                ? {
                    before: dayjs(date.from).subtract(7, 'day').toDate(),
                    after: dayjs(date.from).add(7, 'day').toDate(),
                  }
                : false,
            ]}
            max={7}
            mode="range"
            numberOfMonths={2}
            onSelect={onDateChange}
            resetOnSelect
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
