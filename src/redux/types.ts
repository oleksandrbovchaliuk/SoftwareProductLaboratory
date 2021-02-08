enum ActionType {
  RESET = '[global]: reset',
  UPDATE = '[global]: update',
}

type ResetAction = ReduxAction<ActionType.RESET>
type UpdateAction = ReduxAction<
  ActionType.UPDATE,
  { path: string | string[]; value: unknown }
>

export type Action = ResetAction | UpdateAction

export default ActionType
