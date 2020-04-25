import formidable from 'formidable';
import getConfig from 'next/config';
import fs from 'fs';
import Uploader from '@codeday/uploader-node';

const { serverRuntimeConfig } = getConfig();
const upload = new Uploader(serverRuntimeConfig.uploader.url, serverRuntimeConfig.uploader.secret);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 1024 * 1024 * 2;

  try {
    const files = await new Promise((resolve, reject) => form.parse(req, (err, _, f) => {
      if (err) reject(err);
      resolve(f);
    }));
    const fileBuffer = await fs.promises.readFile(files[0].path);
    fs.promises.unlink(files[0].path);
    const result = await upload.image(fileBuffer, files[0].path);
    await new Promise((r) => setTimeout(r, 1000));
    res.send({ url: result.urlResize.replace(/{(width|height)}/g, 256) });
  } catch (err) {
    console.error(err);
    res.send(500, err.message);
  }
};
