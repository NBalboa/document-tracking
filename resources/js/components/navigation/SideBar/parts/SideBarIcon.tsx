import { FaUsersGear } from "react-icons/fa6";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { HiRectangleGroup } from "react-icons/hi2";
import { IoMdLocate } from "react-icons/io";

export type Icon = 'dashboard' | 'document' | 'user' | 'department' | 'track';

const SideBarIcon = ({ name, isHideLabel }: { name: Icon, isHideLabel: boolean }) => {
    switch (name) {
        case "dashboard":
            return <MdDashboard size={isHideLabel ? 24 : 20} />
        case "document":
            return <IoDocumentTextSharp size={isHideLabel ? 24 : 20} />
        case "user":
            return <FaUsersGear size={isHideLabel ? 24 : 20} />

        case "department":
            return <HiRectangleGroup size={isHideLabel ? 24 : 20} />
        case "track":
            return <IoMdLocate size={isHideLabel ? 24 : 20} />
        default:
            return null
    }
}

export default SideBarIcon
