import { DynamicValue } from 'react-native-dark-mode'
import { human } from 'react-native-typography'

export const colors = {
  accent: '#5dc3c4',
  background: new DynamicValue('#fff', '#000'),
  backgroundDark: new DynamicValue('#f6f7f8', '#151515'),
  foreground: new DynamicValue('#111', '#fff'),
  foregroundLight: '#999',
  primary: '#ff5058'
}

export const fonts = {
  regular: {
    ...human.bodyObject
  },
  small: {
    ...human.footnoteObject
  },
  subtitle: {
    ...human.title2Object
  },
  title: {
    ...human.title1Object
  }
}

export const layout = {
  avatar: {
    height: 40,
    width: 40
  },
  border: {
    radius: 5,
    width: 1
  },
  button: {
    height: 50
  },
  icon: {
    height: 20,
    width: 20
  },
  margin: 20,
  mittens: {
    height: 170 / 2,
    width: 200 / 2
  },
  padding: 10
}
