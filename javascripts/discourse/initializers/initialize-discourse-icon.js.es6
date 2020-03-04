import { escapeExpression } from "discourse/lib/utilities";
import { renderIcon } from "discourse-common/lib/icon-library";
import { withPluginApi } from "discourse/lib/plugin-api";

function _attachIcons($cooked) {
  const icons = $cooked[0].querySelectorAll(".d-wrap[data-wrap=icon]");
  icons.forEach(icon => {
    const id = escapeExpression(icon.getAttribute("data-id"));
    if (Discourse.SvgIconList && Discourse.SvgIconList.indexOf(id) > -1) {
      const htmlIcon = renderIcon("string", id).htmlSafe();
      icon.innerHTML = htmlIcon;
    } else {
      const span = document.createElement("span");
      span.classList.add("icon-misisng");
      span.innerText = `[${I18n.t(themePrefix("icon-missing"))}]`;
      icon.replaceWith(span);
    }
  });
}

export default {
  name: "discourse-icon",

  initialize() {
    withPluginApi("0.8.7", api => {
      api.decorateCooked(_attachIcons, {
        id: "discourse-icon"
      });
    });
  }
};
