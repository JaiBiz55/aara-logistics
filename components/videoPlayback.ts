let activeBackgroundVideo: HTMLVideoElement | null = null;

export function playBackgroundVideo(video: HTMLVideoElement) {
  if (activeBackgroundVideo !== video) {
    activeBackgroundVideo?.pause();
    activeBackgroundVideo = video;
  }

  return video.play().catch((error: unknown) => {
    if (activeBackgroundVideo === video) activeBackgroundVideo = null;
    throw error;
  });
}

export function pauseBackgroundVideo(video: HTMLVideoElement) {
  video.pause();
  if (activeBackgroundVideo === video) activeBackgroundVideo = null;
}
