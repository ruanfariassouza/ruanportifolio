import { forwardRef } from 'react'

const SectionWrapper = forwardRef(function SectionWrapper({ as: Tag = 'section', className = '', children, ...props }, ref) {
  return <Tag ref={ref} className={`section ${className}`} {...props}>{children}</Tag>
})

export default SectionWrapper
