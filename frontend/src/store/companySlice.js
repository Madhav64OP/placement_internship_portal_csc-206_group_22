import {createSlice} from '@reduxjs/toolkit'

const companySlice = createSlice({
    name:'companies',
    initialState:{
        data:[],
        hasFetched:false,
    },
    reducers:{
        setCompanies:(state,action)=>{
            state.data=action.payload;
            state.hasFetched=true;
        },
    },
});

export const {setCompanies} = companySlice.actions;
export default companySlice.reducer;