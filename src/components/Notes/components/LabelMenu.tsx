import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { ChangeEvent, MouseEvent, useState } from "react";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { BiSearch, BiPlus } from "react-icons/bi";
import { useEffect } from "react";
import { useNote } from "../../../context/NoteContext";

interface Props {}

const LabelMenu = (props: Props) => {
    // Context
    const { addLabel } = useNote();

    // State
    const [labelEl, setLabelEl] = useState<null | HTMLElement>(null);
    const [labels] = useState<Array<string>>([
        "Blogs",
        "Notes",
        "Note",
        "College",
        "School",
    ]);
    const [currentNoteLabel, setCurrentNoteLabel] = useState<Array<string>>([]);
    const [searchLabel, setSearchLabel] = useState<string>("");

    // Effects
    useEffect(() => {
        console.log(currentNoteLabel);
    }, [currentNoteLabel]);
    useEffect(() => {
        console.log(searchLabel);
    }, [searchLabel]);

    // Handlers
    const openLabelMenu = (e: MouseEvent<HTMLLIElement>) => {
        setLabelEl(e.currentTarget);
    };

    const closeLabelMenu = () => {
        setLabelEl(null);
    };

    const labelChange = (e: ChangeEvent<HTMLInputElement>, label: string) => {
        if (currentNoteLabel.includes(label)) {
            return setCurrentNoteLabel(() =>
                currentNoteLabel.filter((x) => x !== label)
            );
        }
        setCurrentNoteLabel((prevLabels) => [...prevLabels, e.target.value]);
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
                transitionDuration={300}
                TransitionComponent={Fade}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                autoFocus={false}
                disableAutoFocusItem={true}
                disableAutoFocus={true}
            >
                <MenuItem disabled className="disableMenuItem">
                    Label note
                </MenuItem>
                <MenuItem>
                    <Input
                        placeholder="Enter label name"
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setSearchLabel(e.target.value);
                        }}
                    />
                    <BiSearch />
                </MenuItem>
                {labels.map((label) => {
                    return Boolean(searchLabel) ? (
                        label
                            .toLowerCase()
                            .indexOf(searchLabel.toLowerCase()) !== -1 && (
                            <MenuItem>
                                <FormControlLabel
                                    style={{ width: `100%` }}
                                    control={
                                        <Checkbox
                                            color="default"
                                            value={label}
                                            onChange={(e) =>
                                                labelChange(e, label)
                                            }
                                        />
                                    }
                                    label={label}
                                />
                            </MenuItem>
                        )
                    ) : (
                        <MenuItem>
                            <FormControlLabel
                                style={{ width: `100%` }}
                                control={
                                    <Checkbox
                                        color="default"
                                        value={label}
                                        onChange={(e) => labelChange(e, label)}
                                    />
                                }
                                label={label}
                            />
                        </MenuItem>
                    );
                })}
                {Boolean(searchLabel) && (
                    <MenuItem
                        className="space-x-2"
                        onClick={() => addLabel(searchLabel)}
                    >
                        <BiPlus size="1.25rem" />
                        <span>Create </span>
                        <span>{searchLabel}</span>
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

export default LabelMenu;
