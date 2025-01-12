import { createSlice } from "@reduxjs/toolkit";

export interface TokenSliceState {
  token: String;
  username: String;
  partner_id: String;

}

const initialState: TokenSliceState = {
  token:"",
  username:"",
  partner_id:""
};

export const TokenSlice = createSlice({
  name: "Token",
  initialState: initialState,
  reducers: {
    // bookTicket: (state, { payload }) => {
    //   state.token = payload
    //   const saveticket = async (booking: Ticket) => {
    //     const response = await axios.post("http://localhost:3000/tickets", booking);
    //     return response;

    //   }
    //   saveticket(state.booking)
    // },
    setToken: (state, { payload }) => {
      console.log("from actions")
      console.log(payload)
      state.token = payload._id;
      state.username = payload.username;
      state.partner_id = payload.partner_id;

      console.log(state)

    },
    setPartner: (state, { payload }) => {
      console.log("from setPartner")
      console.log(payload)
      state.partner_id = payload;

      console.log(state)

    },

    clear: (state) => {
      state.token = ""
      state.partner_id = ""
      state.username = ""

    },}
});

export const { setToken,setPartner, clear } = TokenSlice.actions;

export const TokenReducer = TokenSlice.reducer;
