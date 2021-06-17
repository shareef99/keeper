import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { MouseEvent, useState } from "react";

interface Props {}

const LabelMenu = (props: Props) => {
    // State
    const [labelEl, setLabelEl] = useState<null | HTMLElement>(null);

    // Handlers
    const openLabelMenu = (e: MouseEvent<HTMLLIElement>) => {
        setLabelEl(e.currentTarget);
    };

    const closeLabelMenu = () => {
        setLabelEl(null);
    };

    return (
        <>
            <li
                id="label"
                onClick={openLabelMenu}
                className="MuiButtonBase-root MuiListItem-root MuiMenuItem-root MuiMenuItem-gutters 
                    MuiListItem-gutters MuiListItem-button w-full"
                aria-disabled="false"
                role="menuitem"
                tabIndex={-1}
            >
                Add label
            </li>
            <Menu
                id="label-menu"
                anchorEl={labelEl}
                getContentAnchorEl={null}
                open={Boolean(labelEl)}
                onClose={closeLabelMenu}
                keepMounted
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Testing 1 2 3</MenuItem>
                <MenuItem>Testing 1 2 3</MenuItem>
                <MenuItem>Testing 1 2 3</MenuItem>
            </Menu>
        </>
    );
};

export default LabelMenu;
