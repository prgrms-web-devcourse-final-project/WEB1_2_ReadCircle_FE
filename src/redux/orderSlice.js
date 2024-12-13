import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderList = createAsyncThunk(
  "admin/fetchOrderList",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.get(
        `http://3.37.35.134:8080/api/orders/order-list?page=${page}&size=${size}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders.");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderList = action.payload.data.content;
      })
      .addCase(fetchOrderList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
