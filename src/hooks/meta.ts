import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { Meta } from '../types'

export const useMeta = () => {
  const [loading, setLoading] = useState(false)

  const [issues, setIssues] = useState<string[]>([])
  const [tips, setTips] = useState<string[]>([])

  let unsubscribe: () => void

  useEffect(() => {
    setLoading(true)

    unsubscribe = firestore()
      .collection('meta')
      .onSnapshot(({ docs }) =>
        docs.map(doc => {
          const { issues, tips } = doc.data() as Meta

          setIssues(issues)
          setTips(tips)

          setLoading(false)
        })
      )

    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  return {
    issues,
    loading,
    tips
  }
}
