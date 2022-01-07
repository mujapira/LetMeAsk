
import { useNavigate} from "react-router-dom"
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImage from "../assets/images/google-icon.svg"
import "../styles/auth.scss"
import { Button } from "../components/Button"

export function Home() {
    
    let navigate = useNavigate()
    
    function navigateToNewRoom(){
        navigate("/rooms/new");
    }
    
    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração que simboliza perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas de sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Logo do Let Me Ask"/>
                    <button onClick={navigateToNewRoom} className="create-room">
                    <img src={googleIconImage} alt="Logo do google"/>  
                        Crie sua sala com o Google
                    </button>
                    <div className="separator"> 
                    ou entre em uma sala
                    </div> 
                    <form>
                        <input
                    type="text"
                    placeholder="Digite o código da sala"
                    />
                    <Button type="submit">
                        Entrar na sala 
                    </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}