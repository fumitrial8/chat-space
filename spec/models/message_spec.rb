require 'rails_helper'

describe Message do
  describe '#create' do
    it "is valid message" do
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid message without imagemes" do
      message = build(:message, image: nil)
      message.valid?
      expect(message).to be_valid
    end

    it "is valid message" do
      message = build(:message, text: nil)
      message.valid?
      expect(message).to be_valid
    end
    #無効なmessageを作成
    it "is invalid message without text and image" do
      message = build(:message, text: nil, image: nil)
      message.valid?
      expect(message.errors[:text]).to include("を入力してください")
    end

    it "is invalid message without user_id" do
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include("を入力してください")
    end

    it "is invalid message without group_id" do
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include("を入力してください")
    end
  end


  
end