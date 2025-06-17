"use client";

import { useForm } from "react-hook-form";
import { IUseDynamicForm } from "./Form.types";

const useDynamicForm = (defaultValues: IUseDynamicForm) => {
  const { register, handleSubmit } = useForm(defaultValues);
  return { register, handleSubmit };
};

export default useDynamicForm;
