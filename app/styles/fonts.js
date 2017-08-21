import { Platform } from 'react-native'

const ios = Platform.OS === 'ios'

const size = {
  heading: 24,
  subheading: 18
}

const fonts = {
  size,

  input: 14,

  navBar: {
    fontSize: 16,
    fontWeight: ios ? '600' : 'normal'
  },
  heading: {
    fontSize: size.heading,
    fontWeight: ios ? '500' : 'normal'
  },
  subheading: {
    fontSize: size.subheading,
    fontWeight: ios ? '500' : 'normal'
  }
}

export default fonts
