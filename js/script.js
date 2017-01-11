// product model
function Product(name, place, price, weight) {
  this.name = name;
  this.place = place; 
  this.price = price;
  this.weight = weight;
};

Product.prototype.getText = function(){
	return this.name + ' ' + this.place + ' ' + this.price + ' ' + this.weight;
};
//----------------------------------------------------------------------------

// product service
var ProductService = function(){
	var getAllProducts = function(){
  	return [
      new Product("Bread", "section_1", 10, 9),
      new Product("Philadelphia", "shelf_2", 48, 8),
      new Product("Cucumber", "shelf_3", 35, 15),
      new Product("Avocado", "shelf_4", 25, 16),
      new Product("Onion", "shelf_5", 4, 11),
      new Product("Blackberry", "shelf_6", 6, 12),
      new Product("Tomato", "shelf_7", 55, 88),
      new Product("Meat", "shelf_8", 96, 57),
      new Product("Egg", "shelf_9", 3, 7),
      new Product("Banana", "shelf_10", 23, 15),
      new Product("Pepper", "shelf_11", 9, 1),
      new Product("Mushroom", "shelf_12", 42, 4),
      new Product("Broccoli", "shelf_13", 77, 3),
      new Product("Apple", "shelf_14", 5, 5),
      new Product("Strawberry", "shelf_15", 15, 2)
    ];
  };

	return {
  	getAll: getAllProducts
  };
};
//-------------------------------------------------------------------------------


var AppCont = (function(productService){
	var my_var = this;
  my_var.products = [];
  my_var.purchases = [];
  
  var showModal = function(product){
  	my_var.modal.style.display = "block";
    my_var.posiblePurchase = product;
  };
  
  var updateTotalValues = function(){
  	var totalPrice = 0;
    var totalWeight = 0;
    for(var i = 0; i < my_var.purchases.length; i++){
    	totalPrice += my_var.purchases[i].price;
      totalWeight += my_var.purchases[i].weight;
    }
    
    my_var.totalPrice.innerHTML = totalPrice;
    my_var.totalWeight.innerHTML = totalWeight;
  };
  
  var addProductRow = function(tableBody, product, addActionCol){
  	var index = my_var.products.indexOf(product);
    var row = tableBody.insertRow(-1);
    
    var cellName = row.insertCell(-1);
    cellName.innerHTML = product.name;
    
    var cellPlace = row.insertCell(-1);
    cellPlace.innerHTML = product.place;
    
    var cellPrice = row.insertCell(-1);
    cellPrice.innerHTML = product.price;
    
    var cellWeight = row.insertCell(-1);
    cellWeight.innerHTML = product.weight;
    if(addActionCol){
    	var buyBtn = document.createElement("button");
      buyBtn.id = index;
      buyBtn.innerHTML = "Buy";
      buyBtn.addEventListener("click", function(event){
        var productIndex = event.target.id;
        showModal(my_var.products[productIndex]);
      });

      var cellBuy = row.insertCell(-1);
      cellBuy.appendChild(buyBtn);
    }
  };
  
  var updateTableView = function(tableBody, products, addActionCol){
  	tableBody.innerHTML = '';
    for(var i = 0; i < products.length; i++){
    	addProductRow(tableBody, products[i], addActionCol);
    }
  };
  
  var setProducts = function(products){
  	my_var.products = products;
    updateTableView(my_var.result, my_var.products, true);
  };
  
  var findProducts = function(searchQuery){
  	if(!searchQuery){ return my_var.products; }
		var result = [];
    searchQuery = searchQuery.toLowerCase();
    for(var i = 0; i < my_var.products.length; i++){
    	if(my_var.products[i].name.toLowerCase().indexOf(searchQuery) !== -1){
      	result.push(my_var.products[i]);
      }
    }
    return result;
  };
	
  //event handlers
	var searchQueryChanged = function(event){
  	var searchQuery = my_var.searchQuery.value;
    var products = findProducts(searchQuery);
    if(!products.length){
    	my_var.result.innerHTML = '<td colspan="4">Sorry, there are no such product :(</td>';
    } else {
    	updateTableView(my_var.result, products, true);
    }
  };
  
  var closeModal = function(){
  	my_var.modal.style.display = "none";
    my_var.posiblePurchase = null;
  };
  
  var confirmPurchase = function(){
  	if(my_var.modalUserMoney.value < my_var.posiblePurchase.price){
    	alert("Sorry, you have not enough money.");
      return;
    }
    
    my_var.purchases.push(my_var.posiblePurchase);
    updateTableView(my_var.userPurchases, my_var.purchases, false);
    updateTotalValues();
    closeModal();
  };

	
  var AppCont = function(){
  	my_var.searchQueryInput = document.getElementById('searchQuery');
  	//my_var.findBtn = document.getElementById('findBtn');
    my_var.result = document.getElementById('searchResult');
    my_var.userPurchases = document.getElementById('userPurchases');
    my_var.totalPrice = document.getElementById('totalPrice');
    my_var.totalWeight = document.getElementById('totalWeight');
		//modal
    my_var.modal = document.getElementById('modal');
    my_var.modalOkBtn = document.getElementById('modalOk');
    my_var.modalUserMoney = document.getElementById('userMoney');
    my_var.modalClose = document.getElementsByClassName("close")[0];
    
    my_var.searchQueryInput.addEventListener("input", searchQueryChanged);
    //my_var.findBtn.addEventListener("click", searchQueryChanged);
    my_var.modalOkBtn.addEventListener("click", confirmPurchase);
    my_var.modalClose.addEventListener("click", closeModal);
    
    setProducts(productService.getAll());
  };
  return AppCont;
})(new ProductService());
//-------------------------------------------------------------------------------

var app = new AppCont();



