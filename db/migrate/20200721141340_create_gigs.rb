class CreateGigs < ActiveRecord::Migration[6.0]
  def change
    create_table :gigs do |t|
      t.integer :userId
      t.integer :gigId

      t.timestamps
    end
  end
end
