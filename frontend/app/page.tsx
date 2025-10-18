'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type LoginFormInputs = {
  email: string
  password: string
}

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, // uses your .env variable
      data
    )

    toast.success(res.data.message || 'Logged in successfully!')
    router.push('/dashboard')
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message || 'Login failed')
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-b from-black via-gray-900 to-black px-4 font-[var(--font-inter)]">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl shadow-2xl p-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-primary-foreground text-center mb-8">
          Sign In
        </h1>
        <p className="text-center text-gray-100 mb-8">
          Welcome back! Please enter your credentials.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className="bg-gray-800/70  border-gray-700 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
          {errors.email && <p className="text-red-500 text-sm font-semibold">{errors.email.message}</p>}

          <Input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Password"
            className="bg-gray-800/70 border-gray-700 placeholder:text-gray-400 text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
          />
          {errors.password && <p className="text-red-500 text-sm font-semibold">{errors.password.message}</p>}

          <Button
            type="submit"
            className="w-full hover:bg-indigo-700 bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-200 mt-6">
          Don&apos;t have an account?{' '}
          <a
            href="/register"
            className="font-medium underline text-primary-500 hover:text-primary-600 transition-colors duration-200"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  )
}
