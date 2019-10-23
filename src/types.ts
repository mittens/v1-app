export interface Meta {
  issues: string[]
  tips: string[]
}

export interface GitHubNotification {
  id: string
  repository: {
    name: string
    owner: {
      avatar_url: string
    }
  }
  subject: {
    title: string
    url: string
  }
  unread: boolean
  updated_at: string
}

export interface GitHubUser {
  login: string
}
