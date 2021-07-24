export default class SwitchTabs {
  constructor({
    btnContainer,
    btnActiveClass,
    btnClass,
    tabActiveClass,
    buttons,
    tabs
  }) {
    this.btnContainer = btnContainer,
      this.btnActiveClass = btnActiveClass,
      this.btnClass = btnClass,
      this.tabActiveClass = tabActiveClass,
      this.buttons = buttons,
      this.tabs = tabs

    this.btnContainer.addEventListener('click', this.switchTabs.bind(this))
  }

  switchTabs(ev) {
    const target = ev.target;
    const isNotButton = (!target.classList.contains(this.btnClass));

    if (isNotButton) {
      return;
    }

    for (const button of this.buttons) {
      button.classList.remove(this.btnActiveClass);
    }

    target.classList.add(this.btnActiveClass)

    for (const tab of this.tabs) {
      if (target.dataset.id === tab.id) {
        tab.classList.add(this.tabActiveClass);
        continue;
      }
      tab.classList.remove(this.tabActiveClass);
    }
  }
}
