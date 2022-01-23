export default (state =[], action)=>{
    switch(action.type){
        
        case "LOGINSUCCESS":
            localStorage.setItem("usertoken",action.payload?.token)
            return action.payload
       
        default: return state    
    }
}