import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "icon-composer-button",

  initialize() {
    withPluginApi((api) => {
      api.addComposerToolbarPopupMenuOption({
        action(event) {
          event.addText("[wrap=icon id=heart][/wrap]");
        },
        group: "insertions",
        icon: "discourse-emojis",
      });
    });
  },
};
