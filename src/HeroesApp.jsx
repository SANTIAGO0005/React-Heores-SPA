import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"


export const HeroesApp = () => {
    return (
        <AuthProvider>
            <AppRouter/>
            {/* <h1>Heroes app</h1> */}
        </AuthProvider>
    )
}

