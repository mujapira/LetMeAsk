import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImage from "../assets/images/google-icon.svg"
import "../styles/auth.scss"
import { Button } from "../components/Button"

export function NewRoom() {
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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input
                    type="text"
                    placeholder="Nome da sala"
                    />
                    <Button type="submit">
                        Criar sala 
                    </Button>
                    </form>
                    <p>
                        Gostaria de entrar em uma sala existente? <a href="a">clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}