import { WebClient } from "@slack/web-api"
import config from "../../api/config"

const web = new WebClient(config.slack.token)

async function getUserProfile(userId) {
	try {
		const result = await web.users.profile.get({ user: userId })

		// The result is an object with the user's profile details
		const profile = result.profile

		return profile
	} catch (error) {
		console.error(`Error getting user profile: ${error}`)
	}
}

export default async function handler(req, res) {
	const userId = req.body.user_id || "U754XUETG"
	const accountName = req.body.text

	try {
		const profile = await getUserProfile(userId)

		await web.chat.postMessage(compost({ author: profile, accountName }))

		res.status(200).json({ text: "Message sent" })
	} catch (error) {
		console.error(error)

		res
			.status(500)
			.json({ error: "An error occurred while trying to send the message" })
	}
}
const channels = {
	team: "GAQJVUM41",
	bizfeed: "C05MBFTE92B",
	test: "C05JQGQR0V7",
}

// const bolden = str => '*' + str + '*'
const idsToTag = {
	benJones: "U04TWCN2P7G",
	evanCukuk: "U04PLEG03PV",
	scottMarchant: "U06GTLJ3C8P",
}

const compost = ({ author, accountName }) => {
	const AUTHOR_IMAGE = author.image_original
	const AUTHOR_NAME = author.first_name

	return {
		channel: channels.bizfeed, // Channel ID
		attachments: [
			{
				fallback: "👻 Ghost Alert 👻",
				color: "#FF0000",
				author_name: "👻 Ghost Alert 👻 ",
				text: `${accountName} ghosted onboarding\n${Object.values(idsToTag)
					.map((id) => `<@${id}>`)
					.join(" ")}`,
				footer: `report by ${AUTHOR_NAME}`,
				footer_icon: AUTHOR_IMAGE,
			},
		],
	}
}
