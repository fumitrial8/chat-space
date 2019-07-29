class AddNullTrueToUserGroups < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_groups, :user_id
    remove_column :user_groups, :group_id
    add_column :user_groups, :user_id, :integer
    add_column :user_groups, :group_id, :integer
  end
end
