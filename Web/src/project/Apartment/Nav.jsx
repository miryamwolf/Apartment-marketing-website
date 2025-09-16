import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
//import logo from './img/לוגו.png'
//import userI from './img/user.png'

export const Nav = () => {
    const advertiser = useSelector(x => x.currentAdvertiser)
    return <> 
        {/* <div className='image'><img src={logo} ></img></div> */}
        <div className='nav'>
            {advertiser&& <label className='username'>{advertiser.email}</label>}
            
            {/* {advertiser && user.username && <img src={userI} className="userI"></img>} */}
            <div ><NavLink to={'allapartments'} className='link'>הדירות שלנו</NavLink></div>
            <div ><NavLink to={'register'} className='link'>הרשמה</NavLink></div>
            <div ><NavLink to={'login'} className='link'>כניסה</NavLink></div>
            <div ><NavLink to={'home'} className='link'>דף הבית</NavLink></div>
        </div>
       
        {advertiser.email && <div className="mnav">
            <NavLink to={'removeorupdateapartment'} className='mlink' >מחק או עדכן דירה</NavLink>
            
            <NavLink to={'addapartment'} className='mlink' >הוספת דירה</NavLink>
            <NavLink to={'addcategory'} className='mlink' >הוספת קטגוריה</NavLink>
        </div>}

    </>
}

