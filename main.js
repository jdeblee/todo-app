//link this to every html page
//declaring global variables
var one = '6.jpg';
var six = '6of6.jpg';
var twelve = '6of12.jpg';
var emptyaf = 'brownlogo.png';

var oneprice = '4.00';
var sixprice = '20.00'; 
var twelveprice = '40.00';

var goodbye = '<img src="x.png" alt="delete" style="width:12px;height:12px"/>';

var secondFlavor = '<select> <option value="second flavor?">Second Flavor?</option><option value="Maple Apple Pecan">Maple Apple Pecan</option><option value="Bacon">Bacon</option><option value="Walnut">Walnut</option><option value="Lemon Lavender">Lemon Lavender</option><option value="Cranberry">Cranberry</option><option value="Original(Gluten-free)">Original(Gluten-free)</option><option value="Original(Vegan)">Original(Vegan)</option><option value="Caramel Pecan">Caramel Pecan</option><option value="Old Fashioned Buttermilk">Old Fashioned Buttermilk</option><option value="Blackberry">Blackberry</option><option value="Birthday Cake">Birthday Cake</option><option value="Pumpkin Spice">Pumpkin Spice</option><option value="Carrot Cake">Carrot Cake</option><option value="Strawberry Rhubarb">Strawberry Rhubarb</option></select>';
var thirdFlavor = '<select> <option value="second flavor?">Third Flavor?</option><option value="Maple Apple Pecan">Maple Apple Pecan</option><option value="Bacon">Bacon</option><option value="Walnut">Walnut</option><option value="Lemon Lavender">Lemon Lavender</option><option value="Cranberry">Cranberry</option><option value="Original(Gluten-free)">Original(Gluten-free)</option><option value="Original(Vegan)">Original(Vegan)</option><option value="Caramel Pecan">Caramel Pecan</option><option value="Old Fashioned Buttermilk">Old Fashioned Buttermilk</option><option value="Blackberry">Blackberry</option><option value="Birthday Cake">Birthday Cake</option><option value="Pumpkin Spice">Pumpkin Spice</option><option value="Carrot Cake">Carrot Cake</option><option value="Strawberry Rhubarb">Strawberry Rhubarb</option></select>';



//making everything in html css load before javascript runs

