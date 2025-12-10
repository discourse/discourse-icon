import { apiInitializer } from "discourse/lib/api";

export default apiInitializer((api) => {
  api.addComposerToolbarPopupMenuOption({
    action(event) {
      event.addText("[wrap=icon id=heart][/wrap]");
    },
    group: "insertions",
    icon: "discourse-emojis",
  });
});
