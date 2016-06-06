module.exports = function(app) {
  
  
  app.dataSources.mongoSnack.automigrate(['snackType', 'snack', 'payment'], function(err){
    if(err) throw err;
        
    app.models.snackType.create([
      { Name: 'Snickers' },
      { Name: 'Mars' }
      ], function(err, types){
        if(err) throw err;
        
        console.log('SnackTypes created:\n', types);
        
        app.models.snack.create([
            {Quantity: 1, PricePerUnit: 0.8, Date: '2016-05-01', SnackTypeId: types[0].id},
            {Quantity: 1, PricePerUnit: 0.8, Date: '2016-05-01', SnackTypeId: types[1].id}
          ], function(err, snacks) {
            if (err) throw err;
       
            console.log('Models created: \n', snacks);
          });
        
        
      });
      
      
      app.models.payment.create([
      { Date: '2016-05-04', Amount: 2}
      ], function(err, payments){
        
        if(err) throw err;
        console.log('Payments created: \n', payments);
      });
  });
};