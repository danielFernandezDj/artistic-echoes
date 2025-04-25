"use client"

import Footer from "@/components/layout/Footer";
import Head from 'next/head';

export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact | Artistic Echoes</title>
                <meta name="description" content="Get in touch with Daniel, creator of Artistic Echoes." />
            </Head>

            <main className="max-w-3xl mx-auto p-4 my-4">
                <h1 className="text-4xl font-bold mb-4 pb-1 border-b-2 border-magenta-color/50 inline-block">
                    Get in Touch
                </h1>

                <p className="text-lg text-gray-700 mb-8">
                    I&apos;m <strong>Daniel</strong>, the creator of <span className="font-semibold text-purple-700">Artistic Echoes</span> — a modern web experience that brings
                    public domain artwork to life using The Met Museum&apos;s API. Whether you’re interested in collaborating, learning more about the project, or just want to say hello,
                    feel free to reach out.
                </p>

                <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-purple-700">Email</h2>
                        <a href="danielfernandez.tech@gmail.com" className="text-gray-800 hover:text-purple-600">
                            danielfernandez.tech@gmail.com
                        </a>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-purple-700">Linkedin</h2>
                        <a
                            href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile"
                            target="_blank"
                            className="text-gray-800 hover:text-purple-600" rel="noopener noreferrer"
                        >
                            Daniel Fernandez
                        </a>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-purple-700">GitHub</h2>
                        <a href="https://github.com/danielFernandezDj/artistic-echoes.git" target="_blank" className="text-gray-800 hover:text-purple-600" rel="noopener noreferrer">
                            Artistic Echoes Repository
                        </a>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2 text-purple-700">Location</h2>
                        <p className="text-gray-700">Las Vegas, NV — Available for remote collaboration 🌎</p>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mt-10">
                    Built with ❤️ using Next.js and Tailwind CSS
                </p>
            </main>

            <Footer />
        </>
    )
}