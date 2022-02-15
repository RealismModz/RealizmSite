module.exports = async(Discord, client) => {
  console.log(`${client.user.tag} Is Online!`)
	console.log('Starting / Command Handler')
	
	const handler = require('../../handlers/slash_handler');
	await handler.init(client);

	console.log('Started / Command Handler! Starting Express')
	
	/* Api */
	const express = require("express");
	const app = express();
	require("../../api/express.js")(express, app);

	const CurrencySystem = require("currency-system");
      const cs = new CurrencySystem;
	  setTimeout(async () => {
		cs.setItems({
        shop: [{
          name: 'Watch',
          price: 20
        }, {
            name: 'Rolex',
            price: 1230
          }, {
			name: 'Stinky Boot',
			price: 0
		  }, {
			name: 'Lamborghini',
			price: 120000
		  },
		  ]
		  
      })
	   console.log('Shop Set')
	  },250);

	  
}