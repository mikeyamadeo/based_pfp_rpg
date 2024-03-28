import slack from '../slack'
const formCallbackId = 'AR_REPORT'
const ids = {
  customerName: 'CUSTOMER_NAME',
  subCount: 'SUB_COUNT',
  feedbackOptions: 'FEEDBACK_OPTIONS',
  lengthAsCustomer: 'LENGTH_AS_CUSTOMER',
  healthStatus: 'HEALTH_STATUS',
  notes: 'NOTES'
}
const inputs = {
  customerName: {
    blockId: ids.customerName,
    actionId: ids.customerName,
    extract: (view) => {
      return view.state.values[ids.customerName][ids.customerName].value
    }
  },
  subCount: {
    blockId: ids.subCount,
    actionId: ids.subCount,
    extract: (view) => {
      return view.state.values[ids.subCount][ids.subCount].value
    }
  },
  feedbackOptions: {
    blockId: ids.feedbackOptions,
    actionId: ids.feedbackOptions,
    extract: (view) => {
      return view.state.values[ids.feedbackOptions][ids.feedbackOptions].selected_options.map(option => option.value)
    }
  },
  healthStatus: {
    blockId: ids.healthStatus,
    actionId: ids.healthStatus,
    extract: (view) => {
      return view.state.values[ids.healthStatus][ids.healthStatus].selected_option.value
    }
  },
  lengthAsCustomer: {
    blockId: ids.lengthAsCustomer,
    actionId: ids.lengthAsCustomer,
    extract: (view) => {
      return view.state.values[ids.lengthAsCustomer][ids.lengthAsCustomer].selected_option.value
    }
  },
  notes: {
    blockId: ids.notes,
    actionId: ids.notes,
    extract: (view) => {
      return view.state.values[ids.notes][ids.notes].value
    }
  }
}

const formModal = {
  type: 'modal',
  callback_id: formCallbackId,
  title: {
    type: 'plain_text',
    text: 'AR WAGMI Report',
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
      block_id: inputs.customerName.blockId,
      element: {
        type: 'plain_text_input',
        action_id: inputs.customerName.actionId
      },
      label: {
        type: 'plain_text',
        text: 'Customer Name',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.subCount.blockId,
      element: {
        type: 'number_input',
        is_decimal_allowed: false,
        action_id: inputs.subCount.actionId
      },
      label: {
        type: 'plain_text',
        text: 'How many subs do they have?',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.lengthAsCustomer.blockId,
      element: {
        type: 'static_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select an item',
          emoji: true
        },
        action_id: inputs.lengthAsCustomer.actionId,
        options: [
          {
            text: {
              type: 'plain_text',
              text: '< 6 Months',
              emoji: true
            },
            value: 'LESS_THAN_SIX'
          },
          {
            text: {
              type: 'plain_text',
              text: '6-12 Months',
              emoji: true
            },
            value: 'SIX_TO_TWELVE'
          },
          {
            text: {
              type: 'plain_text',
              text: '1-2 Years',
              emoji: true
            },
            value: 'ONE_TO_TWO'
          },
          {
            text: {
              type: 'plain_text',
              text: '> 2 Years',
              emoji: true
            },
            value: 'TWO_PLUS'
          }
        ]
      },
      label: {
        type: 'plain_text',
        text: 'How long have they been a customer?',
        emoji: true
      }
    },
    {
      type: 'input',
      block_id: inputs.healthStatus.blockId,
      element: {
        type: 'static_select',
        placeholder: {
          type: 'plain_text',
          text: 'Select an item',
          emoji: true
        },
        action_id: inputs.healthStatus.actionId,
        options: [
          {
            text: {
              type: 'plain_text',
              text: 'Great',
              emoji: true
            },
            value: 'GREAT'
          },
          {
            text: {
              type: 'plain_text',
              text: 'Good',
              emoji: true
            },
            value: 'GOOD'
          },
          {
            text: {
              type: 'plain_text',
              text: 'Decent',
              emoji: true
            },
            value: 'DECENT'
          },
          {
            text: {
              type: 'plain_text',
              text: 'Bad',
              emoji: true
            },
            value: 'BAD'
          }
        ]
      },
      label: {
        type: 'plain_text',
        text: 'What is their CS Health Status?',
        emoji: true
      }
    },
    {
      type: 'section',
      block_id: inputs.feedbackOptions.blockId,
      text: {
        type: 'mrkdwn',
        text: 'How did it go?'
      },
      accessory: {
        type: 'checkboxes',
        action_id: inputs.feedbackOptions.actionId,
        options: [
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
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed to Premium Text*'
            },
            value: 'LEVER_ADDED'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed To Signage*'
            },
            value: 'SIGNAGE'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed to Contract*'
            },
            value: 'CONTRACT'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Agreed to 5 Star Review*'
            },
            value: 'FIVE_STAR_REVIEW'
          },
          {
            text: {
              type: 'mrkdwn',
              text: '*Scheduled Next AR*'
            },
            value: 'NEXT_AR'
          }
        ]
      }
    },
    {
      type: 'input',
      block_id: inputs.notes.blockId,
      element: {
        type: 'plain_text_input',
        multiline: true,
        action_id: inputs.notes.actionId
      },
      label: {
        type: 'plain_text',
        text: 'What else should the team know?',
        emoji: true
      }
    }
  ]
}
const payloadToReport = async ({ user, view }) => {
  // // Extract data specific to OB_WAGMI modal

  const author = await slack.getUserProfile(user.id)

  const customerName = inputs.customerName.extract(view)
  const subCount = inputs.subCount.extract(view)
  const feedbackOptions = inputs.feedbackOptions.extract(view)
  const healthStatus = inputs.healthStatus.extract(view)
  const lengthAsCustomer = inputs.lengthAsCustomer.extract(view)
  const additionalNotes = inputs.notes.extract(view)

  // payload.view.state.values.customer.CUSTOMER_NAME.value

  const report = generateReport({ author, customerName, subCount, lengthAsCustomer, feedbackOptions, additionalNotes, healthStatus, userId: user.id })
  console.log({ report })

  return report
}

