class MessagesController < ApplicationController
  before_action :set_group, :set_group_users_id
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    @message = @group.messages.new(message_params)
    @message.save
    respond_to do |format|
      format.html { redirect_to action: index }
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end

  def set_group_users_id
    @group_users_id = GroupUser.find(params[:group_id])
  end
end