class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user).order("created_at DESC")
    @groups = current_user.groups
  end

  def create
    @message = @group.messages.new(message_params)
    @groups = current_user.groups
    if @message.save
      respond_to do |format|
        format.html {redirect_to group_messages_path(@group)}
        format.json
      end
    else
      render :index
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
