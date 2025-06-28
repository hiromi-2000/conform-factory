import { getInputProps, type FieldMetadata } from "@conform-to/react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
  Text,
} from "react-aria-components";
import type {
  ButtonProps,
  DatePickerProps,
  DateValue,
  PopoverProps,
} from "react-aria-components";
import { parseDate } from "@internationalized/date";
import { useState } from "react";

interface DatePickerFieldProps
  extends Omit<DatePickerProps<DateValue>, "children"> {
  field: FieldMetadata<Date>;
  label: string;
  required?: boolean;
}

export const DatePickerField = ({
  field,
  label,
  required,
  ...props
}: DatePickerFieldProps) => {
  const [value, setValue] = useState<DateValue | null>(
    field.value ? parseDate(field.value) : null
  );
  const hasError = field.errors && field.errors.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <DatePicker
        {...props}
        value={value}
        onChange={setValue}
        className="group flex flex-col gap-2"
        isInvalid={hasError}
      >
        <Label className="text-sm font-medium text-gray-900 group-disabled:text-gray-400">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        <Group className="border border-gray-300 rounded-md shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 group-invalid:border-red-500 group-invalid:ring-red-500 transition-colors duration-200 bg-white flex">
          <DateInput className="flex flex-1 px-3 py-2">
            {(segment) => (
              <DateSegment
                segment={segment}
                className="px-0.5 tabular-nums outline-none rounded focus:bg-blue-500 focus:text-white caret-transparent placeholder-shown:italic"
              />
            )}
          </DateInput>
          <Button className="outline-none flex items-center text-gray-600 transition border-0 border-solid border-l border-l-gray-300 bg-transparent px-3 hover:bg-gray-50 pressed:bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400">
            📅
          </Button>
        </Group>
        <MyPopover>
          <Dialog className="p-6 text-gray-600">
            <Calendar>
              <header className="flex items-center gap-1 pb-4 px-1 font-serif w-full">
                <Heading className="flex-1 font-semibold text-2xl ml-2" />
                <RoundButton slot="previous">⬅️</RoundButton>
                <RoundButton slot="next">➡️</RoundButton>
              </header>
              <CalendarGrid className="border-spacing-1 border-separate">
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="text-xs text-gray-500 font-semibold">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className="w-9 h-9 outline-none cursor-default rounded-full flex items-center justify-center outside-month:text-gray-300 hover:bg-gray-100 pressed:bg-gray-200 selected:bg-blue-500 selected:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </MyPopover>
        <input
          {...getInputProps(field, { type: "hidden" })}
          value={value ? value.toString() : ""}
        />
      </DatePicker>
      {hasError && (
        <Text slot="errorMessage" className="text-sm text-red-600">
          {field.errors?.[0]}
        </Text>
      )}
    </div>
  );
};

function RoundButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      className="w-9 h-9 outline-none cursor-default bg-transparent text-gray-600 border-0 rounded-full flex items-center justify-center hover:bg-gray-100 pressed:bg-gray-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    />
  );
}

function MyPopover(props: PopoverProps) {
  return (
    <Popover
      {...props}
      className={({ isEntering, isExiting }) => `
        overflow-auto rounded-lg drop-shadow-lg ring-1 ring-black/10 bg-white
        ${
          isEntering
            ? "animate-in fade-in placement-bottom:slide-in-from-top-1 placement-top:slide-in-from-bottom-1 ease-out duration-200"
            : ""
        }
        ${
          isExiting
            ? "animate-out fade-out placement-bottom:slide-out-to-top-1 placement-top:slide-out-to-bottom-1 ease-in duration-150"
            : ""
        }
      `}
    />
  );
}
