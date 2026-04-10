import { Suspense, useEffect, useRef, useState } from "react"

function SectionPlaceholder({ anchorId, className = "" }) {
  return <section id={anchorId} aria-hidden="true" className={className} />
}

export default function DeferredSection({
  anchorId,
  placeholderClassName,
  rootMargin = "700px 0px",
  children,
}) {
  const ref = useRef(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || shouldRender) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        setShouldRender(true)
        observer.disconnect()
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [rootMargin, shouldRender])

  return (
    <div
      ref={ref}
      style={
        shouldRender
          ? undefined
          : {
              contentVisibility: "auto",
              containIntrinsicSize: "1px 900px",
            }
      }
    >
      {shouldRender ? (
        <Suspense fallback={<SectionPlaceholder anchorId={anchorId} className={placeholderClassName} />}>
          {children}
        </Suspense>
      ) : (
        <SectionPlaceholder anchorId={anchorId} className={placeholderClassName} />
      )}
    </div>
  )
}
