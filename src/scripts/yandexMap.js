export default function initYandexMap({ mapId, block, classBlock }) {

  let myMap;

  ymaps.ready(init);

  function init() {
    myMap = new ymaps.Map(mapId, {
      center: [55.763168344770314, 37.626356243228635], // Москва
      zoom: 14,
      controls: [],
    }, {
      searchControlProvider: 'yandex#search'
    });

    let myPlacemark = new ymaps.Placemark([55.76963601332982, 37.63668850000002], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'images/mark.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [0, 0],
    });

    myPlacemark.events.add('click', () => {
      block.classList.remove(classBlock);
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
  }
}
