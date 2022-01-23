import { combineReducers } from 'redux';
import product from './product'
// // import edit from './editproduct'
import acart from './Acart'
// // import top from './top'
// // import refresh from './refresh'
// import addcat from './addcat'
import normal from './normal'
// import cart from './cart'
// import orderlist from './orderlist'
import login from './login'
import error from './error'
import succes from './succes';
import add from './add'
import graph from './graph'
import ordersuccess from './ordersuccess';
export default combineReducers({
    product,
    acart,
    error,
    succes,
    login,
    normal,
    add,
    graph,
    ordersuccess
    // addcat,
    // cart,
    // orderlist

})