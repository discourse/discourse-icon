# frozen_string_literal: true

RSpec.describe "Composer icon picker", type: :system do
  fab!(:user) { Fabricate(:user, refresh_auto_groups: true) }
  let!(:theme) { upload_theme_or_component }
  let(:composer) { PageObjects::Components::Composer.new }

  before { sign_in(user) }

  context "when setting is disabled" do
    before do
      theme.update_setting(:insert_icon_composer_button_enabled, false)
      theme.save!
    end

    it "does not show insert icon button in composer toolbar" do
      visit("/new-topic")
      expect(composer).to be_opened

      find(".toolbar-menu__options-trigger").click

      expect(page).to have_no_css("button[title='Insert Icon']")
    end
  end

  context "when setting is enabled" do
    before do
      theme.update_setting(:insert_icon_composer_button_enabled, true)
      theme.save!
    end

    it "inserts selected icon into composer" do
      visit("/new-topic")
      expect(composer).to be_opened

      find(".toolbar-menu__options-trigger").click
      find("button[title='Insert Icon']").click

      expect(page).to have_css(".icon-picker-modal")

      icon_picker = PageObjects::Components::SelectKit.new(".icon-picker-modal .icon-picker")
      icon_picker.expand
      icon_picker.search("heart")
      icon_picker.select_row_by_value("heart")

      find(".icon-picker-modal__insert-btn").click

      expect(composer).to have_value("[wrap=icon id=heart][/wrap]")
      expect(page).to have_no_css(".icon-picker-modal")
    end

    it "can cancel without inserting" do
      visit("/new-topic")
      expect(composer).to be_opened

      find(".toolbar-menu__options-trigger").click
      find("button[title='Insert Icon']").click

      expect(page).to have_css(".icon-picker-modal")

      find(".icon-picker-modal .d-modal-cancel").click

      expect(page).to have_no_css(".icon-picker-modal")
      expect(composer).to have_value("")
    end
  end
end
