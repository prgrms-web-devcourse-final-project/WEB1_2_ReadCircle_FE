import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 판매 정보 전체 조회
export const fetchSaleInfo = createAsyncThunk(
  "admin/fetchSaleInfo",
  async ({ page, size, process }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.get(
        `http://3.37.35.134:8080/api/sale/management?page=${page}&size=${size}&process=${
          process || "WAITING"
        }`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sale info."
      );
    }
  }
);

// 판매 매입가 결정
export const updateSaleDeposit = createAsyncThunk(
  "admin/updateSaleDeposit",
  async ({ sellerId, depositData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.put(
        `http://3.37.35.134:8080/api/sale/management/${sellerId}`,
        depositData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update deposit amount."
      );
    }
  }
);

// 판매 정보 삭제
export const deleteSaleInfo = createAsyncThunk(
  "admin/deleteSaleInfo",
  async (sellerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authentication token is missing.");

      const response = await axios.delete(
        `http://3.37.35.134:8080/api/sale/${sellerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return sellerId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete sale info."
      );
    }
  }
);

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    saleList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSaleInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.saleList = action.payload.data.content;
      })
      .addCase(fetchSaleInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteSaleInfo.fulfilled, (state, action) => {
        state.saleList = state.saleList.filter(
          (sale) => sale.sellerId !== action.payload
        );
      });
  },
});

export default saleSlice.reducer;
