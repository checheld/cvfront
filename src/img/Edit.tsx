import React from "react";

interface IconProps {
    isActive?: boolean,
}

const Edit: React.FC<IconProps> = ({ isActive = false}) => {
    const activeColor = '#5893F9'
    const fill = isActive ?  activeColor : 'rgba(255, 255, 255, 0.4)'

return <div> 
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'relative', top: '3.5px'}}>
                <path d="M2.25 13.0949V15.3749C2.25 15.5849 2.415 15.7499 2.625 15.7499H4.905C5.0025 15.7499 5.1 15.7124 5.1675 15.6374L13.3575 7.45492L10.545 4.64242L2.3625 12.8249C2.2875 12.8999 2.25 12.9899 2.25 13.0949ZM15.5325 5.27992C15.825 4.98742 15.825 4.51492 15.5325 4.22242L13.7775 2.46742C13.485 2.17492 13.0125 2.17492 12.72 2.46742L11.3475 3.83992L14.16 6.65242L15.5325 5.27992Z" fill="#BAC1CC"/>
            </svg>
        </div>

}
export default Edit
