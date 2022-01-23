
import { NORMAL_LOADED, NORMAL_LOADING, NAUTH_ERROR, NLOGIN_SUCCESS, NLOGIN_FAIL, NLOGOUT_SUCESS, NREGISTER_SUCCESS, NREGISTER_FAIL, GET_ERROR } from './types'
import Axios from 'axios'

const port="https://invennew.herokuapp.com"
// const port = "http://localhost:8080"
export const loadNormalUser = (dataa) => async (dispatch, getState) => {
    try {
        // alert('hello')
        dispatch({ type: NORMAL_LOADING });
        // const token = localStorage.getItem('usertoken');
        // console.log("nor", token)
        const { data } = await Axios.get(`${port}/regis/getuser/${dataa}` )
        console.log('tok', data)
        dispatch({ type: "NORMAL_LOADED", payload: data })



    } catch (error) {
        dispatch({ type: NAUTH_ERROR })
        console.log(error)

    }
}
export const getalluser = () => async (dispatch) => {
    try {
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.get(`${port}/regis/getalluser`)
        dispatch({ type: "GETALLUSER", payload: data })

    } catch (error) {

        // dispatch({ type: NREGISTER_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const userNormalSign = (signdata) => async (dispatch) => {
    try {
        console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.post(`${port}/regis/signup`, signdata)
        dispatch({ type: NREGISTER_SUCCESS, payload: data })
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const addcustomer = (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.post(`${port}/customer/add`, dataa)
        // dispatch({ type: NREGISTER_SUCCESS, payload: data })
        // dispatch({ type: "ADD", payload: data })
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error?.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const updatecustomer = (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.patch(`${port}/customer/updatecustomer`, dataa)
        // dispatch({ type: NREGISTER_SUCCESS, payload: data })
        // dispatch({ type: "ADD", payload: data })
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error?.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const updatecathuser = (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.patch(`${port}/customer/updatecuscath`, dataa)
        // dispatch({ type: NREGISTER_SUCCESS, payload: data })
        // dispatch({ type: "ADD", payload: data })
        dispatch({ type: "ADDCATEGORY", payload: data})
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error?.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const addcustomercath = (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.post(`${port}/customer/addcath`, dataa)
        // dispatch({ type: NREGISTER_SUCCESS, payload: data })
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const delcustomer = (id) => async (dispatch) => {
    try {
        // console.log(signdata)
        console.log('id',id)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await Axios.delete(`${port}/customer/delcustomer/${id}`)
        // dispatch({ type: NREGISTER_SUCCESS, payload: data })
        dispatch({ type: "SUCCESS", payload: data })
        // alert('Signup Sucessfully')
        // window.location.reload()

    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const getcustomer = (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })

        const { data } = await Axios.get(`${port}/customer/all`)
        dispatch({ type: "ALLCUSTOMER", payload: data })


    } catch (error) {
        dispatch({ type: "ERROR", payload: error?.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const employeeper= (dataa) => async (dispatch) => {
    try {
        // console.log(signdata)
        console.log('clicked',dataa)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const token = localStorage.getItem('usertoken');

        const { data } = await Axios.patch(`${port}/regis/permission`,dataa,{ headers: { "x-auth-token": token } })
        dispatch({ type: "SUCCESS", payload: data })


    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const Nloguser = (dat) => async (dispatch) => {
    try {
        console.log("login", dat)
        dispatch({ type: "LOGINSUCCESS", payload: null })
        dispatch({ type: "ERROR", payload: null })
        const { data } = await Axios.post(`${port}/regis/login`, dat)
        console.log('dataa', data)
        dispatch({ type: "LOGINSUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error?.response?.data })

        dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
    }
}
export const review = (dat) => async (dispatch, getState) => {
    try {
        const token = getState().normal.token;
        const { data } = await Axios.put("https://devoecom.herokuapp.com/comment", dat, { headers: { "x-auth-token": token } })
        dispatch({ type: "REVIEW", payload: data })
    } catch (error) {

        // dispatch({ type: NLOGIN_FAIL })
        dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const updatereview = (dat) => async (dispatch, getState) => {
    try {
        console.log("update", dat)

        //     const token = getState().normal.token;
        const { data } = await Axios.patch("https://devoecom.herokuapp.com/updatecomment", dat)
        dispatch({ type: "UPDATEREVIEW", payload: data })
    } catch (error) {

        // dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const getorderlist = () => async (dispatch, getState) => {
    try {
        // console.log("update",dat)

        const token = getState().normal.token;
        const { data } = await Axios.get("https://devoecom.herokuapp.com/normal/orderitem", { headers: { "x-auth-token": token } })
        dispatch({ type: "ORDERLIST", payload: data })
    } catch (error) {

        // dispatch({ type: NLOGIN_FAIL })
        // dispatch({ type: "REVIEW_ERROR", payload: error.response })
    }
}
export const addtocart = (cart) => async (dispatch) => {
    try {
        console.log(cart)
        const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.post("https://devoecom.herokuapp.com/cart/post", cart, { headers: { "x-auth-token": token } })
        dispatch({ type: "ADDDATA", payload: data })


    } catch (error) {


    }
}
export const getcart = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get("https://devoecom.herokuapp.com/cart/get", { headers: { "x-auth-token": token } })
        console.log("cartdd", data)
        dispatch({ type: "ADD_CART", payload: data })
    } catch (error) {

    }
}
export const addcategory = (dataa) => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.post("https://devoecom.herokuapp.com/category", dataa)
        dispatch({ type: "ADDCATEGORY", payload: data })
    } catch (error) {

    }
}
export const getcategory = () => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get("https://devoecom.herokuapp.com/category")
        dispatch({ type: "CATEGORY", payload: data })
    } catch (error) {

    }
}
export const getorder = () => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.get("https://devoecom.herokuapp.com/pdt/order")
        // console.log("data",data)
        dispatch({ type: "ORDER", payload: data })
    } catch (error) {

    }
}
export const delorder = (id) => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await Axios.delete(`https://devoecom.herokuapp.com/pdt/order/${id}`)
        // console.log("data",data)
        dispatch({ type: "DELORDER", payload: data })
    } catch (error) {

    }
}
export const delcategory = (id) => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await Axios.delete(`https://devoecom.herokuapp.com/category/${id}`)
        dispatch({ type: "DELCATEGORY", payload: data })
    } catch (error) {

    }
}
export const delCart = (id) => async (dispatch) => {
    try {
        console.log("del", id)
        const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.delete(`https://devoecom.herokuapp.com/cart/del/${id}`, { headers: { "x-auth-token": token } })
        dispatch({ type: "DELETE_CART", payload: data })
        dispatch({ type: "DEL_CART", payload: data })
    } catch (error) {
        console.log(error)
    }
}
export const deleted = () => async (dispatch) => {
    try {
        // console.log("del",id)
        const token = localStorage.getItem('normaltoken')
        const { data } = await Axios.delete(`https://devoecom.herokuapp.com/cart/delete`, { headers: { "x-auth-token": token } })
        dispatch({ type: "CART_DEL", payload: data })
        dispatch({ type: "DELETE_ALL" })

    } catch (error) {
        console.log(error)
    }
}

export const nlogout = () => async (dispatch) => {
    dispatch({ type: NLOGOUT_SUCESS })
    window.location.reload()

}

