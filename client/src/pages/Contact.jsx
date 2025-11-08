import { Mail, Phone, MapPin } from 'lucide-react';

import { Container } from '../components/layout/container';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const Contact = () => {
    return (
        <div className='mx'>
            <section className="bg-gray-50 py-15">
                <Container className="text-center max-w-5xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                        Have a question or a car to sell? We'd love to hear from you. You can reach us via the methods below.
                    </p>
                </Container>
            </section>
            <section className="pt-5 mb-30">
                <Container>
                        {/* Contact Information */}
                        <div className="space-y-8 ">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Contact Information
                            </h2>
                            <p className="text-lg text-gray-600">
                                Our team is available to help you with any inquiries you may have.
                            </p>
                            
                            <ul className="space-y-6 text-lg">
                                <li className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-primary-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Email</h3>
                                        <a href="mailto:support@nala-auto.com" className="text-gray-600 hover:text-primary-600 transition">
                                            Amr@NalaAuto.com
                                        </a>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <Phone className="w-6 h-6 text-primary-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Phone</h3>
                                        <p  className="text-gray-600 hover:text-primary-600 transition">
                                            +971 50 437 1312
                                        </p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <MapPin className="w-6 h-6 text-primary-600 mt-1 shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-gray-900">Office</h3>
                                        <p className="text-gray-600">
                                            Barsha Heights, Dubai, UAE 
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                </Container>
            </section>
        </div>
    );
};