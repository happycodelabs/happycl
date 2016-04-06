angular.module('socially').directive('partiesList', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/parties/parties-list/parties-list.html',
    controllerAs: 'partiesList',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
      this.mystyle = {
        sheetid: 'My Big Table Sheet',
        headers: true,
        caption: {
          title:'Party List',
          style:'font-size: 50px; color:red;' // Sorry, styles do not works
        },
        style:'background:#fff',
        column: {
          style:'font-size:30px'
        },
        columns: [
         {columnid:'name', title: 'Name', width:300},
          {columnid:'description', title: 'Email', width:300},
          // {columnid:'dob', title: 'Birthday', },s
         
          
        ],
        row: {
          style: function(sheet,row,rowidx){
            return 'background:'+(rowidx%2?'#f9f9f9':'#dddddd');
          }
        },
        rows: {
          4:{cell:{style:'background:blue'}}
        },
        cells: {
          2:{
            2:{
              style: 'font-size:45px;background:pink',
              value: function(value){return value.substr(1,3);}
            }
          }
        }
      }

       
 
      this.newParty = {};
      this.perPage= 2;
      this.page= 1;
      this.sort= {
        name: 1

      };
      this.orderProperty = '1';
      this.subscribe('parties', () => {
        return [
         {
           limit: parseInt(this.perPage),
           skip: parseInt((this.getReactively('page') - 1) * this.perPage),
           sort: this.getReactively('sort')




         }

        ]

});
 
      this.helpers({
        parties: () => {
          return Parties.find({}, {sort: this.getReactively('sort')});
        },

         partiesCount: () => {
          return Counts.get('numberOfParties');
        }

        
      });
 
      this.addParty = () => {
        this.newParty.owner= Meteor.user()._id;
        Parties.insert(this.newParty);
        this.newParty = {};
        
      };
 
      this.removeParty = (party) => {
        Parties.remove({_id: party._id});
      }

      this.exportData = () => {
        alasql('SELECT * INTO XLS("party.xls",?) FROM ?',[this.mystyle, this.parties]);
    }

    this.pageChanged = (newPage) => {

      this.page = newPage;
    };

      this.updateSort = () => {
        this.sort = {
          name: parseInt(this.orderProperty)
        }
      };

      this.sendEmail = () => {
         Email.send({
      to: 'rekha.indu903@gmail.com',
      from: 'rekha.indu903@gmail.com',
      subject: 'New message from contact form',
      text: text
    });


      }


    

    }
  }
});