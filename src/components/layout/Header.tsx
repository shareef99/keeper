import HighlightIcon from "@material-ui/icons/Highlight";

interface Props {}

const Header = (props: Props) => {
    return (
        <header>
            <h1>
                <HighlightIcon className="mb-2" /> Keeper
            </h1>
        </header>
    );
};

export default Header;
