import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { LogIn } from 'lucide-react'; 

const loginSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const carImageUrl = "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1974&auto=format&fit=crop";

export const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await login(data);
            toast.success('Login successful!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            
            {/* Image Side (Left) */}
            <div 
                className="relative hidden md:flex md:w-1/2  justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${carImageUrl})` }}
            >
                
                <div className="relative z-10 text-center p-8">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-800">
                        Find your perfect ride, waiting just for you.
                    </p>
                </div>
            </div>

            {/* Form Side (Right) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        {/* Mobile-only header */}
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 md:hidden">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600 md:hidden">
                            Login to your account to continue
                        </p>
                        
                        {/* Desktop header */}
                        <h1 className="hidden md:block text-3xl font-bold text-gray-900 mb-2">
                            Login to Your Account
                        </h1>
                        <p className="hidden md:block text-gray-600">
                            Please enter your credentials
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="user@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <div>
                            {/* <div className="flex justify-between items-baseline mb-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <Link 
                                    to="/forgot-password" 
                                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                                >
                                    Forgot password?
                                </Link>
                            </div> */}
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                error={errors.password?.message}
                                {...register('password')}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="flex  w-full"
                            isLoading={isLoading}
                        >
                            <div className="flex mx-auto"> 
                            Login
                            {!isLoading && <LogIn className="w-4 h-4 ml-2 mt-1" />}
                            </div>
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};