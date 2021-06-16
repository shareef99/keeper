import { useState, MouseEvent } from "react";
import { MdMoreVert } from "react-icons/md";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useNote } from "../../context/NoteContext";

interface Props {
    id: string;
}

const Options = ({ id }: Props) => {
    // Context
    const { deleteNote } = useNote();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // Handlers / Functions
    const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <button type="button" onClick={openMenu}>
                <MdMoreVert size="1.65rem" />
            </button>
            <Menu
                id="options"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                keepMounted
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem
                    onClick={() => {
                        deleteNote(id);
                        closeMenu();
                    }}
                >
                    Delete note
                </MenuItem>
                <MenuItem onClick={closeMenu}>Add label</MenuItem>
                <MenuItem onClick={closeMenu}>Make a copy</MenuItem>
                <MenuItem onClick={closeMenu}>Add to secret</MenuItem>
            </Menu>
        </>
    );
};

export default Options;
