const { ObjectId } = require('mongoose').Types;
const { Student, Course } = require('../models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
        const usersObj = {
          users,
          //headCount: await headCount(),
        };
        return res.json(usersObj);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // Get a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v')
          .lean();
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json({
          user,
          //grade: await grade(req.params.studentId),
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Delete a user and remove all  thoughts
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndRemove({ _id: req.params.usertId });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' })
        }
  
        const thoughts = await Thought.findOneAndRemove(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
        );
  
        if (!thoughts) {
          return res.status(404).json({
            message: 'User deleted, but no thoughts found',
          });
        }
  
        res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // Add an friend to a student
    async addFriend(req, res) {
      try {
        console.log('You are adding an friend!');
        console.log(req.body);
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: {friend: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        }
  
        res.json(student);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove friend from a student
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: {friend: {friendId: req.params.friendId } } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  