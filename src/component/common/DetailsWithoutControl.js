export default function DetailsWithoutControl({ id, summary, children, open, onClick, className = '' }) {
  return (
    <details className={className} {...(open ? { open: true } : {})}>
      <summary
        onClick={(e) => {
          e.preventDefault()

          if (typeof onClick === 'function') {
            onClick(id)
          }
        }}
      >
        {typeof summary === "function" ? summary(open) : summary}
      </summary>
      {open && children}
    </details>
  )
}
