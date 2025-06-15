import { useContext } from "react";
import { BaseContextProps } from "./BaseContext";
import { BaseContext } from "./base-context";

export const useBaseContext = <S, A>() => {
  const context = useContext(
    BaseContext as React.Context<BaseContextProps<S, A> | undefined>
  );
  if (!context) {
    throw new Error('useBaseContext must be used within an ContextProvider');
  }
  return context;
};