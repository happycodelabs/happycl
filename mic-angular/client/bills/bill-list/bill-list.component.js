angular.module('socially').directive('billList', function () {
  return {
    restrict: 'E',
    templateUrl: 'client/bills/bill-list/bill-list.html',
    controllerAs: 'billList',
    controller: function ($scope, $reactive) {
      $reactive(this).attach($scope);
 
      this.newBill = {};
        this.subscribe('bills');
      this.subscribe('parties');
       this.subscribe('qualities');
 
      this.helpers({
        bills: () => {
          return Bills.find({});
        },
        parties: () => {
           
           return Parties.find();
        },
        quality : () => {
          return Qualities.find();
        }
      });
 
      this.addBill = () => {
        this.newBill.owner= Meteor.user()._id;
        Bills.insert(this.newBill);
        this.newBill = {};
        
      }
      this.getWht = () => {
      
        var x=this.newBill.bags;
       
        this.newBill.wht= x * 50;
        
      }
      this.getTotal = () => {
        var w = this.newBill.wht;
        var r = this.newBill.rate;
        var k = this.newBill.kuli;
        this.newBill.total= (w * r) + parseInt(k);


      }
      this.getDiff = () => {

        var t= this.newBill.total;
        var b= this.newBill.bill;
        this.newBill.diff= t - b;
      }
 
      this.removeBill = (bill) => {
        Bills.remove({_id: bill._id});
      }
    }
  }
});