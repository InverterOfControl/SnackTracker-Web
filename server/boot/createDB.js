module.exports = function(app) {
  app.dataSources.snackdb.automigrate('snack', function(err) {
    if (err) throw err;
 
    app.models.snack.create([
      {Name: 'Snickers', Quantity: 1, PricePerUnit: 0.8, Date: '2016-05-01'},
      {Name: 'Mars', Quantity: 1, PricePerUnit: 0.8, Date: '2016-05-01'}
    ], function(err, snacks) {
      if (err) throw err;
 
      console.log('Models created: \n', snacks);
    });
  });
};