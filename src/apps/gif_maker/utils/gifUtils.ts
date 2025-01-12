import GIF from 'gif.js';
import { GifConfig } from '../types';

type ProgressCallback = (state: string, process: number) => void;

export async function createGifFromImages(
  assets: string[],
  config: GifConfig,
  onProgress: ProgressCallback
): Promise<string> {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = assets[0];
    
    image.onload = () => {
      const gif = new GIF({
        workers: 2,
        quality: config.quality,
        height: config.height,
        width: config.width,
        workerScript: '/gif.worker.js',
      });

      assets.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        gif.addFrame(img, { delay: config.delay * 1000 });
      });

      gif.on('finished', (blob: Blob) => {
        onProgress('', 0);
        resolve(URL.createObjectURL(blob));
      });

      gif.on('progress', (p: number) => {
        onProgress('Creating GIF', p);
      });

      gif.render();
    };
  });
}

export async function createGifFromVideo(
  videoSrc: string,
  config: GifConfig,
  onProgress: ProgressCallback,
  videoDom: HTMLVideoElement
): Promise<string> {
  return new Promise((resolve) => {
    const v = videoDom;
    v.volume = 0;

    const gif = new GIF({
      workers: 4,
      quality: config.quality || 10,
      width: config.width || v.videoWidth,
      height: config.height || v.videoHeight,
      workerScript: '/gif.worker.js',
    });

    let frameInterval: number;
    let progressInterval: number;

    gif.on('finished', (blob: Blob) => {
      onProgress('', 0);
      resolve(URL.createObjectURL(blob));
    });

    gif.on('progress', (p: number) => {
      onProgress('Creating GIF', p);
    });

    v.addEventListener('play', () => {
      frameInterval = window.setInterval(() => {
        gif.addFrame(v, {
          copy: true,
          delay: config.delay * 1000,
        });
      }, config.delay * 1000);

      progressInterval = window.setInterval(() => {
        onProgress('Reading video', v.currentTime / v.duration);
      }, 1000);
    });

    v.addEventListener('ended', () => {
      clearInterval(frameInterval);
      clearInterval(progressInterval);
      gif.render();
    });

    v.play();
  });
} 
