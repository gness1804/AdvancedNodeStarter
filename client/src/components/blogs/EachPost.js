import * as React from 'react';
import { Link } from 'react-router-dom';

const EachPost = ({blog}) => {
  return (
    <div className="card darken-1 horizontal" key={blog._id}>
      <div className="card-stacked">
        <div className="card-content">
          <span className="card-title">{blog.title}</span>
          <p>{blog.content}</p>
        </div>
        <div className="card-action">
          <Link to={`/blogs/${blog._id}`}>Read</Link>
        </div>
        <button
          onClick={this.deletePost}
        >
          Delete
            </button>
      </div>
    </div>
  );;
}

export default EachPost;
