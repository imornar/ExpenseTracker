(function(){
'use strict';

angular
  .module('expenseTrackerApp')
  .filter('dateFilter',dateFilter)
  .filter('timeFilter',timeFilter)
  .filter('expenseFilter',expenseFilter);

dateFilter.$inject = ['dateService'];
timeFilter.$inject = ['timeService'];
expenseFilter.$inject = ['$filter'];

  function dateFilter(dateService) {
    return function(data, filters) {
      var res=[];
      var dateFrom = dateService.cloneDate(filters.dateFrom);
      var dateTo = dateService.cloneDate(filters.dateTo);
      if(dateFrom) {
        dateFrom.setSeconds(0);
      }
      if(dateTo) {
        dateTo.setSeconds(24*60*60 - 1);
      }
      if (dateFrom && dateTo) {
        for (var i= 0; i< data.length; i++) {
          if(dateService.inRange(data[i].dateTime, dateFrom, dateTo)) {
            res.push(data[i]);
          }
        }
        return res;
      } else if (dateFrom && !dateTo) {
        for (var j= 0; j< data.length; j++) {
          if(dateService.compare(data[j].dateTime, dateFrom) >= 0) {
            res.push(data[j]);
          }
        }
        return res;
      } else if (!dateFrom && dateTo) {
        for (var z= 0; z< data.length; z++) {
          if(dateService.compare(data[z].dateTime, dateTo) <= 0) {
            res.push(data[z]);
          }
        }
        return res;
      }
      else {
        return data;
      }
    }
  }
   function timeFilter(timeService) {
    return function(data, filters) {
      var res=[];
      var timeFrom = filters.timeFrom;
      var timeTo = filters.timeTo;
      if (timeFrom && timeTo) {
        for (var i= 0; i< data.length; i++) {
          if(timeService.inRange(data[i].dateTime, timeFrom, timeTo)) {
            res.push(data[i]);
          }
        }
        return res;
      } else if (timeFrom && !timeTo) {
        for (var j= 0; j< data.length; j++) {
          if(timeService.compare(data[j].dateTime, timeFrom) >= 0) {
            res.push(data[j]);
          }
        }
        return res;
      } else if (!timeFrom && timeTo) {
        for (var z= 0; z< data.length; z++) {
          if(timeService.compare(data[z].dateTime, timeTo) <= 0) {
            res.push(data[z]);
          }
        }
        return res;
      }
      else {
        return data;
      }
    }
  }
  function expenseFilter($filter) {
    return function(data, filters) {
      data = $filter('dateFilter')(data,filters);
      data = $filter('timeFilter')(data,filters);
      return data;
    };
  }

})();
