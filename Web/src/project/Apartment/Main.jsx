import { Provider } from "react-redux"
import { Nav } from "./Nav"
import { BrowserRouter } from "react-router"
import { Routing } from "./Routing"
import store from "./redux/store"



export const Main = () => {
    return <>
            <Provider store={store}>
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>
      
    </>
}