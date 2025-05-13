import Logo from "../assets/img/logoGray.png";

const LogoGray = ({ title, description }) => {
    return (
    <div className="flex flex-col items-center justify-center">
          <img src={Logo} alt="futaura" className="z-10 w-fit" />
          <h2 className="font-medium text-md">{title}</h2>
          <p className="font-regular text-sm">{description}</p>
    </div>
    )
}

export default LogoGray