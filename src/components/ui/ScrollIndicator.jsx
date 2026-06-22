import useLanguage from '../../hooks/useLanguage'

export default function ScrollIndicator() {
  const { copy } = useLanguage()
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span>{copy.scroll}</span>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <path d="M12 4v15m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
