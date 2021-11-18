const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const discount = function(price, discount){
	return toThousand(price - (discount * price /100).toFixed(0)) 
} 

const controller = {
	index: (req, res) => {
		return res.render('index', {
			visited : products.filter(product => product.category === "visited"), 
			inSale : products.filter(product => product.category === "in-sale"),
			toThousand,
			discount
		})
	},
	search: (req, res) => {
		if(req.query.keywords.trim() != ""){
		let result = products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase().trim()))
		return res.render('results',{
            result,
            products,
            busqueda : req.query.keywords.trim(),
			toThousand,
			discount
        })	
		}else{
			res.redirect('/')
		}
	},
};

module.exports = controller;
