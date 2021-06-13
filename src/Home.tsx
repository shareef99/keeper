import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import { useAuth } from "./context/AuthContext";
import { FcGoogle } from "react-icons/fc";

interface Props {}

const Home = (props: Props) => {
    // Refs
    const el = useRef<HTMLSpanElement>(null);

    // Context
    const { user, login } = useAuth();

    // Effects
    useEffect(() => {
        const typed = new Typed(el.current!, {
            strings: ["thoughts", "schedule", "secrets", "plans", "notes"],
            startDelay: 300,
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 100,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: "!",
        });

        return () => {
            typed.destroy();
        };
    }, []);

    return (
        <section className="container grid md:grid-cols-2 md:place-items-center fullHeight">
            <div className="place-self-center w-full">
                <h1 className="text-[3rem] lg:text-7xl xl:text-8xl w-full text-center">
                    <span className="inline-block md:mb-4">Keep your</span>
                    <div className="h-16">
                        <span
                            ref={el}
                            className="bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 
                                p-2 underline inline-block"
                        ></span>
                    </div>
                    <span className="inline-block mt-4 lg:mt-12">
                        in keeper
                    </span>
                </h1>
            </div>
            <div className="self-start place-self-center md:self-center">
                {user ? (
                    <div
                        className="px-3 py-2 rounded-md font-black text-xl shadow-md
                            bg-gradient-to-b from-yellow-300 via-yellow-300 to-yellow-400
                            hover:from-yellow-400 hover:to-yellow-300 "
                    >
                        <Link to={`/keeper/${user.name}`}>
                            <button>Go To Keep &#10230;</button>
                        </Link>
                    </div>
                ) : (
                    <div
                        className="rowCenter space-x-2 px-6 py-4 rounded-md bg-gray-400 cursor-pointer 
                            hover:text-gray-800"
                        onClick={login}
                    >
                        <FcGoogle size="2rem" />
                        <button className="font-medium text-xl">
                            continue with Google
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
