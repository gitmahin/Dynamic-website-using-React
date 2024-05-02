import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAuth } from '../store/authenticate'

const Dashboard = () => {
  const [image, setImage] = useState()
  const { user } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const convertImageToBase = (e) => {
    let reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = (err) => {
      toast.error('Error image uploading')
    }
  }

  const onSubmit = async (data) => {
    try {
      data.adminEmail = user.email
      data.postimg = image
      const fetchData = await fetch('/api/publish-auth-post', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (fetchData.status == 200) {
        toast.success("Published")
      } else if (fetchData.status == 422) {
        toast.error("Fill the required fields")
      } else if (fetchData.status == 500) {
        toast.error("Server Error")
      }
    } catch (error) {
      toast.error('Something went wrong')
    }

  }
  return (
    <div className='dash-wrap'>
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="dash-main">
          <div className="dash-left">
            <input placeholder='Title' type="text" {...register('title', {
              required:{
                value: true,
                message:"Give your post title"
              }
            })} required />
            <textarea name="desc" id="desc" placeholder='Write your content' {...register('desc', {
              required:{
                value: true,
                message:"Write your content"
              }
            })} cols="30" rows="10" required></textarea>

          </div>

          <div className="dash-right">
            <div className="dash-img-upload-box">
              <div className="dash-img">
                {image == "" || image == null ? "" : <img src={image} alt="Profile image" />}
              </div>
              <div className="dash-img-input">
                <input type="file" accept='image/*' onChange={convertImageToBase} />
              </div>
            </div>
            <input id="publish" type="submit" disabled={isSubmitting} value={isSubmitting ? "Loading..." : "Publish"} />
          </div>

        </div>

      </form>
          {errors.title && toast.error(errors.title.message) }
          {errors.desc && toast.error(errors.desc.message) }
    </div>
  )
}

export default Dashboard
