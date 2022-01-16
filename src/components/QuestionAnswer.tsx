import { ReactNode } from "react";
import cx from "classnames";


type AnswerProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

export function QuestionAnswer({
  content,
  author,
  children,
}: AnswerProps) {
  return (
    <div
      className={cx(
        "question-answer",
      )}
    >
      <p> {content} </p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}
