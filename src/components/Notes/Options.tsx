import { useState, MouseEvent } from "react";
import { MdMoreVert } from "react-icons/md";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useNote } from "../../context/NoteContext";

interface Props {
    id?: string;
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

    const deleteHandler = () => {
        deleteNote(id!);
        closeMenu();
    };

    const labelHandler = () => {
        closeMenu();
    };

    return (
        <>
            {!id && (
                <button
                    className="font-medium text-lg"
                    id="cancel"
                    onClick={() => console.log("cancel")}
                >
                    Cancel
                </button>
            )}
            <button type="button" id="more-button" onClick={openMenu}>
                <MdMoreVert size="1.65rem" id="more" />
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
                {id && <MenuItem onClick={deleteHandler}>Delete note</MenuItem>}
                <MenuItem id="label" onClick={labelHandler}>
                    Add label
                </MenuItem>
                <MenuItem id="copy" onClick={closeMenu}>
                    Make a copy
                </MenuItem>
                <MenuItem id="secret" onClick={closeMenu}>
                    Add to secret
                </MenuItem>
            </Menu>
        </>
    );
};

export default Options;
