import * as React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EachPost = ({blog}) => {
  const deletePost = () => {
    const { _id } = blog;
    axios.delete(`/api/blogs/${_id}`)
    .then(() => {
      window.location.reload();
    })
  }

  return (
    <div className="card darken-1 horizontal" key={blog._id}>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title">{blog.title}</span>
          <p className="card-content">{blog.content}</p>
        </div>
        <div className="card-action">
          <Link to={`/blogs/${blog._id}`}>Read</Link>
        </div>
        <button
          className="delete-post-button"
          onClick={deletePost}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EachPost;
