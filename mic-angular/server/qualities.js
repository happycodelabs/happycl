Meteor.publish("qualities", function () {
  return Qualities.find({
    $or: [
      {
        $and: [
          {"public": true},
          {"public": {$exists: true}}
        ]
      },
      {
        $and: [
          {owner: this.userId},
          {owner: {$exists: true}}
        ]
      }
    ]
  });
});
