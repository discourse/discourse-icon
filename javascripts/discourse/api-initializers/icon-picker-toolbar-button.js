import { apiInitializer } from "discourse/lib/api";
import IconPickerModal from "../components/modal/icon-picker.gjs";

export default apiInitializer((api) => {
  api.addComposerToolbarPopupMenuOption({
    action(event) {
      const modal = api.container.lookup("service:modal");
      modal.show(IconPickerModal, {
        model: {
          insert: (iconId) => event.addText(`[wrap=icon id=${iconId}][/wrap]`)
        }
      });
    },
    group: "insertions",
    label: themePrefix("toolbar.button_label"),
    icon: "discourse-emojis",
  });
});
