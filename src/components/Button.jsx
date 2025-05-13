const Button = ({ label, disabled, custom, onClick }) => {
    return(
        <>
            <button disabled={disabled} className={`cursor-pointer px-4 py-2 rounded bg-rose-400/40 text-white disabled:opacity-50 ${custom}`} onClick={onClick}>{label}</button>
        </>
    )
}

export default Button;