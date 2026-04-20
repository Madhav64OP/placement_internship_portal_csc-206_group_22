import {createSlice} from '@reduxjs/toolkit'

const storedUser = JSON.parse(localStorage.getItem('pip_user')) || null;

const userSlice = createSlice({
    name:'user',
    initialState:{
        data:storedUser,
        hasFetched:true,
    },
    reducers:{
        setUser:(state,action)=>{
            state.data = action.payload;
            state.hasFetched = true;

            localStorage.setItem('pip_user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.data = null;
            state.hasFetched = true;
            localStorage.removeItem('pip_user');
        },
        updateResumeLocally:(state,action)=>{
            if(state.data){
                state.data.resumeLink = action.payload;
                localStorage.setItem('pip_user', JSON.stringify(state.data));
            }
        }
    },
});

export const {setUser,logoutUser,updateResumeLocally} = userSlice.actions;
export default userSlice.reducer;