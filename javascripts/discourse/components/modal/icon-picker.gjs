import Component from "@glimmer/component";
import { fn } from "@ember/helper";
import DButton from "discourse/components/d-button";
import DModal from "discourse/components/d-modal";
import { i18n } from "discourse-i18n";

export default class IconPickerModal extends Component {
  <template>
    <DModal
      @title={{i18n (themePrefix "modal.title")}}
      class="icon-picker-modal"
      @closeModal={{@closeModal}}
    >
      <:body>
        <div class="icon-picker-modal__icon-picker">
        </div>
      </:body>

      <:footer>
        <DButton
          @label="composer.link_dialog_action"
          class="icon-picker-modal__insert-button btn-primary"
          @action={{fn @model.insert "heart"}}
        />
        <DButton
          @label="cancel"
          class="icon-picker-modal__cancel-button btn-default"
          @action={{@closeModal}}
        />
      </:footer>
    </DModal>
  </template>
}
