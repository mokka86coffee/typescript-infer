// actions.ts
export const actionCreator1 = (payload1: 1) => ({ type: 'ACTION_TYPE_1', payload: payload1 }) as const;
export const actionCreator2 = (payload2: 'string') => ({ type: 'ACTION_TYPE_2', payload: payload2 }) as const;
export const actionCreator3 = (payload3: false) => ({ type: 'ACTION_TYPE_3', payload: payload3 }) as const;

// types.ts
import * as actions from './actions';

type InferActionCreators<O> = O extends { [key: string]: infer TActionCreator } ? TActionCreator : never;
type IActionCreators = InferActionCreators<typeof actions>;

type InferActions<T> = T extends (payload: unknown) => infer TAction ? TAction : never;
export type IActions = InferActions<IActionCreators>;

type InferType<U> = U extends { type: infer TType, [key: string]: unknown } ? TType : never;
export type IActionsTypes = InferType<IActions>;

type InferPayload<U> = U extends (payload: infer TPayload) => unknown ? TPayload : never;
export type IActionsPayload = InferPayload<IActionCreators>;

// reducer.ts
import { IActions } from './actions';

export const reducer = (store: {}, action: IActions) => {
    switch (action.type) {
        case 'ACTION_TYPE_1': return { ...store, payload: action.payload  };
    }
}

reducer({}, { type: 'ACTION_TYPE_1', payload: 1 });
