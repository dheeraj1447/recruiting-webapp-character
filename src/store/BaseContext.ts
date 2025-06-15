export interface BaseContextProps<S, A> {
  state: S;
  dispatch: React.Dispatch<A>;
}

export interface BaseContextProviderProps<S, A> {
  initialState: S;
  reducer: React.Reducer<S, A>;
  children: React.ReactNode;
}
