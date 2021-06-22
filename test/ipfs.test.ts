import * as SkyeKiwi from '../src/index'
import { expect } from 'chai'
import { randomBytes } from 'tweetnacl'

require('dotenv').config();
describe('IPFS Client', function () {
  this.timeout(0)

  const ipfs = new SkyeKiwi.IPFS()

  it('ipfs works', async () => {

    const cids = []
    let data = []

    for (let i = 0; i < 10; i++) {
      data.push(randomBytes(10000))
      const data_hex = SkyeKiwi.Util.u8aToHex(data[i])
      cids.push(await ipfs.add(data_hex))
      expect(cids[i].size).to.greaterThanOrEqual(10000 * 2)
    }

    console.log(cids)
    for (let i = 0; i < 10; i++) {
      const content = await ipfs.cat(cids[i].cid)
      expect(content).to.equal(SkyeKiwi.Util.u8aToHex(data[i]))
    }

    await ipfs.stopIfRunning()
  })
})
