"use client";

import React, { useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { FORM_TYPES, IFormFieldTypeProps } from "./Form.types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { CommandEmpty } from "cmdk";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Check, ChevronDown, CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";

const FormField = <T extends FieldValues>({
  field,
  formRegister,
  formControl,
  errors,
}: IFormFieldTypeProps<T>) => {
  const { field: controlField } = useController({
    name: field.fieldName,
    control: formControl,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  switch (field.type) {
    case FORM_TYPES.TEXT:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          {field.prefix ? (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {field.prefix}
              </span>
              <Input
                id={field.fieldName}
                {...formRegister(field.fieldName as never)}
                type="text"
                disabled={field.isDisabled}
                placeholder={field.placeholder}
                className={cn(
                  "pl-7",
                  errors[field.fieldName]?.message
                    ? "error-border ring-0 focus-visible:ring-0"
                    : ""
                )}
              />
            </div>
          ) : (
            <Input
              id={field.fieldName}
              {...formRegister(field.fieldName as never)}
              type="text"
              disabled={field.isDisabled}
              placeholder={field.placeholder}
              className={cn(
                errors[field.fieldName]?.message
                  ? "error-border ring-0 focus-visible:ring-0"
                  : "border border-main"
              )}
            />
          )}
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.TEXTAREA:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Textarea
            id={field.fieldName}
            {...formRegister(field.fieldName as never)}
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : ""
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.NUMBER:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName as never, { valueAsNumber: true })}
            type="number"
            min="0"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : "border border-main"
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.DATE:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            style={{ minWidth: "200px" }}
            id={field.fieldName}
            {...formRegister(field.fieldName as never)}
            type="date"
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : ""
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.DATE_PICKER:
      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full pl-3 text-left font-normal bg-2 border-main text-secondarry",
                  !controlField.value && "text-muted-foreground",
                  errors[field.fieldName]?.message
                    ? "error-border ring-0 focus-visible:ring-0"
                    : ""
                )}
              >
                {controlField.value ? (
                  format(controlField.value, "PPP")
                ) : (
                  <span>{field.placeholder || "MM/DD/YYYY"}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 bg-2 border-main primary-text"
              align="start"
            >
              <Calendar
                mode="single"
                selected={controlField.value}
                onSelect={(date) => controlField.onChange(date)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                className="primary-text"
              />
            </PopoverContent>
          </Popover>
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );

    case FORM_TYPES.CHECKBOX:
      const {
        name: checkBoxName,
        onChange: checkBoxOnChange,
        value: checkboxValue,
        onBlur: checkboxOnBlur,
      } = controlField;
      return (
        <div className="flex gap-2 items-center">
          <Checkbox
            id={field.fieldName}
            name={checkBoxName}
            onCheckedChange={checkBoxOnChange}
            value={checkboxValue}
            onBlur={checkboxOnBlur}
            checked={checkboxValue}
          />
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
        </div>
      );

    case FORM_TYPES.SELECT:
      const { name, onChange, value, onBlur } = controlField;

      return (
        <div className="flex flex-col gap-[4px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Popover open={isPopupOpen} onOpenChange={setIsPopupOpen}>
            <PopoverTrigger
              asChild
              className={cn(
                errors[field.fieldName]?.message
                  ? "error-border ring-0 focus-visible:ring-0"
                  : ""
              )}
            >
              <Button
                disabled={field.isLoading || field.isDisabled}
                role="combobox"
                id={field.fieldName}
                variant="outline"
                className="flex gap-2 justify-between overflow-hidden thin-scrollbar bg-2 border-main  "
              >
                {value?.label || value || field.placeholder || "Select"}
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            {errors[field.fieldName]?.message && (
              <p className="text-[10px] text-red-500">
                {errors[field.fieldName]?.message?.toString()}
              </p>
            )}
            <PopoverContent className="h-[150px] thin-scrollbar  border-main primary-text bg-2">
              <Command className="bg-2 text-white">
                <CommandInput placeholder="Search..." className="h-9 " />
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup className="overflow-y-scroll thin-scrollbar bg-2">
                  {field.options?.map((option) => (
                    <CommandItem
                      className="cursor-pointer flex thin-scrollbar primary-text items-center gap-2 p-1 hover:bg-gray-200 dark:hover:bg-neutral-900"
                      key={option.value}
                      value={option.value}
                      onSelect={() => {
                        onChange(option.value);
                        setIsPopupOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          option.value === value?.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      );

    default:
      return (
        <div className="flex flex-col gap-[6px]">
          <Label htmlFor={field.fieldName}>{field.fieldLabel}</Label>
          <Input
            id={field.fieldName}
            {...formRegister(field.fieldName as never)}
            disabled={field.isDisabled}
            placeholder={field.placeholder}
            className={cn(
              errors[field.fieldName]?.message
                ? "error-border ring-0 focus-visible:ring-0"
                : ""
            )}
          />
          {errors[field.fieldName]?.message && (
            <p className="text-[10px] text-red-500">
              {errors[field.fieldName]?.message?.toString()}
            </p>
          )}
        </div>
      );
  }
};

export { FormField };
