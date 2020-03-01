class QuotesController < ApplicationController
  def index
    @quotes = Quote.all
    @quote = 	Quote.offset( rand(Quote.count) ).first
    @uQuotes = @quotes.where(quota_id: @quote.quota_id)
    @author = Author.find_by(id: @quote.author_id)
    @aQuotes = @quotes.where(author_id: @author.id) if @author
    @source = Source.find_by(id: @quote.source_id)
    @sQuotes = @quotes.where(source_id: @source.id) if @source

  end

  def new
    @quote = Quote.new
    @author = Author.new
    @source = Source.new
  end

  def create
    @quote = Quote.new(quote_params)
    @quote.merge(author_attributes: [:name]) if @author
    @quote.merge(source_attributes: [:name, :author_id]) if @source
    if (@author || @source)
      @quote.selfquote = 0
    else
      @quote.selfquote = 1
    end
    if @quote.save
      render :index
    else
      render :new
    end
  end

  def edit
    @quote = Quote.find(params[:id])
    @author = Author.find_by(id: @quote.author_id)
    @author = Author.new if @author.blank?
    @source = Source.find_by(id: @quote.source_id)
    @source = Source.new if @source.blank?
  end

  def update
    @quote = Quote.find(params[:id])
    @quote.merge(author_attributes: [:name]) if @author
    @quote.merge(source_attributes: [:name, :author_id]) if @source
    if (@author || @source)
      @quote.selfquote = 0
    else
      @quote.selfquote = 1
    end
    if @quote.update(quote_params)
      redirect_to action: :index
    else
      render :edit
    end
  end

  private

  def quote_params
    params.require(:quote)
      .permit(:text, :selfquote, :description)
      .merge(quota_id: 1,)
  end

end
