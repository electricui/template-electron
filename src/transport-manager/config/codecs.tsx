import { Codec, Message, PushCallback } from '@electricui/core'
import { SmartBuffer } from 'smart-buffer'

export class RGBCodec extends Codec {
  messageID: string

  constructor(messageID: string) {
    super()
    this.messageID = messageID
  }

  filter(message: Message): boolean {
    return message.messageID === this.messageID
  }

  encode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      message.payload = Buffer.alloc(0)
      return push(message)
    }

    // SmartBuffers automatically keep track of read and write offsets / cursors.
    const packet = new SmartBuffer()
    packet.writeUInt16LE(message.payload.r)
    packet.writeUInt16LE(message.payload.g)
    packet.writeUInt16LE(message.payload.b)

    // Mutate the payload to instead be this binary buffer
    message.payload = packet.toBuffer()

    // Push it up the pipeline
    return push(message)
  }

  decode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      return push(message)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    // Read back our UInt16s into our {r, g, b} object
    const rgb = {
      r: reader.readUInt16LE(),
      g: reader.readUInt16LE(),
      b: reader.readUInt16LE(),
    }

    // Mutate the payload to instead be this object
    message.payload = rgb

    // Push it up the pipeline
    return push(message)
  }
}

export class ComplexStructCodec extends Codec {
  filter(message: Message): boolean {
    return message.messageID === 'complex'
  }

  encode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      message.payload = Buffer.alloc(0)
      return push(message)
    }

    // SmartBuffers automatically keep track of read and write offsets / cursors.
    const packet = new SmartBuffer()
    packet.writeUInt16LE(0xfe60)
    packet.writeStringNT(message.payload.testString1)
    packet.writeStringNT(message.payload.testString2)
    packet.writeUInt8(message.payload.testUInt)
    packet.writeStringNT(message.payload.testString3)
    packet.insertUInt16LE(packet.length - 2, 2)

    // Produces a payload of shape
    // [0xfe60][PacketLength:2][Data:XX]
    message.payload = packet.toBuffer()

    return push(message)
  }

  decode(message: Message, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      return push(message)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    message.payload = {
      magicNumber: reader.readUInt16LE(),
      internalPayloadLength: reader.readUInt16LE(), // read it out in order
      testString1: reader.readStringNT(),
      testString2: reader.readStringNT(),
      testUInt: reader.readUInt8(),
      testString3: reader.readStringNT(),
    }

    return push(message)
  }
}
