export default function closeBlock({ buttonElement, blockElement, classOfBlockToClosed }) {
  buttonElement.addEventListener('click', () => {
    blockElement.classList.add(classOfBlockToClosed);
  })
}
