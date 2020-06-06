# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_01_29_094113) do

  create_table "comments", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.bigint "quota_id"
    t.text "text", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable_type_and_commentable_id"
    t.index ["quota_id"], name: "index_comments_on_quota_id"
  end

  create_table "evaluates", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "quota_id"
    t.string "evaluatable_type"
    t.bigint "evaluatable_id"
    t.boolean "like"
    t.boolean "dislike"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["evaluatable_type", "evaluatable_id"], name: "index_evaluates_on_evaluatable_type_and_evaluatable_id"
    t.index ["quota_id"], name: "index_evaluates_on_quota_id"
  end

  create_table "pictures", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "image", null: false
    t.string "imageable_type"
    t.bigint "imageable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["imageable_type", "imageable_id"], name: "index_pictures_on_imageable_type_and_imageable_id"
  end

  create_table "quotas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "quotes", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.text "text", null: false
    t.string "author"
    t.string "source"
    t.string "date"
    t.boolean "selfquote"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "quota_id"
    t.text "description"
    t.index ["quota_id"], name: "index_quotes_on_quota_id"
  end

  create_table "skin_quotas", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.bigint "skin_id"
    t.bigint "quota_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quota_id"], name: "index_skin_quotas_on_quota_id"
    t.index ["skin_id"], name: "index_skin_quotas_on_skin_id"
  end

  create_table "skins", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.boolean "enabled"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "comments", "quotas"
  add_foreign_key "evaluates", "quotas"
  add_foreign_key "quotes", "quotas"
  add_foreign_key "skin_quotas", "quotas"
  add_foreign_key "skin_quotas", "skins"
end
