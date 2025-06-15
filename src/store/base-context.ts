import { BaseContextProps } from './BaseContext';
import { createContext } from 'react';

export const BaseContext = createContext<
  BaseContextProps<any, any> | undefined
>(undefined);
