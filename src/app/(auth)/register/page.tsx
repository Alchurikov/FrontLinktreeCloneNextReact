'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '../layout';
import TextInput from '../../../components/textInput';
import { useUserStore } from '../../../store/userStore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();
  const userStore = useUserStore();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
  };

  return (
    <AuthLayout>
      <div className="mt-10">
        <h1 className="lg:text-5xl text-3xl text-center font-extrabold">
          Create your account
        </h1>

        <form className="mt-12" onSubmit={register}>
          <div>
            <TextInput
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              inputType="text"
              error={errors && errors.name ? errors.name[0] : ''}
            />
          </div>

          <div className="mt-4">
            <TextInput
              placeholder="Email: link@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputType="email"
              error={errors && errors.email ? errors.email[0] : ''}
            />
          </div>

          <div className="mt-4">
            <TextInput
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputType="password"
              error={errors && errors.password ? errors.password[0] : ''}
            />
          </div>

          <div className="mt-4">
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              inputType="password"
            />
          </div>

          <div className="mt-10">
            <button
              type="submit"
              className={`rounded-full w-full p-3 font-bold ${
                name && email && password && confirmPassword
                  ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                  : 'bg-[#EFF0EB] text-[#A7AAA2]'
              }`}
              disabled={!name || !email || !password || !confirmPassword}
            >
              Create account
            </button>
          </div>
        </form>

        <div className="text-[14px] text-center pt-12">
          <span className="mr-2">Already have an account?</span>
          <Link href="/" className="text-[#8228D9] underline">
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
