import React from 'react';
import {useNavigate} from "react-router-dom";

const TermsPage = () => {
    const navigate = useNavigate()

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-12 text-center tprimary mt-20">Terms and Conditions</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-lg leading-relaxed">
                    These terms and conditions govern your use of this website and any services offered. By accessing this site, you agree to comply with these terms.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
                <p className="text-lg leading-relaxed">
                    All content on this website, including but not limited to text, graphics, logos, and images, is the property of Frédéric Forster and is protected by intellectual property laws.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="text-lg leading-relaxed">
                    Frédéric Forster is not liable for any damages that may arise from using this website, including loss of data or profits.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                <p className="text-lg leading-relaxed">
                    These terms will be governed by and construed in accordance with the laws of the country in which Frédéric Forster operates.
                </p>
            </section>
            <div className={"flex justify-center mt-12 mb-20"}>
                <button onClick={() => navigate("/")} className={"btn"}>Go back to home page</button>
            </div>
        </div>
    );
};

export default TermsPage;