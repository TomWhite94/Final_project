class GigsController < ApplicationController

    def show
        @gig = Gig.find_by(userId: session[:user_id])
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
    end

    private

    def gig_params
        params.require(:gig).permit!
    end
end