const User = require("./User");
const Pet = require("./Pet");
const Post = require("./Post");
const Comment = require("./Comment");
const Lot = require("./Lot");
const Bid = require("./Bid");

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

Post.belongsTo(Pet, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Pet.hasMany(Post, {
  foreignKey: "user_id",
});

// Marketplace Associations
Lot.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Lot, {
  foreignKey: "user_id",
});

Bid.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

User.hasMany(Bid, {
  foreignKey: "user_id",
});

Bid.belongsTo(Lot, {
  foreignKey: "lot_id",
  onDelete: "SET NULL",
});

Lot.hasMany(Bid, {
  foreignKey: "lot_id",
});

Comment.belongsTo(Lot, {
  foreignKey: "lot_id",
  onDelete: "SET NULL",
});

Lot.hasMany(Comment, {
  foreignKey: "lot_id",
});

module.exports = { User, Pet, Post, Comment, Bid, Lot };
