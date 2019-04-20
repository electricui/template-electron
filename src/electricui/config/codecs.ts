import { Codec, Message, PushCallback } from '@electricui/core'

export class LoadCodec extends Codec {
  filter(message: Message): boolean {
    return message.messageID === 'load_adj'
  }

  encode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      message.payload = Buffer.alloc(0)
      return push(message)
    }

    const buf = Buffer.allocUnsafe(2)
    buf.writeUInt16BE(message.payload, 0)

    message.payload = buf

    return push(message)
  }

  decode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      return push(message)
    }

    message.payload = message.payload.readUInt16BE(0)
    return push(message)
  }
}
