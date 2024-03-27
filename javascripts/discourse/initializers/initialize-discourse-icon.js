import { htmlSafe } from "@ember/template";
import { withPluginApi } from "discourse/lib/plugin-api";
import { escapeExpression } from "discourse/lib/utilities";
import {
  isExistingIconId,
  renderIcon,
} from "discourse-common/lib/icon-library";

function _attachIcons(cooked) {
  const icons = cooked.querySelectorAll(".d-wrap[data-wrap=icon]");

  icons.forEach((icon) => {
    const id = escapeExpression(icon.dataset.id);
    const params = { translatedTitle: id };

    if (isExistingIconId(id)) {
      icon.innerHTML = htmlSafe(renderIcon("string", id, params));
      return;
    }

    const color =
      getComputedStyle(document.body)
        .getPropertyValue("--primary")
        ?.replace("#", "")
        .trim() || "000000";

    const img = document.createElement("img");
    img.classList.add("svg-as-img");
    img.src = `/svg-sprite/${window.location.hostname}/icon/${color}/${id}.svg`;

    icon.replaceWith(img);
  });
}

export default {
  name: "discourse-icon",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCookedElement(_attachIcons, {
        id: "discourse-icon",
      });
    });
  },
};
