import {
  createElement,
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from "react";

export type ViewMode = "timeline" | "roam" | "cards";

export type HistoryScope =
  | { kind: "national" }
  | { kind: "province"; provinceId: string }
  | { kind: "city"; provinceId: string; cityId: string };

export interface HistoryState {
  scope: HistoryScope;
  viewMode: ViewMode;
  activeDynastySegmentId: string | null;
}

export type HistoryAction =
  | { type: "resetToNational" }
  | { type: "selectProvince"; provinceId: string }
  | { type: "selectCity"; provinceId: string; cityId: string }
  | { type: "selectViewMode"; viewMode: ViewMode }
  | { type: "selectDynastySegment"; dynastySegmentId: string | null };

export function createInitialHistoryState(): HistoryState {
  return {
    scope: { kind: "national" },
    viewMode: "timeline",
    activeDynastySegmentId: null,
  };
}

export function historyStateReducer(
  state: HistoryState,
  action: HistoryAction,
): HistoryState {
  switch (action.type) {
    case "resetToNational":
      return createInitialHistoryState();
    case "selectProvince":
      return {
        ...state,
        scope: { kind: "province", provinceId: action.provinceId },
        viewMode: "timeline",
      };
    case "selectCity":
      return {
        ...state,
        scope: {
          kind: "city",
          provinceId: action.provinceId,
          cityId: action.cityId,
        },
        viewMode: "timeline",
      };
    case "selectViewMode":
      return {
        ...state,
        viewMode: action.viewMode,
      };
    case "selectDynastySegment":
      return {
        ...state,
        activeDynastySegmentId: action.dynastySegmentId,
      };
    default:
      return state;
  }
}

interface HistoryContextValue {
  state: HistoryState;
  dispatch: Dispatch<HistoryAction>;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryContextProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(
    historyStateReducer,
    undefined,
    createInitialHistoryState,
  );

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state],
  );

  return createElement(HistoryContext.Provider, { value }, children);
}

export function useHistoryContext() {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistoryContext must be used within HistoryContextProvider");
  }

  return context;
}
