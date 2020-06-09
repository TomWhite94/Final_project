class V1::LoginController < ApplicationController
    def index
        render json: { :login => [
            {
                email: 'tomjameswhite94@gmail.com',
                password: '1234'
            }
        ]}.to_json
    end

    def create
    end
end