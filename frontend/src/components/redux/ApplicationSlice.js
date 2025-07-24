import { createSlice } from "@reduxjs/toolkit";
const applicantionSlice = createSlice({
    name:'application',
    initialState:{
        applicants:[],
    },
    reducers:{
        setAllApplications:(state, action)=>{
            state.applicants = action.payload;
        }
    }
});
export const {setAllApplications} = applicantionSlice.actions;
export default applicantionSlice.reducer;