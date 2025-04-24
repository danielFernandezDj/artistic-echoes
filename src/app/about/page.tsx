"use client"

import Container from "@/components/layout/Container"
import { Flex } from "@radix-ui/themes";
import Footer from "@/components/layout/Footer";

export default function About() {
    return (
        <div className="flex flex-col w-full h-auto bg-slate-50 dark:bg-slate-200">
            <Container
                as="section"
                size="sm"
                padding="lg"
                position="relative"
                className="flex flex-col gap-4 justify-center items-center w-svh m-8"
            >
                <h1 className="text-3xl font-bold text-center text-gray-800  underline decoration-1 decoration-magenta-color/50 underline-offset-8">
                    About Artistic Echoes
                </h1>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    className="w-full h-auto p-4 gap-10 bg-slate-100 rounded-lg shadow-md"
                >
                    <p className="indent-4">
                        Artistic Echoes is a web application designed to explore and discover artworks from The Metropolitan Museum of Art Collection.
                        With a focus on user experience, the platform allows users to search, filter, and view artworks in a visually appealing and intuitive manner.
                        The application is built using modern web technologies, ensuring a responsive and engaging experience across devices.
                    </p>
                    <p className="indent-4">
                        The project was developed by <span className="font-medium text-orange-color">&quot;Daniel Fernandez&quot;</span>, a passionate developer and artist, who aims to bridge the gap between technology and art.
                        By leveraging the power of The Met&apos;s open access collection, Artistic Echoes provides a unique platform for art enthusiasts, students, and anyone interested in exploring the world of art.
                        The application is designed to be user-friendly, allowing users to easily navigate through the collection and discover new artworks.
                        The platform also emphasizes the importance of accessibility, ensuring that everyone can enjoy and appreciate the beauty of art.
                    </p>
                    <p className="indent-4">
                        Artistic Echoes is not just a tool for discovering art; it is a celebration of creativity and expression.
                        The project reflects the belief that art should be accessible to all, and that technology can play a significant role in enhancing our appreciation of it.
                        Whether you are an art lover, a student, or simply curious about the world of art, Artistic Echoes invites you to explore, discover, and be inspired.
                        Join us on this journey of artistic exploration and let the echoes of creativity resonate within you.
                    </p>
                </Flex>
            </Container>

            <Footer />
        </div>
    )
}