// pages/api/getdata.js
// pages/api/postmessage.js
import { WebClient } from '@slack/web-api'
import config from '../../api/config'

const web = new WebClient(config.slack.token)

async function getUserProfile (userId) {
  try {
    const result = await web.users.profile.get({ user: userId })

    // The result is an object with the user's profile details
    const profile = result.profile

    return profile
  } catch (error) {
    console.error(`Error getting user profile: ${error}`)
  }
}

export default async function handler (req, res) {
  const userId = req.body.user_id || 'U754XUETG'
  const commandText = req.body.text

  try {
    const profile = await getUserProfile(userId)

    await web.chat.postMessage(compost({ profile, winName: commandText, userId }))

    res.status(200).json({ text: 'Message sent' })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'An error occurred while trying to send the message' })
  }
}
const channels = {
  team: 'GAQJVUM41',
  bizfeed: 'C05MBFTE92B',
  test: 'C05JQGQR0V7'
}

// const bolden = str => '*' + str + '*'
const compost = ({ profile, winName = 'set', userId }) => {
  const emote = profile.status_emoji
  const name = profile.status_text || profile.display_name

  const MSG_PREVIEW = name + ' scored a ' + winName + ' !!!'
  return {
    channel: channels.bizfeed, // Channel ID
    text: MSG_PREVIEW,
    blocks: [
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `${emote}\n${emote}    *${name}* with a ${winName} 🎉!\n${emote}\n<@${userId}>`
        },
        accessory: {
          type: 'image',
          image_url: profile.image_original,
          alt_text: 'calendar thumbnail'
        }
      }
    ]

  }
}
