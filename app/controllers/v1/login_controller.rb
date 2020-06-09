class V1::LoginController < ApplicationController
    def index
        render json: { :login => [
            {
                username: 'TomWhite94'
            }
        ]}.to_json
    end
end