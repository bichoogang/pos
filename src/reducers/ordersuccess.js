export default (state ="", action)=>{
    switch(action.type){
        case "ORDERSUCCESS":
            return action.payload?.data
       
        default: return state    
    }
}