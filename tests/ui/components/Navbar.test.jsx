import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '../../../src/auth'
import { Navbar } from '../../../src/ui/components/Navbar'

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate : () => mockedUseNavigate,
}))



describe('Pruebas en <Navbar/>', () => {

    const contextValue = {
            logged: true,
            user:{
                name: 'Santiago',
                id: 'ABC'
            },
            logout: jest.fn()
        }
    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrar el nombre del usuario', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Navbar>

                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        expect(screen.getByText('Santiago')).toBeTruthy()
        
     })

     test('debe de llamar al logout y navigate cuando se hace click en el boton', () => {

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <Navbar>
                    
                    </Navbar>
                </MemoryRouter>
            </AuthContext.Provider>
        )
        const logout = screen.getByRole('button')
        fireEvent.click(logout)
        expect(contextValue.logout).toHaveBeenCalled()
        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {"replace": true})
     })
 })