import instance from "./request";

const commentApi = {
  getCommentByPost(id) {
    const url = `/comments/post/${id}`;
    return instance.get(url);
  },
  addComment(data) {
    const url = `/comments/create`;
    return instance.post(url, data);
  },
  updateComment(data) {
    const url = `/comments/update`;
    return instance.post(url, data);
  },
};

export default commentApi;
