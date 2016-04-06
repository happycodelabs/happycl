angular.module('socially').directive('qualitiesList', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/qualities/qualities-list/qualities-list.html',
    controllerAs: 'qualitiesList',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
 
      this.newQuality = {};
      this.subscribe('qualities');
 
      this.helpers({
        qualities: () => {
          return Qualities.find();
        }
      });
 
      this.addQuality = () => {
        this.newQuality.owner= Meteor.user()._id;
        Qualities.insert(this.newQuality);
        this.newQuality = {};
        
      };
 
      this.removeQuality = (quality) => {
        Qualities.remove({_id: quality._id});
      }
    }
  }
});