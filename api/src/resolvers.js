const channels = [
  {
    id: '1',
    name: 'soccer',
    messages: [
      {
        id: '1',
        text: 'soccer is football',
      },
      {
        id: '2',
        text: 'hello soccer world cup',
      },
    ],
  },
  {
    id: '2',
    name: 'baseball',
    messages: [
      {
        id: '3',
        text: 'baseball is life',
      },
      {
        id: '4',
        text: 'hello baseball world series',
      },
    ],
  },
]
let nextId = 3
let nextMessageId = 5

exports.resolvers = {
  Query: {
    channels: () => channels,
    channel: (root, { id }) => channels.find(channel => channel.id === id),
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: String(nextId++), messages: [], name: args.name }
      channels.push(newChannel)
      return newChannel
    },
    addMessage: (root, { message }) => {
      const channel = channels.find(({ id }) => id === message.channelId)
      if (!channel) throw new Error('Channel does not exist')

      const newMessage = { id: String(nextMessageId++), text: message.text }
      channel.messages.push(newMessage)

      return newMessage
    },
  },
}
