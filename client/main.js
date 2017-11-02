import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
  resolutions: function() {
      return Resolutions.find();
  }
});

Template.body.events({
  // listens for the submit event on the .new-resolution form ex/ if it was click you would replace
  // submit with click
  "submit .new-resolution": function(event) {
    var title = event.target.title.value;

    Resolutions.insert({
      title: title,
      createdAt: new Date()
    });

    event.target.title.value = "";

    // return false makes sure the page doesn't refresh
    return false;
  }
});

Template.resolution.events({
  'click .delete': function(){
    // mongo db assigns a value to each element inserted into the db collection its accessed by _id
    Resolutions.remove(this._id);
  }
});
