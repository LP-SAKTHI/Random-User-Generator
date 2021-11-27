import { Wrapper } from "./style/Button"

const Button = ({className,children,onClick,}) => {
    return (
        <Wrapper
        className={className} 
        onClick={onClick}
        
        >
            {children}

    
        </Wrapper>
    )
}

export default Button
