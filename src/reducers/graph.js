export default (state =[], action)=>{
    switch(action.type){
        case "FETCH_GRAPH":
            return action.payload.data
       
        default: return state    
    }
}