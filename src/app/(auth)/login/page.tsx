'use client';

import Image from 'next/image';
import AuthLayout from '../layout';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TextInput from '../../../components/textInput';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>(null);
  const router = useRouter();
  return (
    <AuthLayout>
      <div className="mt-10">
        <h1 className="lg:text-5xl text-3xl text-center font-extrabold">
          Log in to your Linktree
        </h1>

        <form className="mt-12">
          <div>
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

          <div className="mt-10">
            <button
              type="submit"
              className={`rounded-full w-full p-3 font-bold ${
                email && password
                  ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white'
                  : 'bg-[#EFF0EB] text-[#A7AAA2]'
              }`}
              disabled={!email || !password}
            >
              Log in
            </button>
          </div>
        </form>

        <div className="text-[14px] text-center pt-12">
          <span className="m">Don&apos;t have an account?</span>
          <Link href="/register" className="text-[#8228D9] underline">
            Sign up
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
