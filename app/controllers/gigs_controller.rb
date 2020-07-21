class GigsController < ApplicationController

    def show
        @gig = Gig.find_by(userId: session[:user_id])
    end

    def create
        @gig = Gig.new(gig_params)
        @gig.save
    end

    def destroy
    end

    private

    def gig_params
        params.require(:gig).permit!
    end
end