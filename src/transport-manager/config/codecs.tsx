import { Codec, Message, PushCallback } from '@electricui/core'
import { SmartBuffer } from 'smart-buffer'

export type RGBPayload = {
  r: number
  g: number
  b: number
}

/**
 * If you are following the led-blink example, there won't actually be a message with this message ID.
 */
export class RGBCodec extends Codec {
  filter(message: Message): boolean {
    return message.messageID === 'led'
  }

  encode(message: Message<RGBPayload>, push: PushCallback<Message<Buffer>>) {
    // The null case
    if (message.payload === null) {
      return push(message.setPayload(Buffer.alloc(0)))
    }

    // SmartBuffers automatically keep track of read and write offsets / cursors.
    const packet = new SmartBuffer()
    packet.writeUInt8(message.payload.b)
    packet.writeUInt8(message.payload.r)
    packet.writeUInt8(message.payload.g)
    packet.writeUInt8(0x00)

    // Mutate the payload to instead be this binary buffer
    // Push it up the pipeline
    return push(message.setPayload(packet.toBuffer()))
  }

  decode(
    message: Message<Buffer>,
    push: PushCallback<Message<RGBPayload | null>>,
  ) {
    // The null case
    if (message.payload === null) {
      console.log('payload was null wat')
      return push((message as unknown) as Message<null>)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    // Read back our UInt16s into our {r, g, b} object
    const rgb: RGBPayload = {
      b: reader.readUInt8(),
      r: reader.readUInt8(),
      g: reader.readUInt8(),
    }

    // read the first useless out
    reader.readUInt8()

    // Mutate the payload to instead be this object

    // Push it up the pipeline
    return push(message.setPayload(rgb))
  }
}

/**
 * The led_blink message contains a uint8 that corresponds to a boolean value.
 * This codec turns it into a real boolean primative
 */
export class LedBlinkCodec extends Codec {
  filter(message: Message): boolean {
    return message.messageID === 'led_blink'
  }

  encode(message: Message<boolean>, push: PushCallback<Message<Buffer>>) {
    // The null case
    if (message.payload === null) {
      return push(message.setPayload(Buffer.alloc(0)))
    }

    // Write a single uint8 depending on the payload
    const packet = new SmartBuffer()
    packet.writeUInt8(message.payload ? 0x01 : 0x00)

    // Mutate the payload to instead be this binary buffer
    // Push it up the pipeline
    return push(message.setPayload(packet.toBuffer()))
  }

  decode(
    message: Message<Buffer>,
    push: PushCallback<Message<boolean | null>>,
  ) {
    // The null case
    if (message.payload === null) {
      console.log('payload was null wat')
      return push((message as unknown) as Message<null>)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    const value = reader.readUInt8()

    const bool = value === 1 ? true : false

    // Mutate the payload to instead be this object

    // Push it up the pipeline
    return push(message.setPayload(bool))
  }
}

// Create the instances of the codecs
const customCodecs = [
  new RGBCodec(), // An instance of the RGB Codec
  new LedBlinkCodec(),
]

// Export them for use in each of the transports
export default customCodecs
