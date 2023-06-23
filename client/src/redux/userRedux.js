import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true;
        },
        loginSuccess:(state,action)=>{
            state.isFetching=false;
            state.error=false;
            state.currentUser=action.payload;
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error=true;
        },
        logout:(state)=>{//reset to intial state
            console.log("reset user");
            state.currentUser=null;
            state.isFetching=false;
            state.error=false;
        } 
    }
})

export default userSlice.reducer;
export const {loginStart,loginSuccess,loginFailure,logout}=userSlice.actions;