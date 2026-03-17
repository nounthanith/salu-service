'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import Link from 'next/link';
import { login } from '@/app/src/auth.service';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData);
            router.push("/");
            router.refresh();
        } catch (err: any) {
            alert(`⚠️ Login Error: ${err.message}`);
        } finally {
            setLoading(false)
        }
    };

    return (

        <div className='mt-24 px-4'>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-5 max-w-sm m-auto justify-center p-8 border-2 border-foreground shadow-foreground rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-background'
            >
                <header>
                    <h1 className='font-bold text-2xl underline text-center'>Login</h1>
                </header>


                <div className="space-y-4">
                    <Input
                        label='Email Address'
                        type='email'
                        placeholder='name@company.com'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label='Password'
                        type='password'
                        placeholder='••••••••'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                </div>

                <Button disabled={loading}>
                    {loading ? 'Processing...' : 'Sign In'}
                </Button>

                <p className='text-[14px] text-center '>Don't have an account? <Link className='underline' href="/register">Sign Up</Link></p>
            </form>
        </div>
    );
};

export default Login;