import { useState, MouseEvent } from "react";
import { MdMoreVert } from "react-icons/md";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useNote } from "../../../context/NoteContext";
import LabelMenu from "./LabelMenu";

interface Props {
    id?: string;
}

const Options = ({ id }: Props) => {
    // Context
    const { deleteNote } = useNote();

    // State
    const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);

    // Handlers / Functions
    const openMenu = (e: MouseEvent<HTMLButtonElement>) => {
        setMenuEl(e.currentTarget);
    };

    const closeMenu = () => {
        setMenuEl(null);
    };

    const deleteHandler = () => {
        deleteNote(id!);
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
            <button type="button" onClick={openMenu}>
                <MdMoreVert size="1.65rem" />
            </button>
            <Menu
                id="options"
                anchorEl={menuEl}
                getContentAnchorEl={null}
                open={Boolean(menuEl)}
                onClose={closeMenu}
                keepMounted
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                {id && <MenuItem onClick={deleteHandler}>Delete note</MenuItem>}
                <LabelMenu closeMenu={closeMenu} id={id} />
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
