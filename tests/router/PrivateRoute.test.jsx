import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { AuthContext } from "../../src/auth/context"
import { PrivateRoute } from "../../src/router/PrivateRoute"

describe('Pruebas en el <PrivateRoute/>', () => { 

    Storage.prototype.setItem = jest.fn()

    test('debe de mostrar el children si esta autenticado', () => { 
        const contextValue = {
            logged: true,
            user : {
                name: 'Pedro Sanchez',
                id: 'abc'
            }
        }
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Ruta privada')).toBeTruthy()
        expect( localStorage.setItem).toBeCalledWith('lastPath','/marvel')
     })
 })