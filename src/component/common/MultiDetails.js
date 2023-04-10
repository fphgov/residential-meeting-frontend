import { useState } from "react"
import DetailsWithoutControl from "./DetailsWithoutControl"

export default function MultiDetails({ details, className = '' }) {
  const [openId, setOpenId] = useState('1-detail-yes')

  const changeDetails = (id) => {
    setOpenId(id)
  }

  return (
    <>
      {details?.map((detail) => {
        return (
          <DetailsWithoutControl key={detail.id} id={detail.id} summary={detail.summary} open={detail.id === openId} onClick={changeDetails} className={detail?.className ? detail?.className : className}>
            <div className="detail" dangerouslySetInnerHTML={{ __html: detail.description }} />
          </DetailsWithoutControl>
        )
      })}
    </>
  )
}
