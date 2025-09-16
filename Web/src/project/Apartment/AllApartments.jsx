import { useEffect, useState } from "react"
import { getApartments, getByCityId, getCities, priceSmallEq } from "../api"
import {Apart} from "./Apart"
//import '../style.css'

//import { Details } from "./Details"

export const AllApartments = () => {

    // הגדרת מערך ששולף את כל המאמרים מהרידקס
    // const list = useSelector(x => x.article.list)
    const [list, setList] = useState()
    const [allCities, setallCities] = useState()
    const [idCity, setIdCity] = useState()
    const [priceList,setPriceList]=useState()
   // const [select, setSelect] = useState()
     
    // בעת טעינה
    useEffect(() => {
        // קריאת שרת
        getApartments()
            .then(x => {
            
                setList(x.data)
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
    }, [])
    const cityId=(name)=>{
       
       for(let i=0;i<allCities.length;i++){
        if(allCities[i].name===name){
            //setIdCity(allCities[i])
            getByCId(allCities[i]._id)
            console.log(allCities[i]);
        }
       }

    }
    const getByCId=(id)=>{
        getByCityId(id)
        .then(x=>{
            setIdCity(x.data)
            console.log(x.data);
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    const choosePrice=(price)=>{
        priceSmallEq(price)
        .then((x)=>{
          setPriceList(x.data)
          console.log(x.data);
        })
        .catch((x)=>{
            console.log(x);
            
        })
    }
   
    

    return <>
   
        <input type="number" className="selectC1" placeholder="הכנס מחיר " onChange={(e)=> choosePrice(e.target.value)}/>

        < select className="selectC" onChange={(e) =>
       cityId(e.target.value)
      }>
            <option className="optionC" disabled selected>בחר עיר:</option>
          
            {allCities&&allCities.map((item, index) => <option className="optionC" key={index} value={item.name}>{item.name}</option>)}
        </select>
        <div className="AllC" >
            {!priceList&&!idCity&&list&&list.map((x,index )=>
            <Apart key={index} apartment={x} ></Apart>)};

            
            {!priceList&&idCity&& idCity.map((x,index )=> 
            
             <Apart key={index} apartment={x}></Apart>
           ) };

            {priceList&& priceList.map((x,index )=> 
            
            <Apart key={index} apartment={x}></Apart>
          ) };
            
            
        </div>
    </>
}
