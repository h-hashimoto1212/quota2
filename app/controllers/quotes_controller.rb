class QuotesController < ApplicationController

  def index
    # @quotes = Quote.all
    @quote = Quote.offset( rand(Quote.count) ).first
    other_quotes = Quote.where.not(id: @quote.id)
    @uQuotes = other_quotes.where(quota_id: @quote.quota_id)
    @author = @quote.author
    @aQuotes = other_quotes.where(author_id: @author.id) if @author
    @source = @quote.source
    @sQuotes = other_quotes.where(source_id: @source.id) if @source
  end

  def new
    @quote = Quote.new
    @author = Author.new
    @source = Source.new
  end

  def create
    @quote = Quote.new(quote_params)
    if @quote.save
      redirect_to root_path{ render}
    else
      render :new
    end
  end

  def edit
    @quote = Quote.find(params[:id])
    @author = @quote.author
    @author = Author.new if @author.blank?
    @source = @quote.source
    @source = Source.new if @source.blank?
  end

  def update
    @quote = Quote.find(params[:id])
    if @quote.update(quote_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def quote_params
    proto = {}
    attributes = [:text, :description]
    merges = {quota_id: 1, selfquote: 0}
    if params[:quote][:author_attributes][:name].present?
      attributes.push(author_attributes: [:name])
      merges.merge(selfquote: 0)
    end
    if params[:quote][:source_attributes][:name].present?
      attributes.push(source_attributes: [:name, :date]) 
      merges.merge(selfquote: 0)
    end
    proto = params.require(:quote).permit(attributes).merge(merges)
    return proto
  end

end
