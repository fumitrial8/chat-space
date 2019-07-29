class AddForeignKeyToUserGroups < ActiveRecord::Migration[5.0]
  def change
    remove_column :user_groups, :user_id
    remove_column :user_groups, :group_id
    add_reference :user_groups, :user
    add_reference :user_groups, :group
  end
end
