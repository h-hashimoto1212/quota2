class QuotesController < ApplicationController
  before_action :random_quote

  def index
    redirect_to quote_path(random_quote)
  end

  def show
    @quote = Quote.find(params[:id])
    other_quotes = Quote.where.not(id: @quote.id)
    @uQuotes = other_quotes.where(quota_id: @quote.quota_id)
    @aQuotes = other_quotes.where(author: @quote.author)
    @sQuotes = other_quotes.where(source: @quote.source)

    @comment = Comment.new
    @comments = @quote.comments
  end

  def new
    @quote = Quote.new
  end

  def create
    @quote = Quote.new(quote_params)
    if @quote.save
      redirect_to quote_path(@quote.id)
    else
      render :new
    end
  end

  def edit
    @quote = Quote.find(params[:id])
  end

  def update
    @quote = Quote.find(params[:id])
    if @quote.update(quote_params)
      redirect_to quote_path(params[:id])
    else
      render :edit
    end
  end

  private

  def quote_params
    proto = {}
    merges = {quota_id: 1, selfquote: 1}
    if params[:quote][:source].present? || params[:quote][:author].present?
      merges.merge!({selfquote: 0})
    end
    proto = params.require(:quote).permit(:text, :author, :source, :description).merge(merges)
    return proto
  end

  def random_quote
    rand(1..Quote.count)
  end

end
