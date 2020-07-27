class GigsController < ApplicationController

    def index
        @gigs = Gig.where(userId: session[:user_id])
        render json: {
            gigs: @gigs
        }
    end

    def show
        @gig = Gig.find(params[:id])
        render json: {
            gig: @gig
        }
    end

    def create
        @gig = Gig.new(gig_params)
        if @gig.save
            render json: {
              status: :created,
              gig: @gig
            }
          else 
            render json: {
              status: 500,
              errors: @gig.errors.full_messages
            }
          end
    end

    def destroy
       @gig = Gig.find(params[:id])
       @gig.destroy
    end

    private

    def gig_params
        params.require(:gig).permit!
    end
end