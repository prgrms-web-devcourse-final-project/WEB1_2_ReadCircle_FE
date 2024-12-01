import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDirectTradePosts, fetchECommerceBooks } from "../api/bookApi";

// Thunk: 직거래 게시글 로드
export const loadDirectTradePosts = createAsyncThunk(
  "posts/loadDirectTradePosts",
  async (token, { rejectWithValue }) => {
    try {
      return await fetchDirectTradePosts(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk: 이커머스 게시글 로드
export const loadECommerceBooks = createAsyncThunk(
  "posts/loadECommerceBooks",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchECommerceBooks();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    directTradePosts: [],
    eCommerceBooks: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDirectTradePosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadDirectTradePosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.directTradePosts = action.payload;
      })
      .addCase(loadDirectTradePosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loadECommerceBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadECommerceBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.eCommerceBooks = action.payload;
      })
      .addCase(loadECommerceBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
