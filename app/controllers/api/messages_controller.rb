class Api::MessagesController < ApplicationController
  before_action :set_group, only: [:index]
  def index
    @new_messages = @group.messages.where("id > ?", params[:id])
    if @new_messages
      respond_to do |format|
        format.json
      end
    end
  end

  private
  
  def message_params
    params.require(:message).permit(:text, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

end