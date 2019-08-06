class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def create
    @group = Group.new(group_params)
    
    if @group.save
      redirect_to root_path, notice: "グループを作成しました"  
    else
      render :new
    end
  end

  def new
    @group = Group.new
    @group.users << current_user
  end

  def index
    @groups = current_user.groups
    @message = Message.new
  end

  def edit
    @group = Group.find(params[:id])
    @users = @group.users
  end

  def update
    if @group.update(group_params)
      redirect_to root_path, notice: "編集が成功しました"  
    else
      render :edit, notice: "やり直し！！"  
    end
  end

  private

  def group_params
    params.require(:group).permit(:name, { :user_ids => @group.user_ids})
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
