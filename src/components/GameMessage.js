import { h } from 'vue'

const GameMessage = (props, context) => {
  return h(`div`, {
    class: 'playground-message',
    innerHTML: `<span>${props.message}</span>`
  }, context.slots)
}

GameMessage.props = ['message']

export default GameMessage
