import { ref, push, remove, update } from "firebase/database";
import { FormEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
//import { useAuth } from "../hooks/useAuth";
import "../styles/room.scss";
import "../styles/question.scss";
import { useRoom } from "../hooks/useRoom";
import deleteImg from "../assets/images/delete.svg";
import { database } from "../services/firebase";
type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [newQuestion, setNewQuestion] = useState("");
  //  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId!);
  const navigate = useNavigate()

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date(),
    });

    navigate('/')
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let me ask logo" />
          <div>
            <RoomCode code={roomId!} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        <div className="question-list"></div>
        {questions.map((question) => {
          return (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          );
        })}
      </main>
    </div>
  );
}
