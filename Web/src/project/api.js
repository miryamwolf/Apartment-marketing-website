import axios from "axios"

const baseUrl = `http://localhost:3001`

export const getApartments = () => {
    return axios.get(`${baseUrl}/apartment`)
}

export const getCities = () => {
    return axios.get(`${baseUrl}/city`)
}
export const getByCityId = (id) =>
 {
   
    return axios.get(`${baseUrl}/apartment/getByCityId/${id}`)
}
export const register = (newAdvertiser) => {

    return axios.post(`${baseUrl}/advertiser/register`,newAdvertiser)
}

export const login = (advertiser) => {

    return axios.post(`${baseUrl}/advertiser/login`,advertiser)
}
export const removeApartment = (id) => {
    //router.delete('/:id',checkAuth, remove)
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    // body
    return axios.delete(`${baseUrl}/apartment/${id}`, { headers: h })
}
export const getCategories = () => {
    return axios.get(`${baseUrl}/category`)
}

export const addApart = (newApartment) => {
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    return axios.post(`${baseUrl}/apartment`, newApartment,{ headers: h })
}
export const getByAdvertiserId = (id) =>
    {
      
       return axios.get(`${baseUrl}/apartment/getByAdvertiserId/${id}`)
   }
   export const updateApartment = (id,updateApartment) => {
    console.log(updateApartment);
    
    //router.delete('/:id',checkAuth, remove)
    const h = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
    // body
    return axios.patch(`${baseUrl}/apartment/${id}`,updateApartment, { headers: h })
}
export const priceSmallEq = (price) =>
    {
       return axios.get(`${baseUrl}/apartment/priceSmallEq/${price}`)
   }