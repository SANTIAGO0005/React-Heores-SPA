const { render, screen, fireEvent } = require("@testing-library/react")
const { MemoryRouter } = require("react-router-dom")
const { SearchPage } = require("../../../src/heroes/pages/SearchPage")

const mockedUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate : () => mockedUseNavigate,
}))

describe('Pruebas en el <SearchPage/>', () => {

    beforeEach(() => jest.clearAllMocks())

    test('debe de mostrarse correctamente con valores por defecto', () => {

        const { container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        )
        expect(container).toMatchSnapshot()


    })
    
    test('debe de mostrar a Batman y el input con el valor del queryString', () => { 

        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        )
        
        const input = screen.getByRole('textbox')
        expect( input.value).toBe('batman')
        
        const  img = screen.getByRole('img')
        expect( img.src).toContain('/assets/heroes/dc-batman.jpg')
        
        const DivSearch = screen.getByLabelText('div-search_a_hero')
        expect( DivSearch.style.display).toBe('none')

    })

    test('debe de mostrar un error si no se encuentra el hero (batman123)', () => { 
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        )

        const DivSearch = screen.getByLabelText('div-no_hero')
        expect( DivSearch.style.display).not.toBe('none')

    })
    
    test('debe de llamar el navigate a la pantalla nueva', () => { 

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        )
        const input = screen.getByRole('textbox')
        
        fireEvent.change(input,{target: { name :'searchText', value :'superman'}})
        
        const form = screen.getByLabelText('form')
        fireEvent.submit(form)

        expect(mockedUseNavigate).toBeCalledWith('?q=superman')
    })
})