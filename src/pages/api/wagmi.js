import slack from '../../api/slack'
import wagmi from '../../api/slack-reports/wagmi'
import sdrStandup from '../../api/slack-reports/sdr-standup'
import arReport from '../../api/slack-reports/ar-report'

export default async function handler (req, res) {
  const payload = JSON.parse(req.body.payload)

  console.log({ payload }, 'payload')
  try {
    if (payload.type === 'shortcut') {
      // trigger modal
      if (payload.callback_id === wagmi.callbackId) {
        // trigger modal for wagmi
        await slack.web.views.open({
          trigger_id: payload.trigger_id,
          view: wagmi.formModal
        })
      } else if (payload.callback_id === 'OB_WAGMI') {
        // trigger modal for OB_WAGMI
        await slack.web.views.open({
          trigger_id: payload.trigger_id,
          view: obWagmiModal
        })
      } else if (payload.callback_id === arReport.callbackId) {
        // trigger modal for QBR_REPORT
        await slack.web.views.open({
          trigger_id: payload.trigger_id,
          view: arReport.formModal
        })
      } else if (payload.callback_id === 'DEV_WAGMI') {
        // trigger modal for QBR_REPORT
        await slack.web.views.open({
          trigger_id: payload.trigger_id,
          view: devWagmiModal
        })
      } else if (payload.callback_id === sdrStandup.callbackId) {
        // trigger modal for QBR_REPORT
        await slack.web.views.open({
          trigger_id: payload.trigger_id,
          view: sdrStandup.formModal
        })
      }
    }

    if (payload.type === 'view_submission') {
      if (payload.view.callback_id === wagmi.formCallbackId) {
        const report = await wagmi.payloadToReport(payload)
        await slack.web.chat.postMessage(report)
      } else if (payload.view.callback_id === 'OB_WAGMI') {
        const userId = payload.user.id
        const author = await slack.getUserProfile(userId)
        // Extract data specific to OB_WAGMI modal
        const customerName = payload.view.state.values.customer.CUSTOMER_NAME.value
        const feedbackOptions = payload.view.state.values.options['checkboxes-action'].selected_options.map(option => option.value)
        const additionalNotes = payload.view.state.values.notes.NOTES.value
        const report = generateObWagmiReport(author, customerName, feedbackOptions, additionalNotes, userId)
        console.log({ report })
        await slack.web.chat.postMessage(report)
      } else if (payload.view.callback_id === arReport.formCallbackId) {
        const report = await arReport.payloadToReport(payload)
        await slack.web.chat.postMessage(report)
      } else if (payload.view.callback_id === 'DEV_WAGMI') {
        console.log({ payload }, payload.view.state.values)
        // // Extract data specific to OB_WAGMI modal
        const userId = payload.user.id

        const author = await slack.getUserProfile(userId)

        const what = payload.view.state.values.WHAT_SHIPPED.NOTES.value
        const why = payload.view.state.values.WHY_IT_MATTERS.NOTES.value
        const bang = payload.view.state.values.BANG.estimate.value
        const buck = payload.view.state.values.BUCK.estimate.value
        const report = generateDevWagmiReport(author, what, why, bang, buck)
        console.log({ report })
        await slack.web.chat.postMessage(report)
      } else if (payload.view.callback_id === sdrStandup.formCallbackId) {
        const report = await sdrStandup.payloadToReport(payload)
        await slack.web.chat.postMessage(report)
      }
    }

    res.status(200).json({ response_action: 'clear' })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error: 'An error occurred while trying to send the message' })
  }
}

function generateObWagmiReport (author, customerName, feedbackOptions, additionalNotes, userId) {
  const EMOTE = author.status_emoji
  const AUTHOR_IMAGE = author.image_original
  const AUTHOR_NAME = author.status_text || author.first_name

  // Define the possible options and their corresponding emojis
  const feedbackMapping = {
    POS: 'Got POS Numbers',
    ROTATION_PERMISSIONS: 'Agreed To Rotations',
    TXT_COUNT: 'Texting >= 4 times',
    BILLING_DETAILS: 'Got Billing Details',
    MMS_LAUNCH: 'Agreed to MMS Launch',
    PROPOSED_SIGNAGE: 'Proposed Signage',
    HOLIDAY_PERMISSIONS: 'Gave Ongoing Holiday Permissions',
    WEBFORM: 'Agreed to webform',
    FAST_FORWARD: 'Agreed to phone'
  }

  // Generate the feedback lines
  const feedbackLines = Object.keys(feedbackMapping).map(key => {
    const emoji = feedbackOptions.includes(key) ? '✅' : '❌'
    return `${emoji} ${feedbackMapping[key]}`
  }).join('\n')

  // Construct the final message
  const message = `
🏴‍☠️ OB WAGMI: ${customerName}🏴‍☠️

${feedbackLines}

*Other Notes:*
${additionalNotes}
  `

  return {
    channel: slack.channels.bizfeed, // Channel ID

    attachments: [
      {
        fallback: `🏴‍☠️ OB WAGMI: ${customerName}🏴‍☠️`,
        color: '#00e771',
        author_name: EMOTE + ' ' + AUTHOR_NAME,
        text: message + `\n<@${userId}>`,
        footer: 'QBR by ' + AUTHOR_NAME,
        footer_icon: AUTHOR_IMAGE
      }
    ]
  }
}

