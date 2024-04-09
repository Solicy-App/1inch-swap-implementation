import React from "react";

export interface IInputGroup {
  coinName: string;
  title: string;
  amount: number | string;
  children: React.ReactNode;
}

export interface IInputField {
  label: string;
  type: string;
  name: string;
  className: string;
  id: string;
  step?: string;
  defaultValue?: number | string;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
