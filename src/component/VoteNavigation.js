export default function VoteNavigation({ list, state = 1 }){
  return (
    <div className="vote-navigation">
      <div className="container">
        <ul>
          {list.map((question) => {
            return (
              <li key={question.id}>
                <div className="question-info">
                  <div className={`number ${question.id <= state ? ' active' : null}`}>{question.id}</div>{question.questionShort}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
