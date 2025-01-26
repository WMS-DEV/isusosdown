import React from "react"

interface MaterialIconProps {
    iconName: string;
    fontSize?: string;
    color?: string;
}

export const MaterialIcon = (props:MaterialIconProps) => {
    return (
        <span 
            className="material-symbols-outlined"
            style={{fontSize:props.fontSize, color:props.color}}
        >
            {props.iconName}
        </span>
    )
}