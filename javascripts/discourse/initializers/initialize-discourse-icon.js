import { escapeExpression } from "discourse/lib/utilities";
import { renderIcon } from "discourse-common/lib/icon-library";
import { withPluginApi } from "discourse/lib/plugin-api";
import { htmlSafe } from "@ember/template";

function _attachIcons($cooked) {
  const icons = $cooked[0].querySelectorAll(".d-wrap[data-wrap=icon]");
  icons.forEach((icon) => {
    const id = escapeExpression(icon.dataset.id);
    const params = { translatedTitle: id };
    const isExistingIconId =
      require("discourse-common/lib/icon-library").isExistingIconId;

    if (!isExistingIconId || (isExistingIconId && isExistingIconId(id))) {
      icon.innerHTML = htmlSafe(renderIcon("string", id, params));
    } else {
      const img = document.createElement("img");
      img.classList.add("svg-as-img");
      let color = getComputedStyle(document.body).getPropertyValue("--primary");
      color && color.length
        ? (color = color.replace("#", ""))
        : (color = "000000");
      img.src = `/svg-sprite/${
        window.location.hostname
      }/icon/${color.trim()}/${id}.svg`;
      icon.replaceWith(img);
    }
  });
}

export default {
  name: "discourse-icon",

  initialize() {
    withPluginApi("0.8.7", (api) => {
      api.decorateCooked(_attachIcons, {
        id: "discourse-icon",
      });
    });
  },
};
