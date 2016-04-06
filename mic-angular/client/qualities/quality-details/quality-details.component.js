angular.module('socially').directive('qualityDetails', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/qualities/quality-details/quality-details.html',
    controllerAs: 'qualityDetails',
    controller: function ($scope, $stateParams, $reactive) {
      $reactive(this).attach($scope);
      this.subscribe('qualities');
 
      this.helpers({
        quality: () => {
          return Qualities.findOne({_id: $stateParams.qualityId});
        }
      });
 
      this.save = () => {
        Qualities.update({_id: $stateParams.qualityId}, {
          $set: {
            name: this.quality.name,
            description: this.quality.nick
          }
        }, (error) => {
          if (error) {
            console.log('Oops, unable to update the party...');
          }
          else {
            console.log('Done!');
          }
        });
      };
    }
  }
});