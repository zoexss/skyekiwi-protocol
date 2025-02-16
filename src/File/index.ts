import pako from 'pako'

let FileSaver, fs, crypto

if (typeof window === 'undefined') {
  try {
    fs = require('fs')
    crypto = require('crypto')
  } catch (e) {}
} else {
  FileSaver = require('file-saver')
}

import { Util } from '../index'

export class File {

  constructor(
    public fileName: string,
    public readStream?: any
  ) {}

  public getReadStream() {
    return this.readStream;
  }

  public static async getChunkHash(chunk: Uint8Array): Promise<Uint8Array> {
    if (typeof fs === undefined) {
      return new Uint8Array(await window.crypto.subtle.digest('SHA-256', chunk))
    }
    let hashSum = crypto.createHash('sha256');
    hashSum.update(chunk);
    return hashSum.digest();
  }

  public static async getCombinedChunkHash(previousHash: Uint8Array, chunk: Uint8Array): Promise<Uint8Array> {
    if (previousHash.length !== 32) {
      console.log(previousHash)
      throw new Error("previousHash not valid - File.getCombinedChunkHash");
    }
    // size: 32bytes for previousHash + chunk size 
    const combined = new Uint8Array(32 + chunk.length);
    combined.set(previousHash, 0);
    combined.set(chunk, 32);

    return await File.getChunkHash(combined)
  }

  public static deflatChunk(chunk: Uint8Array): Uint8Array {
    return pako.deflate(chunk)
  }

  public static inflatDeflatedChunk(deflatedChunk: Uint8Array): Promise<Uint8Array> {
    try {
      return pako.inflate(deflatedChunk);
    } catch (err) {
      throw new Error("inflation failed - File.inflatDeflatedChunk")
    }
  }

  public serialize() {
    return Util.serialize({
      fileName: this.fileName
    })
  }

  public static parse(str: string) {
    const object = Util.parse(str)
    if (!object.fileName || !object.fileNote) {
      throw new Error('parse error: File.parse')
    }
    return new File( object.fileName, object.fileChunkSize)
  }

  public static writeFile(
    content: Buffer, 
    filePath: string, 
    flags: string
  ) {
    if (fs !== undefined) {
      return new Promise((res, rej) => {
        const stream = fs.createWriteStream(filePath, { flags: flags })
        stream.write(content)
        stream.end()
        stream.on('finish', () => res(true))
        stream.on('error', rej)
      })
    } else throw new Error("writeFile is for node.js, use File.saveAs instead - File.writeFile")
  }
  public static saveAs(
    content: Uint8Array, 
    fileName?: string,
    fileType?: string,
  ) {
    
    if (typeof fs === undefined) {
      return new Promise((res, rej) => {
        try {
          FileSaver.saveAs(
            new Blob([content], { type: fileType }),
            fileName
          )
          res(true)
        } catch(err) {
          rej()
        }
      })
    } else {
      throw new Error("save as is for browsers, use File.writeFiles instead - File.saveAs")
    }
  }
}
