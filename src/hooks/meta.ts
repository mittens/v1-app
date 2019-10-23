import firestore from '@react-native-firebase/firestore'
import { useEffect, useRef, useState } from 'react'

import { Meta } from '../types'

export const useMeta = () => {
  const [loading, setLoading] = useState(false)

  const [issues, setIssues] = useState<string[]>([])
  const [tips, setTips] = useState<string[]>([])

  const unsubscribe = useRef<() => void>()

  useEffect(() => {
    setLoading(true)

    unsubscribe.current = firestore()
      .collection('meta')
      .onSnapshot(({ docs }) =>
        docs.map(doc => {
          const { issues, tips } = doc.data() as Meta

          setLoading(false)

          setIssues(issues)
          setTips(tips)
        })
      )

    return () => {
      if (unsubscribe.current) {
        unsubscribe.current()
      }
    }
  }, [])

  return {
    issues,
    loading,
    tips
  }
}
