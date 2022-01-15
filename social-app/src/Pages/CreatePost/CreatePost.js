import React from "react";
import ContentLayout from "../../Components/Layout/ContentLayout";
import MainLayout from "../../Components/Layout/MainLayout";
import RightSidebarLayout from "../../Components/Layout/RightSidebarLayout";
import Ckeditor from "./Ckeditor"
import request from "../../Api/request";
import ListFollow from '../../Components/Follow/ListFollow';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import 'draft-js/dist/Draft.css';


export default function CreatePost() {
  const userMe = useAuth();
  const [image, setImage] = React.useState();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    return () => {
      image && URL.revokeObjectURL(image.preview)
    }
  }, [image])

  const handleChangeFile = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setImage(file)
    e.target.value = null
  }

  const renderImage = () => {
    if (image) {
      return (
        <div className='text-center mt-2'>
          {image && <img src={image.preview} alt='anh' width='80%' />}
        </div>
      )
    }
  }

  console.log(text)

  const handleClickCreatepost = async () => {
    if (text === '') {
      // alert('Nội dung không được để trống')
      toast.error('Content is Require')
    } else {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('file', image);

        const res = await request({
          url: '/upload',
          method: 'POST',
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })

        const data = {
          content: text,
          images: res.data
        }

        const post = await request({
          url: '/posts/create',
          method: 'POST',
          data: data,
        })
        toast.success('Create Post Success')
        // console.log(post)
        setText('')
        setImage('')
      } catch (err) {
        toast.error('Create Post Error')
      }
    }
  }

  return (
    <MainLayout>
      <ContentLayout>
        <div className='text-center my-2'>
          <h4>Create new post</h4>
        </div>
        <div className='flex-grow-1 overflow-auto'>
          <div>
            <input type='file' className='form-control' onChange={handleChangeFile} />
          </div>
          {renderImage()}
          <Ckeditor setValue={setText} value={text} />
          <button className='btn btn-primary mt-2' onClick={handleClickCreatepost}>Create</button>
        </div>
      </ContentLayout>
      <RightSidebarLayout>
        <ListFollow userIdProfile={userMe._id} page='home-following' />
      </RightSidebarLayout>
    </MainLayout>
  )
}