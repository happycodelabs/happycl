angular.module('socially').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
 
  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>'
    })
    .state('partyDetails', {
      url: '/parties/:partyId',
      template: '<party-details></party-details>'

    })
    .state('qualities',{
         url: '/qualities',
         template: '<qualities-list></qualities-list>'

    })
     .state('qualityDetails', {
      url: '/qualities/:qualityId',
      template: '<quality-details></quality-details>'
    })
     .state('bills', {
        url:'/bills',
        template:'<bill-list></bill-list>'

     })
      .state('files', {
        url:'/files',
        template:'<file-list></file-list>'
      
     })



      
 
  $urlRouterProvider.otherwise("/parties");
});
