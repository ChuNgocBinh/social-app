import instance from "./request";

const postApi = {
  getAllPost() {
    const url = `/posts`;
    return instance.get(url);
  },
  deletePost(id) {
    const url = `/posts/${id}`;
    return instance.delete(url);
  },
};

export default postApi;