$(document).ready(function(){

	$(document).on("click", ".goodbye", function() {
		window.location.reload(true);
		var item = $(this).data("item");
		var storedArray = localStorage.getItem("getArray");
		var notArraystring = JSON.parse(storedArray);	
		localStorage.removeItem("getArray");
		$('.flavorname').empty();
		$('.flavorname').append("flavorless");
		$('#goodbye').empty();
		$('.pay').empty();
		$('.pay').append("--");
		$('.finalprice').empty();
		$('.finalprice').append("zero dollars, zero sense");
		$('.finalamount').empty();
		$('.finalamount').append("nothing yet!");
		$('.productpreview').attr('src', emptyaf);
	});


	//creating a function and arrays to store Cinnabun parameters/properties
	function Cinnabun(amount, price, img) {
		this.amount = amount;
		this.price = price;
		this.img = img;
	}
	var cinnabuns = [new Cinnabun("1-pack", oneprice, one), new Cinnabun("6-pack", sixprice, six), new Cinnabun("12-pack", twelveprice, twelve)];
	var wantThis = cinnabuns[0];
	var cinnaCart = [];

	//if statements to change the page with respected properties when user chooses a new pack amount
	$(".select-style").change(function() {
		 if ($(".select-style option:selected").text() == "1-pack") {
		 	$('.testimg').attr('src', one);
		 	$('.price').empty();
		 	$('.price').append(oneprice);
		 	wantThis = cinnabuns[0];

		 } else if ($(".select-style option:selected").text() == "6-pack") {
		 	$('.testimg').attr('src', six);
		 	$('.price').empty();
		 	$('.price').append(sixprice);
		 	//adding more options
		 	$('.quantity').append(secondFlavor);
		 	$('.quantity').append("<br>");
		 	$('.quantity').append(thirdFlavor);
		 	wantThis = cinnabuns[1];

		 } else if ($(".select-style option:selected").text() == "12-pack") {
		 	$('.testimg').attr('src', twelve);
		 	$('.price').empty();
		 	$('.price').append(twelveprice);
		 	//adding more options
		 	$('.quantity').append(secondFlavor);
		 	$('.quantity').append("<br>");
		 	$('.quantity').append(thirdFlavor);
		 	wantThis = cinnabuns[2];
		 }
	});

	//if user clicks on add to cart, store what's on the page
	$( ".caart" ).mousedown(function() {
		localStorage.setItem("getIt", JSON.stringify(wantThis));
		//storing one item
		var storedItem = localStorage.getItem("getIt");
		var notString = JSON.parse(storedItem);	
		cinnaCart.push(new Cinnabun(notString.amount, notString.price, notString.img));
		//storing an entire array
		localStorage.setItem("getArray", JSON.stringify(cinnaCart));
		var storedArray = localStorage.getItem("getArray");
		var notArraystring = JSON.parse(storedArray);
		alert("added to cart!");
	});

	$(".cartlist").append(function(){
		//re-declaring variables onto the next page
		var storedItem = localStorage.getItem("getIt");
		var notString = JSON.parse(storedItem);
		cinnaCart.push(new Cinnabun(notString.amount, notString.price, notString.img));
		//re-declaring variables onto the next page
		var storedArray = localStorage.getItem("getArray");
		var notArraystring = JSON.parse(storedArray);
		//below is a variable to store all the price information
		var totalPrice = 0.0;

		//for loop to display the correct items of whatever is stored in the cart
		for (i=0; i <= notArraystring.length; i++) {
		//if chosen item is a one-pack
		if (notArraystring[i].price == cinnabuns[0].price) {
			//if item is first in the array, clear the page
			if (notArraystring[i] == 0){
				$('.flavorname').empty();
				$('.finalprice').empty();
				$('.finalamount').empty();
				$('.productpreview').empty();
				$('.goodbye').empty();
			};
			//if not, just keep adding rows depending on how many items are in the array
			$('.flavorname').append("<tr>"); 
			$('.flavorname').append("Original"); 
			$('.goodbye').append("<tr>");
			$('.goodbye').append(goodbye);
			$('.finalprice').append("<tr>");
			$('.finalprice').append(cinnabuns[0].price);
			$('.finalamount').append("<tr>");
			$('.finalamount').append(cinnabuns[0].amount);
			$('.productpreview').append("<br>");
			$('.productpreview').attr('src', one);
			totalPrice = totalPrice + parseFloat(cinnabuns[0].price);
			$('.pay').html("$"+totalPrice);

		} else if (notArraystring[i].price == cinnabuns[1].price) {
			//if chosen item is a six-pack
			if (notArraystring[i] == 0){
				$('.flavorname').empty();
				$('.finalprice').empty();
				$('.finalamount').empty();
				$('.productpreview').empty();
				$('.goodbye').empty();
			};	
			$('.flavorname').append("<tr>"); 
			$('.flavorname').append("Original");
			$('.goodbye').append("<tr>");
			$('.goodbye').append(goodbye);
			$('.finalprice').append("<tr>");
			$('.finalprice').append(cinnabuns[1].price);
			$('.finalamount').append("<tr>");
			$('.finalamount').append(cinnabuns[1].amount);
			$('.productpreview').append("<br>");
			$('.productpreview').attr('src', six);
			totalPrice = totalPrice + parseFloat(cinnabuns[1].price);
			$('.pay').html("$"+totalPrice);
			console.log("m");		

		} else if (notArraystring[i].price == cinnabuns[2].price) {
			//if chosen item is a twelve-pack
			if (notArraystring[i] == 0){
				$('.flavorname').empty();
				$('.finalprice').empty();
				$('.finalamount').empty();
				$('.productpreview').empty();
				$('.goodbye').empty();
			};	
			$('.flavorname').append("<tr>"); 
			$('.flavorname').append("Original");
			$('.goodbye').append("<tr>");
			$('.goodbye').append(goodbye);
			$('.finalprice').append("<tr>");
			$('.finalprice').append(cinnabuns[2].price);
			$('.finalamount').append("<tr>");		
			$('.finalamount').append(cinnabuns[2].amount);
			$('.productpreview').append("<br>");		
			$('.productpreview').attr('src', twelve);
			totalPrice = totalPrice + parseFloat(cinnabuns[2].price);
			$('.pay').html("$"+totalPrice);
			console.log("l");	

		} else {
			//if cart is empty
			$('.flavorname').empty();
			$('.flavorname').append("flavorless");
			$('.goodbye').empty();
			$('.pay').empty();
			$('.pay').append("--");
			$('.finalprice').empty();
			$('.finalprice').append("zero dollars, zero sense");
			$('.finalamount').empty();
			$('.finalamount').append("nothing yet!");
			$('.productpreview').append("<br>");
			$('.productpreview').attr('src', emptyaf);
			console.log("sorry dude");
		};

		};
	});

});
