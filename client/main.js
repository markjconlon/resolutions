import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';

Resolutions = new Mongo.Collection('resolutions');

Template.body.helpers({
  resolutions: function() {
    if (Session.get("hideFinished")) {
      // $ne is a mongo method to check if the field stored is not equal to whatever you provide
      // so if hideFinished is checked find all resolutions that are not checked off as complete yet
      return Resolutions.find({checked: {$ne: true}})
    } else {
      return Resolutions.find();
    }
  },
  hideFinished: function(){
    return Session.get("hideFinished");
  }
});

Template.body.events({
  // listens for the submit event on the .new-resolution form ex/ if it was click you would replace
  // submit with click
  "submit .new-resolution": function(event) {
    var title = event.target.title.value;

    Meteor.call("addResolution", title)

    event.target.title.value = "";

    // return false makes sure the page doesn't refresh
    return false;
  },

  "change, .hide-finished": function(event){
    Session.set("hideFinished", event.target.checked);
  }
});

Template.resolution.events({
  "click .toggle-checked": function() {
    // checked: !this.checked means look for checked and set it equal to the opposite
    Meteor.call("updateResolution", this._id, !this.checked);
  },
  "click .delete": function(){
    // mongo db assigns a value to each element inserted into the db collection its accessed by _id
    Meteor.call("deleteResolution",this._id);
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});
