import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import "./styles/pages/home.scss";

interface Props {}

const Home = (props: Props) => {
    const el = useRef<HTMLSpanElement>(null);

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
        <section
            className="container grid md:grid-cols-2 md:place-items-center"
            style={{ height: "calc(100vh - 5rem)" }}
        >
            <div className="place-self-center w-full">
                <h1
                    className="text-[2rem] xs:text-4xl sm:text-5xl lg:text-7xl xl:text-8xl w-full 
                        text-center "
                >
                    <span className="inline-block md:mb-4">Keep your</span>
                    <div className="h-16">
                        <span
                            ref={el}
                            className="bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 
                                p-2 underline inline-block"
                        ></span>
                    </div>
                    <span className="inline-block md:mt-12">in keeper</span>
                </h1>
            </div>
            <div
                className="self-start place-self-center md:self-center px-3 py-2 rounded-md
                    bg-gradient-to-b from-yellow-300 via-yellow-300 to-yellow-400 font-black text-xl
                    hover:from-yellow-400 hover:to-yellow-300 shadow-md"
            >
                <Link to="/keeper">
                    <button>Go To Keep &#10230;</button>
                </Link>
            </div>
        </section>
    );
};

export default Home;
