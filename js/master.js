const lazyVideos = document.querySelectorAll(".video-mask");

const videoObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        const source = video.querySelector("source");

        if (source && source.dataset.src) {
          source.src = source.dataset.src;
          video.load(); // triggers download
          video.play(); // optional autoplay
        }

        observer.unobserve(video); // stop observing once loaded
      }
    });
  },
  {
    threshold: 0.25, // start loading when 25% of the video is visible
  }
);

lazyVideos.forEach((video) => {
  videoObserver.observe(video);
});
