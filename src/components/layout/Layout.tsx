import { Fragment, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <Fragment>
            <Header />
            <main>{children}</main>
            <Footer />
        </Fragment>
    );
};

export default Layout;
