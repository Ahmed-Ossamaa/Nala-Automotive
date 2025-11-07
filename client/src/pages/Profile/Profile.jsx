import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Container } from '../../components/layout/container';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { User, Lock, Mail, Phone, Edit2, X, Check } from 'lucide-react';
import { authAPI } from '../../api/auth.api';

export const Profile = () => {
    const { user, updateProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    // Profile Form
    const { register, handleSubmit, reset } = useForm();

    // Password Form
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        reset: resetPassword
    } = useForm();

    // Update form when user loads
    useEffect(() => {
        if (user) {
            reset({ name: user.name, phone: user.phone || '' });
        }
    }, [user, reset]);

    // Update Profile
    const onUpdateProfile = async (data) => {
        try {
            await updateProfile(data);
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } catch (error) {
            toast.error(error?.message || 'Failed to update profile');
        }
    };

    // Change Password
    const onChangePassword = async (data) => {
        try {
            await authAPI.changePassword(data);
            toast.success('Password changed successfully');
            resetPassword();
            setShowPasswordForm(false);
        } catch (error) {
            toast.error(error?.message || 'Failed to change password');
        }
    };

    return (
        <Container className="py-8 md:py-12">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="text-gray-600 mt-2">Manage your account information and security</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Sidebar - User Info */}
                    <div className="lg:col-span-1">
                        <div className="card text-center">
                            <div className="w-24 h-24 bg-linear-to-br from-primary-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <User size={40} className="text-white" />
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-1">{user?.name}</h2>
                            <p className="text-sm text-gray-600 mb-3">{user?.email}</p>
                            <Badge variant="primary" className="uppercase text-xs">
                                {user?.role}
                            </Badge>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Information */}
                        <div className="card">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                                {!isEditing && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit2 size={16} className="mr-2" />
                                        Edit
                                    </Button>
                                )}
                            </div>

                            <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-4">
                                {/* Name */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                        <User size={20} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Full Name"
                                            placeholder="John Doe"
                                            {...register('name', { required: true })}
                                            disabled={!isEditing}
                                            className={!isEditing ? 'bg-gray-50' : ''}
                                        />
                                    </div>
                                </div>

                                {/* Email "cant change" */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                        <Mail size={20} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Email Address"
                                            value={user?.email || ''}
                                            disabled
                                            className="bg-gray-50"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0 mt-1">
                                        <Phone size={20} className="text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            label="Phone Number"
                                            type="tel"
                                            placeholder="+1 234 567 8900"
                                            {...register('phone')}
                                            disabled={!isEditing}
                                            className={!isEditing ? 'bg-gray-50' : ''}
                                        />
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex gap-3 pt-4 border-t">
                                        <Button type="submit" variant="primary" className="flex">
                                            <Check size={18} className="mr-2 mt-1" />
                                            Save Changes
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            className="flex"
                                            onClick={() => {
                                                setIsEditing(false);
                                                reset({ name: user?.name, phone: user?.phone || '' });
                                            }}
                                        >
                                            <X size={18} className="mr-2 mt-1" />
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Security Section */}
                        <div className="card">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                        <Lock size={20} />
                                        Security
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
                                </div>
                            </div>

                            {!showPasswordForm ? (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className='flex'
                                    onClick={() => setShowPasswordForm(true)}
                                >
                                    <Lock size={18} className="mr-2 mt-1" />
                                    Change Password
                                </Button>
                            ) : (
                                <form onSubmit={handlePasswordSubmit(onChangePassword)} className="space-y-4">
                                    <Input
                                        type="password"
                                        label="Current Password"
                                        placeholder="Enter current password"
                                        {...registerPassword('currentPassword', { required: true })}
                                    />

                                    <Input
                                        type="password"
                                        label="New Password"
                                        placeholder="Enter new password (min 6 characters)"
                                        {...registerPassword('newPassword', {
                                            required: true,
                                            minLength: 6
                                        })}
                                    />

                                    <div className="flex gap-3 pt-4 border-t">
                                        <Button type="submit" variant="primary" className="flex-1">
                                            <Check size={18} className="mr-2" />
                                            Update Password
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => {
                                                setShowPasswordForm(false);
                                                resetPassword();
                                            }}
                                        >
                                            <X size={18} className="mr-2" />
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};