"use client";

import {
  Control,
  DefaultValues,
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

export enum FORM_TYPES {
  TEXT = "text",
  TEXTAREA = "textarea",
  SELECT = "select",
  CHECKBOX = "checkbox",
  DATE = "date",
  NUMBER = "number",
  DATE_PICKER = "date-picker",
}

export type IOnSubmitPayload<T> = Record<keyof T, T[keyof T]>;

export interface IFields {
  fieldName: string;
  fieldLabel: string;
  type: string;
  options?: IFromSelectValues[];
  isDisabled?: boolean;
  isLoading?: boolean;
  prefix?: string;
  placeholder?: string;
}

export type IPayload = {
  fieldName: string;
};

export type IFormProps<T extends FieldValues> = {
  fields: IFields[];
  onSubmit: SubmitHandler<T>;
  defaultValues: DefaultValues<T> | undefined;
  loading: boolean;
  resetTrigger: boolean;
  setResetTrigger: (value: boolean) => void;
  schema?: any;
  project?: boolean;
  grid?: boolean | string;
  inViewMode?: boolean;
};

export interface IFormFieldTypeProps<T extends FieldValues> {
  field: IFields;
  formRegister: UseFormRegister<T>;
  formControl: Control<any>;
  errors: FieldErrors<FieldValues>;
}

export type IFromSelectValues = {
  value: string;
  label: string;
};

export type IUseDynamicForm = {
  defaultValues: FieldValues | Promise<FieldValues>;
};
