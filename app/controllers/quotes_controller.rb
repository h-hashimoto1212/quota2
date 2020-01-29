class QuotesController < ApplicationController
  def show
    @quote = Quote.all.sample
  end

  def new
    @quote = Quote.new
  end
end
