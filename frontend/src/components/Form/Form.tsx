"use client";

import React, { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { IFormProps } from "./Form.types";
import { FormField } from "./FormFields";

const Form = <T extends FieldValues>({
  fields,
  onSubmit,
  defaultValues,
  loading,
  resetTrigger,
  setResetTrigger,
  schema,
  grid,
  inViewMode = false,
}: IFormProps<T>) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<T>({
    defaultValues: defaultValues,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  useEffect(() => {
    if (resetTrigger) {
      reset();
      setResetTrigger(false);
    }
  }, [resetTrigger, reset, setResetTrigger]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col">
        <div
          className={cn(
            grid
              ? typeof grid === "string"
                ? grid
                : "grid grid-cols-2 gap-x-6 gap-y-5"
              : "flex flex-col gap-3"
          )}
        >
          {fields.map((field) => (
            <FormField<T>
              key={field.fieldName}
              field={field}
              formRegister={register}
              formControl={control}
              errors={errors}
            />
          ))}
        </div>
        {!inViewMode && (
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="bg-2 border-main text-secondarry"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-primary text-white"
            >
              {loading ? "Submitting..." : "Add Model"}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};

export default Form;
