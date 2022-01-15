import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseAnswers = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    answers: Record<string, {
        authorId: string;
    }>
}>

type AnswerType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    answerId: string | undefined;
}


export function useAnswer(questionId: string, roomId: string) {
    const { user } = useAuth();
    const [answers, setAnswers] = useState<AnswerType[]>([]);



    useEffect(() => {
        const answerRef = ref(database, `rooms/${roomId}/questions/${questionId}/answer`);
        onValue(
            answerRef,
            (answer) => {
                const databaseAnswer = answer.val();
                const firebaseAnswers: FirebaseAnswers =
                    databaseAnswer.answers ?? {};

                const parsedAnswers = Object.entries(firebaseAnswers).map(
                    ([key, value]) => {
                        return {
                            id: key,
                            content: value.content,
                            author: value.author,
                            isHighlighted: value.isHighlighted,
                            isAnswered: value.isAnswered,
                            answerId: Object.entries(value.answers ?? {}).find(([key, answer]) => answer.authorId === user?.id)?.[0],
                        }
                    })

                setAnswers(parsedAnswers);
            },
            { onlyOnce: false }
        )

        return () => {
            off(answerRef)
        }
    }, [questionId, user?.id]);
    return { answers }
}