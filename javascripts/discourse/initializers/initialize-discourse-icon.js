import { htmlSafe } from "@ember/template";
import { isExistingIconId, renderIcon } from "discourse/lib/icon-library";
import { withPluginApi } from "discourse/lib/plugin-api";
import { escapeExpression } from "discourse/lib/utilities";
import IconPickerModal from "../components/modal/icon-picker.gjs";

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
    withPluginApi((api) => {
      api.decorateCookedElement(_attachIcons, {
        id: "discourse-icon",
      });

      if (settings.insert_icon_composer_button_enabled) {
        api.addComposerToolbarPopupMenuOption({
          action(event) {
            const modal = api.container.lookup("service:modal");
            modal.show(IconPickerModal, {
              model: {
                insert: (iconId) =>
                  event.addText(`[wrap=icon id=${iconId}][/wrap]`),
              },
            });
          },
          group: "insertions",
          label: themePrefix("insert_icon"),
          icon: "discourse-emojis",
        });
      }
    });
  },
};
