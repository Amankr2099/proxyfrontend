import { useEffect, useState } from "react";
import axios from "axios";

export const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [hide, setHide] = useState(false);

  const getBlogs = () => {
    axios
      .get("api/blogs/allblogs")
      .then((data) => {
        setBlogs(data.data);
        setHide(!hide)
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          alert(error.response.data.error);
        } else {
          alert("Unable to get blogs");
        }
      });
  };

  return (
    <>
      <div className="container text-center mx-auto">
        <h1>Proxy frontend</h1>
        {!hide && (
          <button className="btn btn-info" onClick={getBlogs}>
            Get blogs
          </button>
        )}

        <div className="container bg-info p-4">
          {blogs &&
            blogs.map((blog, index) => {
              return (
                <div key={index} className=" container p-3">
                  <h2>{blog.title}</h2>
                  <h4>{blog.caption}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};
