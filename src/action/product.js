import axios from 'axios'

const port="https://invennew.herokuapp.com"
// const port = "http://localhost:8080"
export const postProduct = (data) => async (dispatch) => {
    try {
        const product = await axios.post(`${port}/product/addproduct`, data)
        dispatch({ type: "SUCCESS", payload: product?.data })
    } catch (error) {
        console.log(error.response?.data)
        dispatch({ type: "ERROR", payload: error.response?.data })
    }
}
export const getProduct = () => async (dispatch) => {
    try {
        // alert('cll')
        const product = await axios.get(`${port}/product/product`)
        console.log("lol", product)
        dispatch({ type: "FETCH_PRODUCT", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const getGraph = () => async (dispatch) => {
    try {
        // alert('cll')
        const product = await axios.get(`${port}/product/graph`)
        console.log("lol", product)
        dispatch({ type: "FETCH_GRAPH", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const outOfStock = () => async (dispatch) => {
    try {
        // alert('cll')
        const product = await axios.get(`${port}/product/outofstock`)
        console.log("lol", product)
        dispatch({ type: "OUTOFSTOCK", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const delProduct = (id) => async (dispatch) => {
    try {
        const product = await axios.delete(`${port}/product/delproduct/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})

        // window.location.reload()
        dispatch({ type: "SUCCESS", payload: product?.data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        console.log(error)
    }
}
export const getoneProduct = (id) => async (dispatch) => {
    try {
        const product = await axios.get(`https://cake-world.herokuapp.com/product/getitem/${id}`)
        dispatch({ type: "EDIT_PRODUCT", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const editProduct = (data) => async (dispatch) => {
    try {
        console.log("update",data)
        // alert('update')
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const product = await axios.patch(`${port}/product/updateproduct`, data)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})updateproduct
        dispatch({ type: "SUCCESS", payload: product?.data })
        // window.location.reload()
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        console.log(error)
    }
}

export const editProductcath = (data) => async (dispatch) => {
    try {
        // console.log(id,data)
        // alert('update')
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const product = await axios.patch(`${port}/product/updateprocath`, data)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})updateproduct
        dispatch({ type: "ADDCATEGORY", payload: product?.data})
        
        dispatch({ type: "SUCCESS", payload: product?.data })
        // window.location.reload()
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        console.log(error)
    }
}
// query action 

export const postorder = (data) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/product/order`, data)
        dispatch({type:"ORDERSUCCESS" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getallorder = (data) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.get(`${port}/product/order`)
        dispatch({type:"ALLORDER" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const nodealofday = (id) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`https://devoecom.herokuapp.com/pdt/nodealofday/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const sale = (id) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`https://devoecom.herokuapp.com/pdt/sale/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const topf = (id) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`https://devoecom.herokuapp.com/pdt/topf/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const nosale = (id) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`https://devoecom.herokuapp.com/pdt/nosale/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const notopf = (id) => async (dispatch) => {
    try {
        // console.log("sss",id)
        const product = await axios.patch(`https://devoecom.herokuapp.com/pdt/notopf/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}

export const postQuery = (data) => async (dispatch) => {
    try {
        const product = await axios.post("https://cake-world.herokuapp.com/query/post", data)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getQuery = (data) => async (dispatch) => {
    try {
        const product = await axios.get("https://cake-world.herokuapp.com/query/get")
        dispatch({ type: "FETCH_QUERY", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const delQuery = (id) => async (dispatch) => {
    try {
        // console.log(id)
        const product = await axios.delete(`https://cake-world.herokuapp.com/query/delete/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const postTop = (val) => async (dispatch) => {
    try {
        const product = await axios.post("https://cake-world.herokuapp.com/product/tproduct", val)
        dispatch({ type: "POST_TOP", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const getTop = (val) => async (dispatch) => {
    try {
        const product = await axios.get("https://cake-world.herokuapp.com/product/tproduct")
        dispatch({ type: "FETCH_TOP", payload: product })
    } catch (error) {
        console.log(error)
    }
}
export const delTop = (id) => async (dispatch) => {
    try {
        const product = await axios.delete(`https://cake-world.herokuapp.com/product/tproduct/${id}`)
        dispatch({ type: "DEL_TOP", payload: product })
    } catch (error) {
        console.log(error)
    }
}




export const addcategory = (dataa) => async (dispatch) => {

    try {
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        console.log('ccc', dataa)
        // const token = localStorage.getItem('normaltoken')
        const { data } = await axios.post(`${port}/product/addcath`, dataa)
        dispatch({ type: "ADDCATEGORY", payload: data })
        dispatch({ type: "SUCCESS", payload: data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })

    }
}
export const getcategory = () => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const { data } = await axios.get(`${port}/product/cath`)
        // dispatch({ type: "SUCCESS", payload: data })
        dispatch({ type: "CATEGORY", payload: data })
    } catch (error) {

    }
}
export const getcuscategory = () => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        // alert('hello')
        const { data } = await axios.get(`${port}/customer/getcuscath`)
        // dispatch({ type: "SUCCESS", payload: data })
        dispatch({ type: "CATEGORYCUS", payload: data })
    } catch (error) {

    }
}
export const delcategory = (id) => async (dispatch) => {
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await axios.delete(`https://devoecom.herokuapp.com/pdt/category/${id}`)
        dispatch({ type: "DELCATEGORY", payload: data })
    } catch (error) {

    }
}
export const delcuscath = (id) => async (dispatch) => {
    try {
        console.log("aaa", id)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const product = await axios.delete(`${port}/customer/delcuscath/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})

        // window.location.reload()
        dispatch({ type: "DELCATEGORY", payload: product?.data })
        dispatch({ type: "SUCCESS", payload: product?.data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        console.log(error)
    }
}
export const delprocath = (id) => async (dispatch) => {
    try {
        console.log("aaa", id)
        dispatch({ type: "ERROR", payload: null })
        dispatch({ type: "SUCCESS", payload: "" })
        const product = await axios.delete(`${port}/product/delprocath/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})

        // window.location.reload()
        dispatch({ type: "DELCATEGORY", payload: product?.data })
        dispatch({ type: "SUCCESS", payload: product?.data })
    } catch (error) {
        dispatch({ type: "ERROR", payload: error.response?.data })
        console.log(error)
    }
}