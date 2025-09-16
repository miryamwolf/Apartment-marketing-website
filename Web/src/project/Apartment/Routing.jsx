import { Route, Routes } from "react-router"
import { AllApartments } from "./AllApartments"
import { Home } from "./Home"
import { Register } from "./Register"
import { Login } from "./Login"
import { AddApartment } from "./AddApartment"
import { DelOrUpdate } from "./DelOrUpdate"
import { UpdateApartment } from "./UpdateApartment"

export const Routing = () => {
    return <>
        <Routes>
            <Route path="allapartments" element={<AllApartments></AllApartments>}></Route>
            <Route path="register" element={<Register></Register>}></Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="" element={<Home></Home>}></Route>
            <Route path="removeorupdateapartment" element={<DelOrUpdate></DelOrUpdate>}></Route>
            <Route path="addapartment" element={<AddApartment></AddApartment>}></Route>
            <Route path="updeteapartment" element={<UpdateApartment></UpdateApartment>}></Route>
        </Routes>
    </>
}