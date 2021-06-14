import { BiPlus } from "react-icons/bi";

interface PlusButtonProps {
    className?: string;
    type?: "button" | "submit" | "reset" | undefined;
    iconSize?: string;
}

export const PlusButton = ({ className, type, iconSize }: PlusButtonProps) => {
    return (
        <button type={type} className={className}>
            {/* this only works if react-icons is install */}
            <BiPlus size={iconSize} />{" "}
        </button>
    );
};
