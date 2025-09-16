import './style.css'

export const Apart =({apartment})=> {
    // console.log(apartment);
    
    return <>
     <div className='card'>
        {apartment.name&&<p>{apartment.name}</p>}
       
        {apartment.img&&<img className="img" src={`${process.env.PUBLIC_URL}/pic/${apartment.img}.png`}></img>}
        {apartment.city&&<p>עיר: {apartment.city.name}</p>}
        {apartment.address&&<p>{apartment.address}</p>}
        {apartment.category&&<p>{apartment.category.name}</p>}
        {apartment.price&&<p>{apartment.price}</p>}
        {apartment.numBeds&&<p>{apartment.numBeds}</p>}
        {apartment.advertiser&&<p>{apartment.advertiser.email}</p>}

         
        </div>
    </>
}