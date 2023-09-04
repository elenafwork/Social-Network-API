
const { User, Thought} = require('../models');

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
          .populate('friends')
          .populate('thoughts');
          
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.status(200).json(user);
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
        const user = await User.findOneAndRemove({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No such user exists' })
        }
  
       const thoughts= await Thought.deleteMany({ _id: { $in: user.thoughts }});
      res.json({ message: 'User and Thoughts deleted!' });
   
  
        // if (!thoughts) {
        //   return res.status(404).json({
        //     message: 'User deleted, but no thoughts found',
        //   });
        // }
  
        //res.json({ message: 'User successfully deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },

    //update user by its id
    async updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    
  
    // Add an friend to a user
    async addFriend(req, res) {
      try {
        console.log('You are adding an friend!');
        console.log(req.body);
             


        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: {friends: req.params.friendId } },
          { returnOriginal: false}
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'No user found with that ID :(' })
        }

        // if (user.friends.length<1){
        //   return res.status(404).json('was not able to add')
        // }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // Remove friend from a student
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: {friends:req.params.friendId } },
          { new: true }
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
  