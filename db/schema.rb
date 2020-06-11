ActiveRecord::Schema.define(version: 2019_10_01_085017) do

    create_table "logins", force: :cascade do |t|
        t.string "email"
        t.string "password"

    end
end