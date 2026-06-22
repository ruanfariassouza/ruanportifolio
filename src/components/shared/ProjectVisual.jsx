import useLanguage from '../../hooks/useLanguage'

export default function ProjectVisual({ project, compact = false }) {
  const cells = Array.from({ length: 14 }, (_, index) => index)
  const { copy } = useLanguage()

  return (
    <div className={`project-visual project-visual--${project.visual} ${compact ? 'project-visual--compact' : ''}`} role="img" aria-label={`${copy.case.visualAlt} ${project.name}`}>
      <div className="project-visual__top"><span>{project.num}</span><span>{project.type}</span></div>

      {project.visual === 'portfolio' && (
        <div className="visual-portfolio"><span>{copy.visual.idea}</span><strong>→</strong><span>{copy.visual.presence}</span></div>
      )}
      {project.visual === 'mapping' && (
        <div className="visual-map">
          <svg viewBox="0 0 600 360" aria-hidden="true">
            <path d="M25 260C135 160 180 238 266 137S430 38 575 115" />
            <path d="M40 75c120 70 168-28 270 92s168 108 255 84" />
            {[['78','233'],['188','183'],['294','126'],['421','82'],['515','220']].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="9" />)}
          </svg>
          <strong>GLÓRIA</strong><span>VILA VELHA / ES</span>
        </div>
      )}
      {project.visual === 'calendar' && (
        <div className="visual-calendar">
          <div><strong>30</strong><span>{copy.visual.days}</span></div>
          <div className="visual-calendar__grid">{cells.map((cell) => <i key={cell} className={cell < 9 ? 'is-filled' : ''} />)}</div>
        </div>
      )}
      {project.visual === 'fashion' && (
        <div className="visual-fashion"><span>{copy.visual.fitting}</span><strong>{copy.visual.look}<br />{copy.visual.real}</strong><i /></div>
      )}
      {project.visual === 'beauty' && (
        <div className="visual-beauty"><div>{[0,1,2,3].map((item) => <i key={item} />)}</div><strong>{copy.visual.beauty.map((item) => <span key={item}>{item}<br /></span>)}</strong></div>
      )}
      {project.visual === 'iflow' && (
        <div className="visual-iflow"><span>{copy.visual.diagnosis}</span><div><i /><i /><i /></div><strong>REPAIR<br />WITHOUT<br />NOISE.</strong></div>
      )}
      {project.visual === 'home' && (
        <div className="visual-home"><span>{copy.visual.home}</span><div><i>{copy.visual.dishes}</i><i>Pet</i><i>{copy.visual.market}</i></div><strong>+12 pts</strong></div>
      )}

      <div className="project-visual__bottom"><span>{project.name}</span><span>{project.year}</span></div>
    </div>
  )
}
