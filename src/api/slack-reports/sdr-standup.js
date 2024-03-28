import slack from '../slack'
const formCallbackId = 'SDR_STANDUP'
const ids = {
  callCount: 'CALL_COUNT',
  talkTime: 'TALK_TIME',
  setCount: 'SET_COUNT',
  holdCount: 'HOLD_COUNT'
}
const inputs = {
  callCount: {
    blockId: ids.callCount,
    actionId: ids.callCount,
    extract: (view) => {
      return view.state.values[ids.callCount][ids.callCount].value
    }
  },
  talkTime: {
    blockId: ids.talkTime,
    actionId: ids.talkTime,
    extract: (view) => {
      return view.state.values[ids.talkTime][ids.talkTime].value
    }
  },
  setCount: {
    blockId: ids.setCount,
    actionId: ids.setCount,
    extract: (view) => {
      return view.state.values[ids.setCount][ids.setCount].value
    }
  },
  holdCount: {
    blockId: ids.holdCount,
    actionId: ids.holdCount,
    extract: (view) => {
      return view.state.values[ids.holdCount][ids.holdCount].value
    }
  }
}

const formModal = {
  type: 'modal',
  callback_id: formCallbackId,
  title: {
    type: 'plain_text',
    text: 'SDR Standup Report',
    emoji: true
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true
  },
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true
  },
  blocks: [
    {
      type: 'input',
      block_id: inputs.callCount.blockId,
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: inputs.callCount.actionId
      },
      label: {
        type: 'plain_text',
        text: 'How many calls we at? (aim: 80+ daily)',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.talkTime.blockId,
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: inputs.talkTime.actionId
      },
      label: {
        type: 'plain_text',
        text: 'What is current talk time at? (minutes)',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.setCount.blockId,
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: inputs.setCount.actionId
      },
      label: {
        type: 'plain_text',
        text: 'How many sets so far?',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.holdCount.blockId,
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: inputs.holdCount.actionId
      },
      label: {
        type: 'plain_text',
        text: 'How many holds so far?',
        emoji: true
      }
    }

  ]
}
const payloadToReport = async ({ user, view }) => {
  const author = await slack.getUserProfile(user.id)
  const callCount = inputs.callCount.extract(view)
  const talkTime = inputs.talkTime.extract(view)
  const setCount = inputs.setCount.extract(view)
  const holdCount = inputs.holdCount.extract(view)

  const report = generateReport({
    author,
    userId: user.id,
    stats: {
      callCount,
      talkTime,
      setCount,
      holdCount
    }
  })

  return report
}

const emojify = (emoji, count) => Array(count).fill().map((_) => emoji).join('')
const generateReport = ({ author, userId, stats }) => {
  const EMOTE = author.status_emoji
  const AUTHOR_IMAGE = author.image_original
  const AUTHOR_NAME = author.status_text || author.first_name

  const message = `
Calls: ${stats.callCount} ${stats.callCount >= 69 ? '💪' : ''}
Talk Time: ${stats.talkTime} ${stats.talkTime >= 59 ? '💪' : ''}
Sets: ${stats.setCount} ${emojify('🎉', Number(stats.setCount))}
Holds: ${stats.holdCount} ${emojify('🎉', Number(stats.holdCount))}
    `

  return {
    channel: slack.channels.standup, // Channel ID
    // icon_url: 'https://i.seadn.io/gcs/files/47134b92954be35aecc96ba63e07c0ce.png?auto=format&dpr=1&w=1000',
    attachments: [
      {
        fallback: AUTHOR_NAME + ' Standup',
        color: '#1e006d',
        author_name: AUTHOR_NAME + ' Standup',
        author_icon: AUTHOR_IMAGE,
        text: message + `\n${EMOTE} <@${userId}> ${EMOTE}`,
        thumb_url: AUTHOR_IMAGE,
        footer: 'report by ' + AUTHOR_NAME,
        footer_icon: AUTHOR_IMAGE
      }
    ]
  }
}

export default {
  callbackId: 'SDR_STANDUP',
  formCallbackId,
  payloadToReport,
  formModal
}
