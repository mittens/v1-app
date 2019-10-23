import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from 'react'

import { Meta } from '../types'

export const useMeta = () => {
  const [issues, setIssues] = useState<string[]>([])
  const [tips, setTips] = useState<string[]>([])

  useEffect(() => {
    firestore()
      .collection('meta')
      .onSnapshot(({ docs }) =>
        docs.map(doc => {
          const { issues, tips } = doc.data() as Meta

          setIssues(issues)
          setTips(tips)
        })
      )
  }, [])

  return {
    issues,
    tips
  }
}
