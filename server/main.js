import { Meteor } from 'meteor/meteor';
Resolutions = new Mongo.Collection('resolutions');
Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    addResolution: function(title) {
      Resolutions.insert({
        title: title,
        createdAt: new Date()
      });
    }
  })
});
