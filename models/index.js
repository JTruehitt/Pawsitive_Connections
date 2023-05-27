const User = require("./User");
const Pet = require("./Pet");
const Post = require("./Post");
const Comment = require("./Comment");

Pet.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Pet, {
  foreignKey: "user_id",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Post, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "SET NULL",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
});

module.exports = { User, Pet, Post, Comment };
