import { useSelector } from "react-redux"
import {  getApartments, getCategories, getCities, updateApartment } from "../api"
import { useEffect, useState } from "react"
import swal from "sweetalert"
import { useNavigate } from "react-router"

export const UpdateApartment=()=>{


    const currentAdvertiser = useSelector(store => store.currentAdvertiser)
    const currentApartment = useSelector(store => store.currentApartment)
    const [allCategories, setallCategories] = useState()
    const [category, setCategory] = useState()
    const [allCities, setallCities] = useState()
    const [city, setCity] = useState()
    const [errors, setErrors] = useState({})
    const [Img, setImg] = useState()
    const navigate = useNavigate()
    const [AllApart, setAllApart] = useState()

    useEffect(() => {
        // קריאת שרת
        getCategories()
            .then(x => {

                setallCategories(x.data)
                console.log(x.data);

            })
            .catch(err => {
                console.log(err);
            })

        getCities()
            .then(x => {

                setallCities(x.data)
                console.log(x.data);

            })
            .catch(err => {
                console.log(err);
            })
            getApartments()
                            .then(x => {
                                setAllApart(x.data)
                                console.log(x.data);
                                // console.log(list);
                                
                            })
                            .catch(err => {
                                console.log(err);
                            })
    }, [])

    const checkName = (value) => {
        let nameRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
        if (!value.match(nameRegex)) {
            setErrors({ ...errors, apartmentname: ' הכנס שם  בעברית בלבד*' })
        }
        else {
            setErrors({ ...errors, apartmentname: '' })
        }
    }

    const checkDescription = (value) => {
        let descriptionRegex = /^[א-ת]{2}[א-ת" "]{0,200}$/
        if (!value.match(descriptionRegex)) {
            setErrors({ ...errors, description: 'הכנס תאור בעברית בלבד עד 200 תוים*' })
        }
        else {
            setErrors({ ...errors, description: '' })
        }
    }

    const checkAddress = (value) => {
        let addressRegex = /^[א-ת]{2}[א-ת" "]{0,20}$/
        if (!value.match(addressRegex)) {
            setErrors({ ...errors, address: ' הכנס כתובת בעברית בלבד*' })
        }
        else {
            setErrors({ ...errors, address: '' })
        }
    }

    const checkNumBeds = value => {
        let numBedsRegex = /^[0-9]{1,2}$/
        if (!value.match(numBedsRegex)) {
            setErrors({ ...errors, numBeds: ' הכנס מספרים בלבד מוגבל ל-30 מיטות*' })
        }
        else {
            setErrors({ ...errors, numBeds: '' })
        }
    }
    const checkPrice = value => {
        let priceRegex = /^[0-9]{3,5}$/
        if (!value.match(priceRegex)) {
            setErrors({ ...errors, price: ' הכנס מספרים בלבד מוגבל ל10000 ש"ח ללילה*' })
        }
        else {
            setErrors({ ...errors, price: '' })
        }
    }

    const cityId = (name) => {

        for (let i = 0; i < allCities.length; i++) {
            console.log(allCities);
            if (allCities[i].name === name) {
                //setIdCity(allCities[i])
                
                setCity(allCities[i]._id)
                console.log(allCities[i]._id);
            }
        }
    }
    const categoryId = (name) => {

        for (let i = 0; i < allCategories.length; i++) {
            console.log(allCategories);
            
            if (allCategories[i].name === name) {
                //setIdCity(allCities[i])
                setCategory(allCategories[i]._id)
                console.log(allCategories[i]._id);
            }
        }
    }
 
    const savePic = (event) => {
        for (let i = 0; i < AllApart.length; i++) {
            if (AllApart[i].img == event) {
                setImg(AllApart[i].img)
            }
        }
    }


    const add = (event) => {
        event.preventDefault();
       
       
        const apartment = {
            
            name: event.target[0].value,
            description: event.target[1].value,
            img: Img,
            category: category,
            city: city,
            address: event.target[5].value,
            numBeds: event.target[6].value,
            price: event.target[7].value,
            advertiser: currentAdvertiser._id
        }
        console.log(apartment);
        
        if(!errors.apartmentname==''||!errors.description==''||!errors.address==''||!errors.numBeds==''||!errors.price==''){
            swal(`שגיאה `, 'קיימת שגיאה במילוי הנתונים אנא בדוק טופס', 'error')
            console.log(errors);
                        
        }
        else{
            updateApartment(currentApartment._id, apartment)
            .then(()=>{  
              
              swal(`${currentAdvertiser.email}`, `הדירה ${apartment.name} עודכנה בהצלחה`, 'success')
              navigate(`/allapartments`)
            
            }
        )
        .catch(x => {
            console.log(x);
            
            swal(`אחד הנתונים שהזנת שגויים`, 'עידכון נכשל ', 'error')
      
        })
        }
          }
return <>
    <div className="addform">
        <h1>עידכון דירה</h1>

        <form onSubmit={(e) => add(e)}>

            {/* רק אותיות */}
            <label htmlFor="apartmentname" className="lable">הכנס שם דירה</label>
            <div className="d1"><input type="text" id='apartmentname' placeholder="שם" className="input" required onChange={(e) => checkName(e.target.value)}  defaultValue={currentApartment.name}></input>
                <p className="error">{errors.apartmentname}</p>
            </div>
            {/* 9 ספרות */}
            <label htmlFor="description" className="lable">הכנס תאור דירה</label>
            <div className="d1"><input type="text" id='description' placeholder="תאור" className="input" onChange={(e) => checkDescription(e.target.value)} defaultValue={currentApartment.description}></input>
                <p className="error">{errors.description}</p>
            </div>

            <h4>בחר תמונה מתוך המאגר:</h4>
            <select className="select" onChange={(e) => savePic(e.target.value)}>
                <option className="option" disabled selected>{currentApartment.img}</option>
                {/* הפרמטר הראשון - האיבר הנוכחי במערך */}
                {/* הפרמטר השני - האינדקס */}
                { AllApart&&AllApart.map((item, index) => <option className="option" key={index} value={item.img}>{item.img}</option>)}
            </select>

            {/*10 ספרות  */}
            <select className="select" onChange={(e) => categoryId(e.target.value)}>
                <option className="option"disabled  selected defaultValue={currentApartment.category}>{currentApartment.category}</option>
                {allCategories&&allCategories.map((item, index) => <option className="option" key={index} value={item.name}>{item.name}</option>)}
            </select><br></br>

            <select className="select" onChange={(e) => cityId(e.target.value)}>
                <option className="option"  selected >{currentApartment.city}</option>
                {allCities&&allCities.map((item, index) => <option className="option" key={index} value={item.name}>{item.name}</option>)}
            </select><br></br>

            <label htmlFor="address" className="lable">הכנס כתובת דירה</label>
            <div className="d1"><input type="text" id='address' placeholder="כתובת" className="input" required onChange={(e) => checkAddress(e.target.value)} defaultValue={currentApartment.address}></input>
                <p className="error">{errors.address}</p>
            </div>

            <label htmlFor="numBeds" className="lable"> הכנס מספר מיטות </label>
            <div className="d1"><input type="text" id='numBeds' placeholder="מספר מיטות" className="input" required onChange={(e) => checkNumBeds(e.target.value)} defaultValue={currentApartment.numBeds}></input>
                <p className="error">{errors.numBeds}</p></div>

            <label htmlFor="price" className="lable"> הכנס מחיר דירה ללילה  </label>
            <div className="d1"><input type="text" id='price' placeholder=" מחיר דירה ללילה" className="input" required onChange={(e) => checkPrice(e.target.value)} defaultValue={currentApartment.price}></input>
                <p className="error">{errors.price}</p></div>

    
    <input className="input" type={'submit'} />


</form >
</div >
</>
}
