// actions.ts
export const actionCreator1 = (payload1: number) => ({ type: 'ACTION_TYPE_1', payload: payload1 }) as const;
export const actionCreator2 = (payload2: string) => ({ type: 'ACTION_TYPE_2', payload: payload2 }) as const;
export const actionCreator3 = (payload3: boolean) => ({ type: 'ACTION_TYPE_3', payload: payload3 }) as const;

// types.ts
import * as actions from './actions';

type InferValues<T> = T extends { [key: string]: infer TActionCreator } ? ReturnType<TActionCreator> : never;
export type IActions = InferValues<typeof actions>;

type InferType<U> = U extends { type: infer TType, [key: string]: unknown } ? TType : never;
export type IActionsTypes = InferType<IActions>;

// reducer.ts
import { IActions } from './actions';

export const reducer = (store: {}, action: IActions) => {
    switch (action.type) {
        case 'ACTION_TYPE_1': return { ...store, payload: action.payload };
    }
}

reducer({}, { type: 'ACTION_TYPE_2', payload: '2' });