const obWagmiModal = {
  title: {
    type: 'plain_text',
    text: 'OB WAGMI Report',
    emoji: true
  },
  submit: {
    type: 'plain_text',
    text: 'Submit',
    emoji: true
  },
  type: 'modal',
  callback_id: 'OB_WAGMI',
  close: {
    type: 'plain_text',
    text: 'Cancel',
    emoji: true
  },
  blocks: [
    {
      type: 'input',
      block_id: 'customer',
      element: {
        type: 'plain_text_input',
        action_id: 'CUSTOMER_NAME'
      },
      label: {
        type: 'plain_text',
        text: 'Customer Name',
        emoji: true
      }
    },
    {
      type: 'section',
      block_id: 'options',
      text: {
        type: 'mrkdwn',
        text: 'How did it go?'
      },
      accessory: {
        type: 'checkboxes',
        options: [
          {
            text: {
              type: 'mrkdwn',
              text: '*Got POS Numbers*'
            },
            value: 'POS'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Gave Rotation Permissions*'
            },
            value: 'ROTATION_PERMISSIONS'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Is Texting 4x / Month*'
            },
            value: 'TXT_COUNT'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Got Billing Details*'
            },
            value: 'BILLING_DETAILS'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed to MMS Launch*'
            },
            value: 'MMS_LAUNCH'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Gave Ongoing Holiday Permissions*'
            },
            value: 'HOLIDAY_PERMISSIONS'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Proposed Signage*'
            },
            value: 'PROPOSED_SIGNAGE'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed To Phone Integration*'
            },
            value: 'FAST_FORWARD'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed to Webform*'
            },
            value: 'WEBFORM'
          }
        ],
        action_id: 'checkboxes-action'
      }
    },
    {
      type: 'input',
      block_id: 'notes',
      element: {
        type: 'plain_text_input',
        multiline: true,
        action_id: 'NOTES'
      },
      label: {
        type: 'plain_text',
        text: 'What else should the team know?',
        emoji: true
      }
    }
  ]
}

const devWagmiModal = {
  type: 'modal',
  callback_id: 'DEV_WAGMI',
  title: {
    type: 'plain_text',
    text: 'Dev WAGMI Report',
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
      block_id: 'WHAT_SHIPPED',
      element: {
        type: 'plain_text_input',
        multiline: true,
        action_id: 'NOTES'
      },
      label: {
        type: 'plain_text',
        text: 'What did you ship?',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: 'WHY_IT_MATTERS',
      element: {
        type: 'plain_text_input',
        multiline: true,
        action_id: 'NOTES'
      },
      label: {
        type: 'plain_text',
        text: 'Why does it matter?',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: 'BANG',
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: 'estimate'
      },
      label: {
        type: 'plain_text',
        text: 'Estimated Bang',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: 'BUCK',
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: 'estimate'
      },
      label: {
        type: 'plain_text',
        text: 'Estimated Buck',
        emoji: true
      }
    }

  ]
}

function generateDevWagmiReport (author, what, why, bang, buck) {
  const EMOTE = author.status_emoji
  const AUTHOR_IMAGE = author.image_original
  const AUTHOR_NAME = author.status_text || author.first_name

  const message = `
🚢 DEV WAGMI ⛵️
💥${bang}, 💰${buck}

*What got shipped*:
${what}

*Why it matters:*
${why}
  `

  return {
    channel: slack.channels.bizfeed, // Channel ID

    attachments: [
      {
        fallback: '🚢 DEV WAGMI ⛵️',
        color: '#00e771',
        author_name: EMOTE + ' ' + AUTHOR_NAME,
        text: message,
        footer: 'QBR by ' + AUTHOR_NAME,
        footer_icon: AUTHOR_IMAGE
      }
    ]
  }
}
