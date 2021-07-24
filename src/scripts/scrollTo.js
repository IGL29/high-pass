export default function scrollToSection({ containerLinks, classLink }) {

  containerLinks.addEventListener('click', (ev) => {
    ev.preventDefault();

    const isNotLink = !ev.target.classList.contains(classLink);

    if (isNotLink) {
      return;
    }
    const hrefValueLink = ev.target.attributes.href.value.substr(1);
    const sectionCoordinateTop = document.getElementById(hrefValueLink).offsetTop;

    window.scrollTo({
      top: sectionCoordinateTop,
      behavior: "smooth"
    });
  });
}
