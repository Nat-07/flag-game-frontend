import * as React from "react";
import { motion, Variants } from "framer-motion";
import { GlobeIcon } from "@heroicons/react/outline";
import { ThemeContext } from "../../pages/_app";

interface Props {
    pageLoaded: boolean;
}

const ThemeToggle: React.FC<Props> = ({ pageLoaded }) => {
    const themeToggleVar: Variants = {
        right: {
            x: 28,
        },
        left: {
            x: 0,
        },
    };

    // return light or dark
    const darkOrLight = (theme: string): string =>
        theme === "dark" ? "left" : "right";

    return (
        /* disable flickering of text */
        pageLoaded ? (
            // consume theme and settheme
            <ThemeContext.Consumer>
                {({ theme, setTheme }) => (
                    <div>
                        <div
                            onClick={() =>
                                setTheme(theme === "light" ? "dark" : "light")
                            }
                            className="flex w-12 h-5 rounded-full justify-self-start ring-2 ring-black dark:ring-white "
                        >
                            {/* animate the globe icon moving */}
                            <motion.div
                                variants={themeToggleVar}
                                animate={darkOrLight(theme)}
                                initial={darkOrLight(theme)}
                                transition={{
                                    ease: [0.25, 0.5, 0.75, 1],
                                }}
                            >
                                <GlobeIcon className="w-5 h-5 stroke-black dark:stroke-white" />
                            </motion.div>
                        </div>

                        <p className="text-black dark:text-white">
                            {/*  theme initialized, else know OS preference */}
                            {theme ? theme : "System"}
                        </p>
                    </div>
                )}
            </ThemeContext.Consumer>
        ) : null
    );
};

export default ThemeToggle;