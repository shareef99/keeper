import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { MouseEvent, useState } from "react";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BiSearch } from "react-icons/bi";
import { useEffect } from "react";
import { width } from "@material-ui/system";

interface Props {}

const LabelMenu = (props: Props) => {
    // State
    const [labelEl, setLabelEl] = useState<null | HTMLElement>(null);
    const [labels, setLabels] = useState<Array<string>>([
        "Blogs",
        "Notes",
        "College",
        "School",
    ]);
    const [currentNoteLabel, setCurrentNoteLabel] = useState<Array<string>>([]);

    // Effects
    useEffect(() => {
        console.log(currentNoteLabel);
    }, [currentNoteLabel]);

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
                <MenuItem disabled className="disableMenuItem">
                    Label note
                </MenuItem>
                <MenuItem>
                    <Input placeholder="Enter label name" />
                    <BiSearch />
                </MenuItem>
                {labels.map((label) => (
                    <MenuItem>
                        <FormControlLabel
                            style={{ width: `100%` }}
                            control={
                                <Checkbox
                                    color="default"
                                    value={label}
                                    onChange={(e) => {
                                        if (currentNoteLabel.includes(label)) {
                                            return setCurrentNoteLabel(
                                                currentNoteLabel.filter(
                                                    (x) => x !== label
                                                )
                                            );
                                        }
                                        setCurrentNoteLabel((prevLabels) => [
                                            ...prevLabels,
                                            e.target.value,
                                        ]);
                                    }}
                                />
                            }
                            label={label}
                        />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default LabelMenu;
