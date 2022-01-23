export default (state ="", action)=>{
    switch(action.type){
        case "SUCCESS":
            return action.payload
       
        default: return state    
    }
}