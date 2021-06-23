import pako from 'pako'
import FileSaver from 'file-saver'

import { Util } from '../../index.browser'

export class File {


  constructor(
    public fileName: string,
    public fileNote: string,
    public fileSize: number,
    public readStream: any
  ) {}

  public getReadStream() {
    return this.readStream;
  }

  public static async getChunkHash(chunk: Uint8Array): Promise<Uint8Array> {
    return new Uint8Array(await window.crypto.subtle.digest('SHA-256', chunk))
  }

  public static async getCombinedChunkHash(previousHash: Uint8Array, chunk: Uint8Array): Promise<Uint8Array> {
    if (previousHash.length !== 32) {
      throw new Error("previousHash not valid - File.getCombinedChunkHash");
    }

    // size: 32bytes for previousHash + chunk size 
    const combined = new Uint8Array(32 + chunk.length);
    combined.set(previousHash, 0);
    combined.set(chunk, 32);

    return new Uint8Array(await window.crypto.subtle.digest('SHA-256', combined))
  }

  public static deflatChunk(chunk: Uint8Array): Uint8Array {
    return pako.deflate(chunk)
  }

  public static inflatDeflatedChunk(deflatedChunk: Uint8Array): Uint8Array {
    try { 
      return pako.inflate(deflatedChunk);
    } catch(err) {
      throw new Error("inflation failed - File.inflatDeflatedChunk")
    }
  }

  public serialize() {
    return Util.serialize({
      // we are not gonna publish the filePath
      // filePath: this.filePath,
      fileName: this.fileName,
      fileNote: this.fileNote,
      fileSize: this.fileSize,
    })
  }

  // public static parse(str: string) {
  //   const object = Util.parse(str)
  //   if (!object.fileName || !object.fileNote) {
  //     throw new Error('parse error: File.parse')
  //   }
  //   return new File(object.fileName, object.fileNote, object.fileSize)
  // }

  public static saveAs(content: Uint8Array, fileType: string, fileName: string) {
    FileSaver.saveAs(
      new Blob([content], {type: fileType}),
      fileName
    )
  }
}
