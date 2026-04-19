import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{
        data:null,
        hasFetched:false,
    },
    reducers:{
        setUser:(state,action)=>{
            state.data = action.payload;
            state.hasFetched = true;
        },
        updateResumeLocally:(state,action)=>{
            if(state.data){
                state.data.resumeLink = action.payload;
            }
        }
    },
});

export const {setUser,updateResumeLocally} = userSlice.actions;
export default userSlice.reducer;