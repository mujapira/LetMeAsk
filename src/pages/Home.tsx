import { useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImage from "../assets/images/google-icon.svg";
import { Button } from "../components/Button";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { ref, get } from "firebase/database";

export function Home() {
  let navigate = useNavigate();
  const { signInWithGoogle, user } = useAuth();
  const auth = getAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then((result) => {
      navigate("/rooms/new");
    });
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === "") {
      return;
    }

  
    const roomRef = await get(ref(database, `rooms/${roomCode}`))
    if (!roomRef.exists()) {
      alert("Room does not exist.")
      return
    }
    if(roomRef.val().endedAt){
      alert('Room already closed.')
      return;
    }
    navigate(`/rooms/${roomCode}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração que simboliza perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Logo do Let Me Ask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImage} alt="Logo do google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
