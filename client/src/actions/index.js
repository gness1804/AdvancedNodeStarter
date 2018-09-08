import axios from 'axios';
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from './types';

export const fetchUser = () => async (dispatch) => {
  const res = await axios
    .get('/api/current_user')
    .catch((err) => {
      throw new Error(`Error in fetching user data: ${err}.`);
    });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = token => async (dispatch) => {
  const res = await axios
    .post('/api/stripe', token)
    .catch((err) => {
      throw new Error(`Error with handleToken: ${err}`);
    });

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, file, history) => async (dispatch) => {
  const uploadConfig = await axios
    .get('/api/upload')
    .catch((err) => {
      throw new Error(`Error in getting key to upload image: ${err}.`);
    });

  const { url, key } = uploadConfig.data;

  await axios
    .put(url, file, {
      headers: {
        'Content-Type': file.type,
        },
      })
    .catch((err) => {
      throw new Error(`Error in uploading image file: ${err}.`);
    });

  const updatedValues = {
      ...values,
    imageUrl: key,
  };

  const res = await axios
    .post('/api/blogs', updatedValues)
    .catch((err) => {
      throw new Error(`Error in posting blog post: ${err}`);
    });

  history.push('/blogs');
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async (dispatch) => {
  const res = await axios
    .get('/api/blogs')
    .catch((err) => {
      throw new Error(`Error in fetching blog posts: ${err}.`);
    });

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = id => async (dispatch) => {
  const res = await axios
    .get(`/api/blogs/${id}`)
    .catch((err) => {
      throw new Error(`Error fetching blog with id ${id}: ${err}`);
    });

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
