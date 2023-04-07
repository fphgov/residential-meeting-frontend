import React from "react"
import VoteHeader from "./VoteHeader"
import Page from "./Page"

export default function VoteLayout({ children }) {
  return (
    <>
      <VoteHeader />

      <Page>
        {children}
      </Page>
    </>
  )
}
