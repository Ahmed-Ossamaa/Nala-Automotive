import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { UserPlus } from 'lucide-react'; 

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
});

const carImageUrl = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop";

export const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await registerUser(data);
            toast.success('Registration successful!');
            navigate('/'); 
        } catch (error) {
            toast.error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Note: md:flex-row-reverse flips the order on desktop
        <div className="flex flex-col md:flex-row-reverse min-h-screen bg-white">

            {/* Image Side) */}
            <div
                className="relative hidden md:flex md:w-1/2  justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${carImageUrl})` }}
            >
                
                <div className="relative z-10 text-center p-8">
                    <h1 className="text-4xl lg:text-5xl font-bold  mb-4">
                        Start Your Journey
                    </h1>
                    <p className="text-xl lg:text-2xl text-gray-600">
                        Join us and explore thousands of premium cars.
                    </p>
                </div>
            </div>

            {/* Form Side (Left) */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="max-w-md w-full">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600">
                            Join us to explore our car collection
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter your name"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="user@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label="Phone Number (Optional)"
                            type="tel"
                            placeholder="+1234567890"
                            error={errors.phone?.message}
                            {...register('phone')}
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="flex w-full"
                            isLoading={isLoading}
                        >
                            <div className="flex mx-auto"> 
                                {!isLoading && <UserPlus className="w-4 h-4 mx-2 mt-1" />}
                                Create Account
                            </div>
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};