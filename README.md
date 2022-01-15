todo:
create room when already logged error - done
no questions yet img - 

    <div className="answer-list">
        {answers.map((answer) => {
            return (
              <QuestionAnswer
              key={answer.id}
              content={answer.content}
              author={answer.author}
              ></QuestionAnswer>
              )}
            </div>

             <div className="teste">
                        {answers.map((answer) => {
                          return (
                            <>
                              <QuestionAnswer
                                key={answer.id}
                                content={answer.content}
                                author={answer.author}
                              >
                                 <Button type="submit" disabled={!user}>
                                    Enviar pergunta
                                <form
                                  onSubmit={(event) =>
                                    handleSendAnswer(event, question.id)
                                  }
                                  >
                                 
                                  <textarea
                                    placeholder="O que você quer responder?"
                                    onChange={(event) =>
                                      setNewAnswer(event.target.value)
                                    }
                                    value={newAnswer}
                                    />
                                </form>
                                    </Button>
                              </QuestionAnswer>
                            </>
                          );
                        })}
                      </div>