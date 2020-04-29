export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(element.getElement());
      break;
  }
};

export const renderPopup = (popupComponent) => {
  const closePopup = () => {
    document.querySelector(`body`).removeChild(popupComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      closePopup();
    }
  };

  render(document.querySelector(`body`), popupComponent, RenderPosition.BEFOREEND);

  popupComponent.setClickHandler(() => {
    closePopup();
  });

  document.addEventListener(`keydown`, onEscKeyDown);
};

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

