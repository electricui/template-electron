import { Codec, Message, PushCallback } from '@electricui/core'
import { SmartBuffer } from 'smart-buffer'
import { Quantity } from '@electricui/core-quantities'

export enum TemperatureError {
  NONE = 1,
  NOT_CONNECTED,
  LOW,
  HIGH,
  GENERIC,
}

interface Temperature {
  degrees: Quantity
  error: TemperatureError
}

export class TemperatureArrayCodec extends Codec {
  messageID: string
  numSensors: number

  constructor(messageID: string, numSensors: number) {
    super()
    this.messageID = messageID
    this.numSensors = numSensors
  }

  filter(message: Message): boolean {
    return message.messageID === this.messageID
  }

  // we never write to this struct
  encode(message: Message, push: PushCallback) {
    message.payload = Buffer.alloc(0)
    return push(message)
  }

  decode(message: Message<Buffer>, push: PushCallback) {
    // The null case
    if (message.payload === null) {
      return push(message)
    }

    const reader = SmartBuffer.fromBuffer(message.payload)

    const temperatures: Temperature[] = []

    for (let index = 0; index < this.numSensors; index++) {
      const temperature = {
        degrees: new Quantity(reader.readInt16LE() / 10, 'tempC'),
        error: reader.readUInt8(),
      }

      // read a byte of padding
      reader.readUInt8()

      temperatures.push(temperature)
    }

    const mutatedMessage = message.setPayload(temperatures)

    // Push it up the pipeline
    return push(mutatedMessage)
  }
}

export type RGBPayload = {
  r: number
  g: number
  b: number
}

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
    console.log('decoding led')
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
