export default function VoteNavigation({ list, state = 1 }){
  return (
    <div className="vote-navigation">
      <ul>
        {list.map((question) => {
          return (
            <li key={question.id}>
              <div className="question-info">
                <div className={`number ${question.id <= state ? ' active' : null}`}>{question.id}</div>{question.label}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
