import { WebClient } from '@slack/web-api'
import config from '../config'

const web = new WebClient(config.slack.token)
const channels = {
  team: 'GAQJVUM41',
  bizfeed: 'C05MBFTE92B',
  standup: 'CEXP46NTT'
}

async function getUserProfile (userId) {
  try {
    const result = await web.users.profile.get({ user: userId })

    const profile = result.profile

    return profile
  } catch (error) {
    console.error(`Error getting user profile: ${error}`)
  }
}

export default {
  web,
  channels,
  getUserProfile
}
