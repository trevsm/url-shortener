import { useEffect, useRef } from "react"

/**
 * @param callback
 * @description
 * This hook is used to run a callback only once, when the component is mounted.
 */
export function useSetupEffect(callback: () => void) {
  const hasRun = useRef(false)
  useEffect(() => {
    if (hasRun.current) {
      return
    }
    hasRun.current = true
    callback()
  }, [callback])
}
