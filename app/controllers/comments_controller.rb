class CommentsController < ApplicationController

  def create
    @quote = Quote.find(params[:quote_id])
    redirect_to (@quote) if @comment = Comment.create(comment_params)
  end

  private

  def comment_params
    params.require(:comment).permit(:text).merge(quota_id: 1, commentable: @quote)
  end
end
