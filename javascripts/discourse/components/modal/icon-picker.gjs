import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { hash } from "@ember/helper";
import { action } from "@ember/object";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import DModalCancel from "discourse/components/d-modal-cancel";
import IconPicker from "discourse/select-kit/components/icon-picker";
import { i18n } from "discourse-i18n";

export default class IconPickerModal extends Component {
  @tracked icon = null;

  @action
  handleIconChange(newIcon) {
    this.icon = newIcon;
  }

  @action
  insertIcon() {
    this.args.model.insert(this.icon);
    this.args.closeModal();
  }

  <template>
    <DModal
      @title={{i18n (themePrefix "modal.title")}}
      class="icon-picker-modal"
      @closeModal={{@closeModal}}
    >
      <:body>
        <div class="icon-picker-modal__icon-picker">
          <IconPicker
            @value={{this.icon}}
            @options={{hash maximum=1}}
            @onChange={{this.handleIconChange}}
          />
        </div>
      </:body>

      <:footer>
        <DButton
          @label="composer.link_dialog_action"
          class="icon-picker-modal__insert-btn btn-primary"
          @action={{this.insertIcon}}
        />
        <DModalCancel @close={{@closeModal}} />
      </:footer>
    </DModal>
  </template>
}
