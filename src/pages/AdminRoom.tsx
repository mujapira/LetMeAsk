import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAnswer } from "../hooks/useAnswer";
import checkImg from "../assets/images/check.svg";

import { ref, remove, update, push, set } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/room.scss";
import "../styles/question.scss";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";
import deleteImg from "../assets/images/delete.svg";
import answerImg from "../assets/images/answer.svg";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { Question } from "../components/Question";
import { QuestionAnswer } from "../components/QuestionAnswer";
import { DefaultTheme, ThemeProvider } from "styled-components";
import Header from "../components/Header";
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import GlobalStyle from "../styles/global";
import usePersistedState from "../hooks/usePersistedState";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const navigate = useNavigate();
  const { title, questions } = useRoom(roomId!);
  const [newAnswer, setNewAnswer] = useState("");

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light);
  };

  async function handleEndRoom() {
    await update(ref(database, `rooms/${roomId}`), {
      endedAt: new Date(),
    });

    navigate("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await remove(ref(database, `rooms/${roomId}/questions/${questionId}`));
    }
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await remove(
        ref(database, `rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
      );
    } else {
      await push(
        ref(database, `rooms/${roomId}/questions/${questionId}/likes`),
        {
          authorId: user?.id,
        }
      );
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isHighlighted: true,
    });
  }

  async function handleAnswer(questionId: string, value: string) {
    await push(
      ref(database, `rooms/${roomId}/questions/${questionId}/answers`),
      {
        authorId: user?.id,
        content: newAnswer,
      }
    );
  }

  async function handleSendAnswer(event: FormEvent, questionId: string) {
    event.preventDefault();
    const answer = {
      content: newAnswer,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await push(
      ref(database, `rooms/${roomId}/questions/${questionId}/answers`),
      answer
    );
    await update(ref(database, `rooms/${roomId}/questions/${questionId}`), {
      isAnswered: true,
    });
    setNewAnswer("");
  }

  return (
    
    <div id="page-room">
      <ThemeProvider theme={theme}>
        <div className="App">
          <GlobalStyle />
          <Header toggleTheme={toggleTheme} />
        </div>
      </ThemeProvider>

      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            console.log(question.answers);
            return (
              <>
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  {!question.isAnswered && (
                    <>
                      <form
                        onSubmit={(event) =>
                          handleSendAnswer(event, question.id)
                        }
                      >
                        <textarea
                          placeholder="O que você quer responder?"
                          onChange={(event) => setNewAnswer(event.target.value)}
                          value={newAnswer}
                        />
                        <button type="submit">
                          <img src={answerImg} alt="Responder Pergunta" />
                        </button>
                      </form>
                    </>
                  )}

                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Remover pergunta" />
                  </button>
                </Question>
                <div className="teste">
                  {question.answers.map((answer) => {
                    return (
                      <>
                        <QuestionAnswer
                          key={answer.id}
                          content={answer.content}
                          author={answer.author}
                        ></QuestionAnswer>
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </main>
    </div>
  );
}
