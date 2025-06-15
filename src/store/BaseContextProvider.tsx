import { useReducer } from "react";
import { BaseContextProviderProps } from "./BaseContext";
import { BaseContext } from "./base-context";

export const BaseContextProvider = <S, A>({
  initialState,
  reducer,
  children,
}: BaseContextProviderProps<S, A>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BaseContext.Provider value={{ state, dispatch }}>
      {children}
    </BaseContext.Provider>
  );
};