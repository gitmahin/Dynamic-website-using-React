import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import animation from '../assets/animation.gif'
import { useNavigate } from 'react-router-dom';


const Registration = () => {
  const navigateTo = useNavigate()
  const [image, setImage] = useState()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm()

  const showPass = () => {
    let pass = document.getElementById('pass')
    let eyespan = document.getElementById('eyespan')
    if (pass.type == 'password') {
      pass.type = 'text'
      eyespan.innerHTML = 'visibility'
    } else {
      pass.type = 'password'
      eyespan.innerHTML = 'visibility_off'
    }
  }

  const password = useRef()
  password.current = watch('pass')

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
    data.profileImg = image
    try {
      const fetchData = await fetch('/api/user-register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (fetchData.status == 201) {
        toast.success('Registered successfully')
        setTimeout(() => {
          navigateTo('/login', { replace: true })
        }, 1000);
      } else if (fetchData.status == 400) {
        toast.error('User already existed')
      } else if (fetchData.status == 422) {
        toast.error('Fill the required fields')

      } else if (fetchData.status == 500) {
        toast.error('Server Error')

      }
    } catch (error) {
      toast.error('Something went wrong')


    }

  }
  return (
    <div>
      <div className="register-container">
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="register-img-container">
            <div className="register-img">
              {image == "" || image == null ? "" : <img src={image} alt="Profile image" />}
            </div>
            <div className="upload-img">
              <input type='file' accept='image/*' onChange={convertImageToBase} required />
            </div>
          </div>
          <div className="register-main">
            <h1>Get Registered</h1>
            <div className="register-inputs">
              <input placeholder='Email' type="text" {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email"
                },
                required: {
                  value: true,
                  message: "Email is required"
                }
              })} />
              <div className="register-pass-container">
                <input placeholder='Password' id='pass' type="password" {...register('pass', {
                  pattern: {
                    value: /.*[-'/`~!#*$@_%+=.,^&(){}[\][;:"<>?\\]/,
                    message: "Use strong password"
                  },
                  required: {
                    value: "true",
                    message: "Password is required"
                  },
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 char"
                  }
                })} />
                <input type="checkbox" id='eyeinput' />
                <label id="eyelabel" onClick={showPass} htmlFor="eyeinput"><span id='eyespan' className="material-symbols-outlined">
                  visibility_off
                </span></label>
              </div>
              <input placeholder='Confirm password' type="password" {...register('cpass', {
                required: {
                  value: true,
                  message: "Confirm your password"
                },
                validate: (value) => value === password.current || "Password doesn't matching"
              })} />
            </div>
            <div className="submitBtn">
              <input type="submit" id='submit' disabled={isSubmitting} value={isSubmitting ? "Loading..." : "Sign up"} />
              <lord-icon
                target=".submitBtn"
                src="https://cdn.lordicon.com/hrjifpbq.json"
                trigger="hover" >
              </lord-icon>
            </div>
          </div>
          <div className="animation">
            <img src={animation} />
          </div>
        </form>
        {errors.email && toast.error(errors.email.message)}
        {errors.pass && toast.error(errors.pass.message)}
        {errors.cpass && toast.error(errors.cpass.message)}
      </div>
    </div>
  )
}

export default Registration
