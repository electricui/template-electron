import { TYPE_CUSTOM_MARKER } from '@electricui/protocol-constants'

const colorEncoder = {
  test: { type: TYPE_CUSTOM_MARKER, messageID: 'rgb' },
  transform: packet =>
    Object.assign({}, packet, {
      payload: Buffer.from(
        Uint16Array.from([
          packet.payload.red,
          packet.payload.green,
          packet.payload.blue,
        ]).buffer,
      ),
    }),
}

const colorDecoder = {
  test: { type: TYPE_CUSTOM_MARKER, messageID: 'rgb' },
  transform: packet => {
    const arr = Array.from(
      new Uint16Array(
        packet.payload.buffer,
        packet.payload.byteOffset,
        packet.payload.byteLength / Uint16Array.BYTES_PER_ELEMENT,
      ).values(),
    )

    return Object.assign({}, packet, {
      payload: {
        red: arr[0],
        green: arr[1],
        blue: arr[2],
      },
    })
  },
}

export default { colorEncoder, colorDecoder }
