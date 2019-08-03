require 'rails_helper'

describe User do
  describe '#create' do
    it "is valid" do
      user = build(:user)
      user.valid?
      expect(user).to be_valid
    end

    it "is invalid" do
      user = build(:user, name: "")
      user.valid?
      expect(user.errors[:name]).to include("を入力してください")
    end
  end
end