function generateReport ({ author, customerName, subCount, lengthAsCustomer, feedbackOptions, additionalNotes, healthStatus, userId }) {
  const EMOTE = author.status_emoji
  const AUTHOR_IMAGE = author.image_original
  const AUTHOR_NAME = author.status_text || author.first_name

  // Define the possible options and their corresponding emojis
  const feedbackMapping = {
    FAST_FORWARD: 'Agreed to phone',
    WEBFORM: 'Agreed to webform',
    LEVER_ADDED: 'Agreed to a lever',
    CONTRACT: 'Agreed to contract',
    SIGNAGE: 'Agreed To Signage',
    FIVE_STAR_REVIEW: 'Agreed to leave 5 star review',
    NEXT_AR: 'Scheduled next AR'
  }

  // Generate the feedback lines
  const feedbackLines = Object.keys(feedbackMapping).map(key => {
    const emoji = feedbackOptions.includes(key) ? '✅' : '🔳'
    return `${emoji} ${feedbackMapping[key]}`
  }).join('\n')

  // Construct the final message
  const message = `
⛳️ AR WAGMI: ${customerName}⛳️

Health Status: ${healthStatus}
Length As Customer: ${lengthAsCustomer}
Sub Count: ${subCount}

${feedbackLines}

*Other Notes:*
${additionalNotes}
  `

  return {
    channel: slack.channels.bizfeed, // Channel ID
    // blocks: [
    //   {
    //     type: 'section',
    //     text: {
    //       type: 'plain_text',
    //       text: message,
    //       emoji: true
    //     }
    //   }
    // ],
    attachments: [
      {
        fallback: `⛳️ QBR WAGMI: ${customerName}⛳️`,
        color: '#00e771',
        author_name: EMOTE + ' ' + AUTHOR_NAME,
        text: message + `\n<@${userId}>`,
        footer: 'QBR by ' + AUTHOR_NAME,
        footer_icon: AUTHOR_IMAGE
      }
    ]
  }
}

export default {
  callbackId: 'QBR_REPORT',
  formCallbackId,
  payloadToReport,
  formModal
}
