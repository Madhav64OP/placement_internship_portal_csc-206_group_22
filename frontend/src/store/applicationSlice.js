import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    data: [],
    hasFetched: false,
  },
  reducers: {
    setApplications: (state, action) => {
      state.data = action.payload;
      state.hasFetched = true;
    },
    
    addApplicationLocally: (state, action) => {
      state.data.push(action.payload);
    }
  },
});

export const { setApplications, addApplicationLocally } = applicationSlice.actions;
export default applicationSlice.reducer;