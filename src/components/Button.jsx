const Button = ({ label, disabled, custom, onClick }) => {
    return(
        <>
            <button disabled={disabled} className={`cursor-pointer px-4 py-2 rounded bg-secondary-1 ${custom}`} onClick={onClick}>{label}</button>
        </>
    )
}

export default Button;