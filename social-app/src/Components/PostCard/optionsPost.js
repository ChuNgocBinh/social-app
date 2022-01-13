import { useSelector, useDispatch } from "react-redux";
import request from "../../Api/request";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../ListPosts/postSlice";
import { BASE_URL } from "../../utils/config";
import postApi from "../../Api/postApi";
import useAuth from "../../hooks/useAuth";

const OptionsPost = ({ post, handleDeletePost }) => {
  console.log(handleDeletePost);
  let navigate = useNavigate();
  // const { user, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const user = useAuth();

  const handleEditPost = () => {};

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };
  const handleSavePost = async() => {
    const profile = await request({
      url: `/profile/${user._id}`,
      method: 'GET'
    })

    if (profile?.data?.saved.includes(post._id)){
      console.log('render1')
      return;
    }

    const res = await request({
      url: '/profile/save',
      method: 'PUT',
      data: {
        postId: post._id
      }
    })
  }
  return (
    <div className="nav-item dropdown" style={{cursor: 'pointer'}}>
      <span className="material-icons" id="moreLink" data-toggle="dropdown">
        more_horiz
      </span>

      <div className="dropdown-menu">
        {user._id === post.userId?._id && (
          <>
            <div className="dropdown-item" onClick={handleEditPost}>
              <span className="material-icons">create</span> Edit Post
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleDeletePost(post._id)}
            >
              <span className="material-icons">delete_outline</span> Remove Post
            </div>
          </>
        )}

        <div className="dropdown-item" onClick={handleCopyLink}>
          <span className="material-icons">content_copy</span> Copy Link
        </div>
        <div className="dropdown-item" onClick={handleSavePost}>
          <span className="material-icons">content_copy</span> Save post
        </div>
      </div>
    </div>
  );
};

export default OptionsPost;
