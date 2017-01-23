class MessagesController < ApplicationController
  # before_action :authenticate_user!, only: [:index, :create]
  before_action :set_group, only: [:index, :create]

  def index
    @message = Message.new
  end

  def create
    @message = Message.new
    message = @group.messages.new(message_params)
    if message.save
      redirect_to group_messages_path(params[:group_id])
    else
      flash.now[:alert] = "メッセージが空だぞい_(┐「ε:)_"
      render :index
    end
  end

  private

  def message_params
    params.require(:message).permit(:body).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.includes(:users).find(params[:group_id])
  end
end