//////////////////////////////////
// VIDEOS

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

//////////////////////////////////
// CURSOR

var cursor = document.querySelector(".cursor");
var cursorinner = document.querySelector(".cursor2");
var a = document.querySelectorAll("a");

// add text inside cursor
const cursorLabel = document.createElement("span");
cursorLabel.classList.add("cursor-text");
cursor.appendChild(cursorLabel);

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
});

document.addEventListener("mousemove", function (e) {
  var x = e.clientX;
  var y = e.clientY;
  cursorinner.style.left = x + "px";
  cursorinner.style.top = y + "px";
});

document.addEventListener("mousedown", function () {
  cursor.classList.add("click");
  cursorinner.classList.add("cursorinnerhover");
});

document.addEventListener("mouseup", function () {
  cursor.classList.remove("click");
  cursorinner.classList.remove("cursorinnerhover");
});

a.forEach((item) => {
  item.addEventListener("mouseover", () => {
    cursor.classList.add("hover");
  });
  item.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

// Hover effects for links
const caseStudyLinks = document.querySelectorAll("a.case-study");
const caseProjectLinks = document.querySelectorAll("a.case-project");

function addHoverEffect(link, text) {
  link.addEventListener("mouseenter", () => {
    cursor.style.width = "80px"; // expand cursor
    cursor.style.height = "80px";
    cursor.style.backgroundColor = "#312339";
    cursorLabel.textContent = text;
    cursorLabel.style.opacity = 1;
  });
  link.addEventListener("mouseleave", () => {
    cursor.style.width = "50px"; // shrink cursor
    cursor.style.height = "50px";
    cursor.style.backgroundColor = "transparent";
    cursorLabel.style.opacity = 0;
  });
}

caseStudyLinks.forEach((link) => addHoverEffect(link, "view"));
caseProjectLinks.forEach((link) => addHoverEffect(link, "demo"));
