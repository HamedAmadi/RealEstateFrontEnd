import {UserStateType} from "./UserContext"

export type ActionType =
  | {type: 'signIn', payload: boolean}
  | {type: 'setFullName', payload: string}
  | {type: 'signOut'}

  export const UserReducer = (state: UserStateType, action: ActionType) => {
  switch (action.type) {
    case 'signIn': {
      return {...state, isSignIn: action.payload}
    }
    case 'setFullName': {
      return {...state, fullName: action.payload}
    }
    case 'signOut': {
      return {
        isSignIn: false,
        fullName: null,
        userId: null
      }
    }
    default: return state
  }
}
