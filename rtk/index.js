// index.js
const {
  configureStore,
  createSlice,
  createAsyncThunk,
} = require("@reduxjs/toolkit");
const { createLogger } = require("redux-logger");
const axios = require("axios");

// Async thunk to fetch a single video
const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
  const response = await axios.get("http://localhost:9000/videos");
  return response.data; // response.data will be a single video object
});

// Async thunk to fetch related videos based on tags
const fetchRelatedVideos = createAsyncThunk(
  "video/fetchRelatedVideos",
  async (tags) => {
    // Create query string: tags_like=tag1&tags_like=tag2 ...
    const query = tags.map((tag) => `tags_like=${tag}`).join("&");
    const response = await axios.get(`http://localhost:9000/videos?${query}`);
    return response.data; // response.data will be an array of video objects
  }
);

// Create a slice for video state
const videoSlice = createSlice({
  name: "video",
  initialState: {
    video: null,
    relatedVideos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cases for fetchVideo
      .addCase(fetchVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Cases for fetchRelatedVideos
      .addCase(fetchRelatedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        state.loading = false;
        // Sort based on views (in descending order)
        // Note: views is a string like "3.1k", so we convert it to a number.
        const convertViews = (views) => {
          if (typeof views === "string" && views.includes("k")) {
            return parseFloat(views) * 1000;
          }
          return parseInt(views, 10);
        };
        state.relatedVideos = action.payload.sort(
          (a, b) => convertViews(b.views) - convertViews(a.views)
        );
      })
      .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Configure the Redux store with redux-logger middleware
const store = configureStore({
  reducer: {
    video: videoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(createLogger()),
});

// Dispatch the actions sequentially
store.dispatch(fetchVideo()).then((result) => {
  const video = result.payload;
  const tags = video.tags; // tags is an array
  // Use the tags to dispatch the second API call to fetch related videos
  store.dispatch(fetchRelatedVideos(tags));
});
