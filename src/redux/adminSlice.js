import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 전체 회원 목록
export const fetchUserList = createAsyncThunk(
  "admin/fetchUserList",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.get(
        `http://3.37.35.134:8080/api/users/admin/user-list?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 특정 회원 검색
export const searchUser = createAsyncThunk(
  "admin/searchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.get(
        `http://3.37.35.134:8080/api/users/admin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "User not found");
    }
  }
);

// 회원 삭제
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        throw new Error("Authentication token is missing.");
      }

      const response = await axios.delete(
        `http://3.37.35.134:8080/api/users/admin/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  userList: [],
  userDetails: null,
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.userList = action.payload.data.content.filter(
          (user) => user.role === "USER"
        );
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(searchUser.fulfilled, (state, action) => {
        state.userDetails = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log("삭제된 userId:", action.meta.arg);
        console.log("현재 userList:", state.userList);
        state.userList = state.userList.filter(
          (user) => user.userId !== action.meta.arg
        );
      });
  },
});

export default adminSlice.reducer;
