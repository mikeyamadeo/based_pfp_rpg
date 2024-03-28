import slack from '../slack'
const formCallbackId = 'wagmi_report'
const formModal = {
  type: 'modal',
  callback_id: formCallbackId,
  title: {
    type: 'plain_text',
    text: 'WAGMI Report'
  },
  blocks: [
    {
      type: 'section',
      block_id: 'user',
      text: {
        type: 'mrkdwn',
        text: 'Who had a win?'
      },
      accessory: {
        type: 'users_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select a user',
          emoji: true
        },
        action_id: 'wagmi_user'
      }
    },
    {
      type: 'input',
      block_id: 'script',
      element: {
        type: 'plain_text_input',
        multiline: true,
        action_id: 'wagmi_input'
      },
      label: {
        type: 'plain_text',
        text: 'Describe the win for the team',
        emoji: true
      }
    }
  ],
  submit: {
    type: 'plain_text',
    text: 'Submit'
  }
}

const payloadToReport = async ({ user, view }) => {
  const userId = view.state.values.user.wagmi_user.selected_user
  const message = view.state.values.script.wagmi_input.value
  const subjectProfile = await slack.getUserProfile(userId)
  const authorProfile = await slack.getUserProfile(user.id)
  const report = generateReport({
    author: authorProfile,
    subject: {
      ...subjectProfile,
      userId
    },
    reportTxt: message
  })

  return report
}

const generateReport = ({ author, subject, reportTxt }) => {
  const EMOTE = subject.status_emoji
  const AUTHOR_IMAGE = author.image_original
  const AUTHOR_NAME = author.status_text || author.first_name

  const SUBJECT_IMAGE = subject.image_original
  const SUBJECT_NAME = subject.first_name || subject.status_text
  const SUBJECT_ID = subject.userId

  return {
    channel: slack.channels.bizfeed, // Channel ID
    // icon_url: 'https://i.seadn.io/gcs/files/47134b92954be35aecc96ba63e07c0ce.png?auto=format&dpr=1&w=1000',
    attachments: [
      {
        fallback: 'wagmi report',
        color: '#1e006d',
        author_name: SUBJECT_NAME + ' had a wagmi',
        author_icon: SUBJECT_IMAGE,
        text: EMOTE + ' ' + reportTxt + `\n<@${SUBJECT_ID}>`,
        thumb_url: SUBJECT_IMAGE,
        footer: 'report by ' + AUTHOR_NAME,
        footer_icon: AUTHOR_IMAGE
      }
    ]
  }
}

export default {
  callbackId: 'wagmi',
  formCallbackId,
  payloadToReport,
  formModal
}
