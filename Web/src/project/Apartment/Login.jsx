import { useDispatch} from "react-redux"
import { useNavigate } from "react-router"
import swal from "sweetalert"
import { setCurrentAdveriser, } from "./redux/Action"
import  './style.css'
import { useState } from "react"
import { login } from "../api"

//import store from "./redux/Store"

export const Login = () => {

    const [errors, setErrors] = useState({})
    const navigate=useNavigate()

    const dis = useDispatch()

    const checkEmail = (value) => {
        let emailRegex =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!value.match(emailRegex)) {
            setErrors({ ...errors, email: ' כתובת מייל לא תקינה*' })
        }
        else {
            setErrors({ ...errors, email:''})
   
        }
    }

    const checkPass = value => {
        if (value.length < 8) {
            setErrors({ ...errors, password: 'סיסמה קצרה מידי*' })
        }
        else if (value.length > 12) {
            setErrors({ ...errors, password: 'סיסמה ארוכה מידי*' })
        }
        else {
            setErrors({ ...errors, password: '' })

        }
    }

    const start = (event) => {
        event.preventDefault();
        const advertiser = {
            email: event.target[0].value,
            password: event.target[1].value,
        }

        if(errors.email!=''||errors.password!=''){
            swal(`שגיאה `, 'קיימת שגיאה במילוי הנתונים אנא בדוק טופס', 'error')
            console.log(errors);
            
        }
        else{
            login(advertiser)
            .then(x=>{
              dis(setCurrentAdveriser(x.data.advertiser))
              
              
              navigate(`/allapartments`)
              localStorage.setItem('token', x.data.token)
            }
        )
        .catch(() => {

            swal(`אחד הנתונים שהזנת שגויים`, 'אנא נסה שנית', 'error')
             

        })
    
        
        }
        
    }
        return <> <div className="loginform">
        <h1>כניסה</h1>
        
        <form onSubmit={(e) => start(e)}>

            <label htmlFor="email" className="lable">הכנס כתובת מייל</label>
            <div className="d1"><input type="text" id='email' placeholder="שם" className="input" required onChange={(e) => checkEmail(e.target.value)}></input>
            <p className="error">{errors.email}</p>
            </div>
           
            <label htmlFor="password" className="lable"> הכנס סיסמא </label>
            <div className="d1"><input type="password" id='password' placeholder="סיסמא" className="input" required onChange={(e) => checkPass(e.target.value)} ></input>
            <p className="error">{errors.password}</p></div>


            

            <input className="input" type={'submit'} />


        </form>
        </div>

    </>
}