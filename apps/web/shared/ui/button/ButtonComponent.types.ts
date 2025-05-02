import { ReactNode } from "react";

export interface ButtonComponentProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'ternary';
    children?: ReactNode;
  }
  