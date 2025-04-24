"use client"

import Container from "@/components/layout/Container"
import { Flex } from "@radix-ui/themes";
import Footer from "@/components/layout/Footer";

export default function License() {
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
                    License
                </h1>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    className="w-full h-auto p-4 gap-4 bg-slate-100 rounded-lg shadow-md"
                >
                    <p>
                        Artistic Echoes utilizes public domain images and data provided by
                        <a
                            className="font-semibold hover:text-blue-500 underline decoration-1 decoration-blue-500 underline-offset-4"
                            href="https://metmuseum.github.io/"
                            target="_blank"
                        >
                            The Metropolitan Museum of Art Collection API
                        </a>.
                        The Metropolitan Museum of Art provides open access to over 375,000 images and associated data for artworks that the museum believes to be in the public domain.
                    </p>
                    <p>
                        All artworks featured on this platform fall under the <span className="font-semibold">Creative Commons Zero (CC0)</span>  license, meaning they are free to use for any purpose, with no permission required.
                        You can learn more about the terms of use on -
                        <a
                            className="font-semibold hover:text-blue-500 underline decoration-1 decoration-blue-500 underline-offset-4"
                            href="https://www.metmuseum.org/about-the-met/policies-and-documents/open-access"
                            target="_blank"
                        >
                            The Met’s Open Access initiative
                        </a>.
                    </p>
                    <p>
                        This website and its content (excluding external artwork and data from The Met) is © 2025 Artistic Echoes. All rights reserved.
                    </p>
                </ Flex>
            </Container>

            <Footer />
        </div>
    )
}