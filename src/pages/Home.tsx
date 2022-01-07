
import { useNavigate} from "react-router-dom"

import "../styles/auth.scss"
import illustrationImg from "../assets/images/illustration.svg"
import logoImg from "../assets/images/logo.svg"
import googleIconImage from "../assets/images/google-icon.svg"
import { Button } from "../components/Button"

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext } from "react"
import { AuthContext } from "../App"


export function Home() {
    let navigate = useNavigate()
    const {signInWithGoogle, user} = useContext(AuthContext)
    
    async function handleCreateRoom(){
        if (!user) {
            await signInWithGoogle()
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        
        signInWithPopup(auth, provider)
        .then((result) => {

            navigate("/rooms/new");


            // This gives you a Google Access Token. You can use it to access the Google API.
            //const credential = GoogleAuthProvider.credentialFromResult(result);
            //const token = credential.accessToken;
            // The signed-in user info.
           // const user = result.user;
            // ...
        //  }).catch((error) => {
            // Handle Errors here.
       //    const errorCode = error.code;
       //    const errorMessage = error.message;
       //    // The email of the user's account used.
       //    const email = error.email;
       //    // The AuthCredential type that was used.
       //    const credential = GoogleAuthProvider.credentialFromError(error);
       //    // ...
          });



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
                    <button onClick={handleCreateRoom} className="create-room">
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