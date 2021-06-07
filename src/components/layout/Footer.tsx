interface Props {}

const Footer = (props: Props) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    return (
        <footer>
            <p style={{ color: "red" }}>Copyright {currentYear}</p>
        </footer>
    );
};

export default Footer;
