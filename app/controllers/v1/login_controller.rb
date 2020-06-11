class V1::LoginController < ApplicationController
    def index
        render json: { :login => [
            {
                email: 'tomjameswhite94@gmail.com',
                password: '1234'
            }
        ]}.to_json
    end
    
    def new
        @login = Login.new
    end

    def create 
      
        @login = Login.new(login_params)
        @login.save
        render json: @login
    
     end

     private 

     def login_params
        params.require(:login).permit!
      end
end