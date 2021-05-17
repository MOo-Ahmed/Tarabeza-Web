$(document).ready(function () {
    getRestaurantData();
    $('#view_menu').click(function(){
        loadMenu();
    });
});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    return decodeURI(results[1]) || 0;
}

function loadImage(path, target) {
    //$('#restaurant-logo').html('<img class="img-thumbnail" src="' + path + '">');
    document.getElementById('restaurant-logo').src = path ;

}

function loadRestaurantDetails(name, rating, address, contact, from, to){
    $('#rest_rating').html("Rating - " + rating);
    $('#rest_name').html(name);
    $('#rest_name_bread').html(name);
    document.title = name;
    $('#address').html(address);
    $('#phone').html(contact);
    var openAt = from + " AM until " + to + " PM";
    $('#openAt').html(openAt);
}

function getRestaurantData() {
    var id = $.urlParam('id');
    var url = "http://localhost:8585/api/v1/restaurants/" + id;
    $.get(url, function (result) {
        var rating = result.data.restaurant_data[0].rating;
        var name = result.data.restaurant_data[0].name;
        var path = "https://nofipay.net/api/thumb.php?t=l&w=200&h=180&src=" + result.data.restaurant_data[0].logo_url ;
        var target = "#restaurant-logo" ;
        var address = result.data.restaurant_data[0].address;
        var contact = result.data.restaurant_data[0].contact_number;
        var from = result.data.restaurant_data[0].opening_time;
        var to = result.data.restaurant_data[0].closing_time;
        loadImage(path, target);
        loadRestaurantDetails(name, rating, address, contact, from, to);
    });
}

function loadMenu(){
    var id = $.urlParam('id');
    var url = "http://localhost:8585/api/v1/menu/" + id;
    $.get(url, function (result) {
        var items = result.data.items;
        designMenuItems(items);
    });

}

function designMenuItems(items){
    var body = document.getElementById('menu_body');
    var numOfItems = items.length;

    for (var i = 0; i < numOfItems; i++){
        var item = items[i];
        var name = item['name'], price = item['price'], category_name = item['category_name'];
        var div = document.createElement('div');
        div.className = "row mt-2" ;
        div.setAttribute('id','item');

        var div1 = document.createElement('div');
        div1.className = "col-sm-8" ;

        var div2 = document.createElement('div');
        div2.className = "col-sm-4" ;
        
        var Name = document.createElement('h5');
        Name.innerHTML = name ;
        
        var Price = document.createElement('p');
        Price.style = 'text-align:center;';
        Price.innerHTML = '$' + price;

        var CategoryName = document.createElement('p');
        CategoryName.className = 'ml-2';
        CategoryName.style.fontStyle = 'italic' ;
        CategoryName.innerHTML = category_name;

        var selectButton = document.createElement('button');
        selectButton.innerHTML = 'Order this item' ;
        selectButton.className = "btn btn-danger btn-block mb-8 mlsm-4 mrsm-4" ;

        div1.appendChild(Name);
        div1.appendChild(CategoryName);

        div2.appendChild(Price);
        div2.appendChild(selectButton);

        div.appendChild(div1);
        div.appendChild(div2);
        div.style = "border-bottom: 1px solid rgb(200,200,200)" ;
        
        body.appendChild(div);
    }
}