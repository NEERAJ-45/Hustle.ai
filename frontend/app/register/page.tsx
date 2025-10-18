'use client'

import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

type RegisterFormInputs = {
  name: string
  email: string
  password: string
}

export default function Register() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>()

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        data
      )

      toast.success(res.data.message || 'Account created successfully!')
      router.push('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-gradient-to-b from-black via-gray-900 to-black px-4 font-[var(--font-inter)]">
      <div className="w-full max-w-md bg-black/70 backdrop-blur-md border border-gray-800 rounded-3xl shadow-2xl p-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-primary-foreground text-center mb-8">
          Register
        </h1>
        <p className="text-center text-gray-100 mb-8">
          Create your account to get started.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            {...register('name', { required: 'Full Name is required' })}
            type="text"
            placeholder="Full Name"
            className={`bg-gray-800/70 placeholder:text-gray-400 text-white focus:ring-2 transition-all duration-200 rounded-xl px-4 py-3 border ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm font-semibold">{errors.name.message}</p>}

          <Input
            {...register('email', { required: 'Email is required' })}
            type="email"
            placeholder="Email"
            className={`bg-gray-800/70 placeholder:text-gray-400 text-white focus:ring-2 transition-all duration-200 rounded-xl px-4 py-3 border ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm font-semibold">{errors.email.message}</p>}

          <Input
            {...register('password', { required: 'Password is required' })}
            type="password"
            placeholder="Password"
            className={`bg-gray-800/70 placeholder:text-gray-400 text-white focus:ring-2 transition-all duration-200 rounded-xl px-4 py-3 border ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-700 focus:border-primary-500 focus:ring-primary-500'
            }`}
          />
          {errors.password && <p className="text-red-500 text-sm font-semibold">{errors.password.message}</p>}

          <Button
            type="submit"
            className="w-full hover:bg-indigo-700 bg-indigo-800 text-white font-semibold py-3 rounded-xl transition-colors duration-200 disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-200 mt-6">
          Already have an account?{' '}
          <Link
            href="/"
            className="font-medium underline text-primary-500 hover:text-primary-600 transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
