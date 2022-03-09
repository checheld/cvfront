import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Users: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'

return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6ZM6 7.5C3.9975 7.5 0 8.505 0 10.5V11.25C0 11.6625 0.3375 12 0.75 12H11.25C11.6625 12 12 11.6625 12 11.25V10.5C12 8.505 8.0025 7.5 6 7.5Z" 
fill={fill}/>
</svg>
}
export default Users