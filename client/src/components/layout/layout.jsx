import { Footer } from './footer';
import { Navbar } from './navbar';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};
