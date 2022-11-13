import { authReducer } from "../../../src/auth/context/authReducer"
import { types } from "../../../src/auth/types/types"

describe('Pruebas en authReducer', () => {

    const name = 'Santiago cifuentes'
    const user = {id : 'ABC',name}

    

    test('debe de regresar el estado por defecto', () => {

        const initialState = {
                logged : false,
            }

        const StateDefault =authReducer(initialState,{})
        expect( StateDefault).toEqual(initialState)
    })
    
    test('debe de (login) llamar el login autenticar y establecer el user', () => {

        const action ={type: types.login, payload: user}
        const state = {
            logged : false,
            user:user
        }

        const newState = authReducer(state,action)
        expect(newState.user).toEqual(action.payload)
        expect(newState.logged).toBeTruthy()
    })

    test('debe de (logout) borrar el name del usuario y logged en false', () => {

        const state = {
            logged : true,
            user:user
        }
        const action ={type: types.logout,}

        const newState = authReducer(state,action)
        expect(newState.logged).toBeFalsy()
        

    })
})