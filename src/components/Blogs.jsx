import React, { useEffect, useState } from "react";

function Blogs() {
  const [postData, setPostData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [newPost, setNewPost] = useState(false);
  const [newPostData, setNewPostData] = useState({ title: "", body: "" });
  const [showModal, setShowModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchPosts();
  }, []);

  const generateUniqueId = () => {
    return postData.length ? Math.max(...postData.map((p) => p.id)) + 1 : 1;
  };

  const handleEditPost = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const editStart = () => {
    setShowEditor(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setShowEditor(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleNewPostChange = (e) => {
    const { name, value } = e.target;
    setNewPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseNewPost = () => {
    setNewPost(false);
    setNewPostData({ title: "", body: "" });
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchPosts();
  }, []);

  const handleNewPost = async () => {
    try {
      const newId = generateUniqueId();
      const newPostToAdd = { ...newPostData, id: newId };

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPostToAdd),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPostData((prevData) => [data, ...prevData]);
      setNewPost(false);
      setNewPostData({ title: "", body: "" });
    } catch (error) {
      console.error("Error in add new Post", error);
    }
  };

  async function dltPost(postId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setPostData((prevPost) =>
          prevPost.filter((post) => post.id !== postId)
        );
        setShowModal(false);
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error in Deleting Post", error);
    }
  }

  async function editPost(postId) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      const data = await response.json();
      setPostData((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? data : post))
      );
      setShowEditor(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating post:", error.message);
    }
  }

  return (
    <>
      {newPost && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">New Post Editor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseNewPost}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  value={newPostData.title}
                  //   value={newPostData?.title || ""}
                  onChange={handleNewPostChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />
                <textarea
                  name="body"
                  value={newPostData.body}
                  //   value={newPostData?.body || ""}
                  onChange={handleNewPostChange}
                  className="form-control"
                  placeholder="Body"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseNewPost}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNewPost}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Post Editor</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              {showEditor ? (
                <div className="modal-body">
                  <input
                    type="text"
                    name="title"
                    value={selectedPost?.title || ""}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                    placeholder="Title"
                  />
                  <textarea
                    name="body"
                    value={selectedPost?.body || ""}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Body"
                  />
                </div>
              ) : (
                <div className="modal-body">
                  <h5>{selectedPost?.title}</h5>
                  <p>{selectedPost?.body}</p>
                </div>
              )}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editPost(selectedPost.id)}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={() => dltPost(selectedPost.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={editStart}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1>Blogs-Page</h1>
        <div className="d-grid pe-5 gap-2 d-md-flex justify-content-md-end ">
          <button
            type="button"
            className="btn btn-info"
            onClick={() => setNewPost(true)}
          >
            Add New Post
          </button>
        </div>
        <div className="main">
          {postData.map((post) => (
            <div className="box" key={post.id}>
              <h5>{post.title}</h5>
              <div>{post.body}</div>
              <button onClick={() => handleEditPost(post)}>Edit Post</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
