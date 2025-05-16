import Logo from "../assets/img/logoGray.png";

const LogoGray = ({ title, description }) => {
    return (
    <div className="flex flex-col gap-4 items-center justify-center w-80">
          <img src={Logo} alt="futaura" className="z-10 w-fit" />
          <h2 className="font-medium text-2xl">{title}</h2>
          <p className="font-regular text-md">{description}</p>
    </div>
    )
}

export default LogoGray