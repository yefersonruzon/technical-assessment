import WizyBotLogo from '../../assets/WizyBotLogo.png'
import WizyBotLogoMobile from '../../assets/Wizybot.png'

export default function Nav() {
    return (
        <nav className='nav'>
            <div>
                <picture>
                    <source media="(max-width: 1024px)" srcSet={WizyBotLogoMobile} />
                    <source media="(min-width: 1025px)" srcSet={WizyBotLogo} />
                    <img src={WizyBotLogo} alt="WizyBot Logo" />
                </picture>
                <div>
                    <i className="ri-menu-5-line"></i>
                </div>
            </div>
            <ul>
                <li className='active'>Home</li>
                <li>ChatBot</li>
                <li>About us</li>
                <li>Our Products</li>
            </ul>
            <div>
                <button>Install now</button>
                <button>Get a demo <i className="ri-arrow-right-up-line"></i></button>
            </div>
        </nav>
    )
}