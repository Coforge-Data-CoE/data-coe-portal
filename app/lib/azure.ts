import {
  BlobServiceClient,
  ContainerClient,
  BlockBlobClient,
} from '@azure/storage-blob'
import { randomUUID } from 'node:crypto'

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY

let serviceClient: BlobServiceClient

// Prefer connection string; else use account name/key via URL + credential
if (connStr) {
  serviceClient = BlobServiceClient.fromConnectionString(connStr)
} else if (accountName && accountKey) {
  const url = `https://${accountName}.blob.core.windows.net`
  // In v12, SharedKeyCredential is internal; `fromConnectionString` is simpler.
  // If you prefer explicit credentials, import StorageSharedKeyCredential and use BlobServiceClient(url, credential).
  throw new Error('For simplicity, use AZURE_STORAGE_CONNECTION_STRING')
} else {
  throw new Error('Azure Storage credentials not configured')
}

async function getContainerClient(name: string): Promise<ContainerClient> {
  const client = serviceClient.getContainerClient(name)
  await client.createIfNotExists()
  // Optional (non-sensitive assets): make blobs publicly readable
  // await client.setAccessPolicy('blob')  // uncomment if you want public read
  return client
}

export async function uploadBufferToBlob(
  containerName: string,
  fileBuffer: Buffer,
  contentType: string,
  originalName?: string
) {
  const container = await getContainerClient(containerName)
  const ext = originalName?.split('.').pop()
  const blobName = `${randomUUID()}${ext ? '.' + ext : ''}`

  const blobClient = container.getBlockBlobClient(blobName)
  await blobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  })

  const publicUrl = `${serviceClient.url.replace(/\/$/, '')}/${containerName}/${blobName}`
  return { blobName, url: publicUrl }
}