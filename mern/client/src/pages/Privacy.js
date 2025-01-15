import React from 'react';
import {useNavigate} from "react-router-dom";

const PrivacyPage = () => {
    const navigate = useNavigate()

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-4xl font-bold mb-12 text-center tprimary mt-20">Privacy Policy</h1>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="text-lg leading-relaxed">
                    This privacy policy explains how we collect, use, and protect your personal information when you visit our website.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Information Collection</h2>
                <p className="text-lg leading-relaxed">
                    We collect personal data such as your name, email, and other details that you provide when you contact us or sign up for our services.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Usage</h2>
                <p className="text-lg leading-relaxed">
                    The information we collect is used to provide and improve our services, communicate with you, and manage your inquiries.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
                <p className="text-lg leading-relaxed">
                    We take reasonable measures to protect your personal data from unauthorized access, alteration, and destruction.
                </p>
            </section>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Third-Party Disclosure</h2>
                <p className="text-lg leading-relaxed">
                    We do not sell, trade, or share your personal information with third parties, except when required by law.
                </p>
            </section>
            <div className={"flex justify-center mt-12 mb-20"}>
                <button onClick={() => navigate("/")} className={"btn"}>Go back to home page</button>
            </div>
        </div>
    );
};

export default PrivacyPage;