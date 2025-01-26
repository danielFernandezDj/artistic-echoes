"use client"

import React, { useState } from "react"
import Container from "@/components/layout/Container"

interface IsLoginProps {
    isLogin: boolean;
}


const SignUp: React.FC<IsLoginProps> = () => {
    const [isLogin, setIsLogin] = useState(false)

    return (
        <Container
            size="full"
            position="relative"
            className=""
        >
            {!isLogin
                ? <div>
                    <p>Signin plz!</p>
                    <button
                        onClick={() => setIsLogin(true)}
                        className="p-4 bg-orange-500"
                    >
                        LogIn
                    </button>
                </div>

                : <div>
                    <p>User logOut</p>
                    <button
                        onClick={() => setIsLogin(false)}
                        className="p-4 bg-orange-500"
                    >
                        Close section!
                    </button>
                </div>
            }

        </Container>
    )
}

export default SignUp;