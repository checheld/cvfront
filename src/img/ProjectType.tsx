import React from "react";

interface IconProps {
    isActive?: boolean,
}

const ProjectType: React.FC<IconProps> = ({ isActive = false }) => {
    const activeColor = '#5893F9'
    const fill = isActive ? activeColor : 'rgba(255, 255, 255, 0.4)'

    return < svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M2.25 9.75H3.75V8.25H2.25V9.75ZM2.25 12.75H3.75V11.25H2.25V12.75ZM2.25 6.75H3.75V5.25H2.25V6.75ZM5.25 9.75H15.75V8.25H5.25V9.75ZM5.25 12.75H15.75V11.25H5.25V12.75ZM5.25 5.25V6.75H15.75V5.25H5.25Z"
            fill={fill} />
    </svg >
}
export default ProjectType



