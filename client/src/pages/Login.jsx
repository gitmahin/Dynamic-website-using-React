import React from 'react'
import { useForm } from 'react-hook-form'
import animation from '../assets/animation.gif'
import { toast } from 'react-toastify';
import { useAuth } from '../store/authenticate.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigateTo = useNavigate()
  const { saveTokenToLocal } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm()

  const showPass = () => {
    let pass = document.getElementById('logpass')
    let eyespan = document.getElementById('eyespan')
    if (pass.type == 'password') {
      pass.type = 'text'
      eyespan.innerHTML = 'visibility'
    } else {
      pass.type = 'password'
      eyespan.innerHTML = 'visibility_off'
    }
  }


  const onSubmit = async (data) => {
    try {
      const fetchData = await fetch('/api/user-signin', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (fetchData.status == 200) {
        const response = await fetchData.json()
        saveTokenToLocal(response.token)
        toast.success('Loged in successfully')
        navigateTo('/myblog', { replace: true })

      } else if (fetchData.status == 400) {
        toast.error('Invalid credentials')
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
      <div className="login-wrap">
        <div className="login-container">
          <div className="animation">
            <img src={animation} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} >
            <h1>Login</h1>
            <input placeholder='Email' type="text" {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email"
              },
              required: {
                value: true,
                message: "Email is required"
              },
            })} />

            <div className="logpass-container">
              <input placeholder='Password' id='logpass' type="password" {...register('pass', {
                required: {
                  value: true,
                  message: "Password is required"
                }

              })} />
              <input type="checkbox" id='eyeinput' />
              <label id="eyelabel" onClick={showPass} htmlFor="eyeinput"><span id='eyespan' className="material-symbols-outlined">
                visibility_off
              </span></label>
            </div>
            <div className="submitBtn">
              <input type="submit" id='submit' disabled={isSubmitting} value={isSubmitting ? "Loading..." : "Sign in"} />
              <lord-icon
              target=".submitBtn"
    src="https://cdn.lordicon.com/whtfgdfm.json"
    trigger="hover"
    >
</lord-icon>
            </div>
          </form>
        </div>
      </div>
      {errors.email && toast.error(errors.email.message)}
      {errors.pass && toast.error(errors.pass.message)}
    </div>
  )
}

export default Login
