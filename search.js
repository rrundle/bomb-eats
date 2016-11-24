var businesses = [
  { name: "Ruth Chris",
    address: "2961 Michelson Dr #A, Irvine, CA 92612",
    price: "$$$$",
    distance: "6.9 mi",
    phone: "(949)252-8848",
    rating: "rating: 4",
    review: "Butter on the steak!"},

  { name: "Mastro's Steakhouse",
    address: "633 Anton Blvd, Costa Mesa, CA 92626",
    price: "$$$$",
    distance: "5.2 mi",
    phone: "(714) 546-7405",
    rating: "rating: 4",
    review: "Great food, poor service."},

  { name: "Roy's Hawaiian Fusion",
    address: "453 Newport Center Dr, Newport Beach, CA 92660",
    price: "$$$$",
    distance: "5.7mi",
    phone: "(949) 640-7697",
    rating: "rating: 4",
    review: "My favorite place! Lobster potstickers...hello heaven!"},

  { name: "Cafe Rio",
    address: "253 17th St, Costa Mesa, CA 92627",
    price: "$",
    distance: "0.7 mi",
    phone: "(949) 335-6800",
    rating: "rating: 3",
    review: "Is there even an interview here?"},

  { name: "Pitfire Artisan Pizza",
    address: "4353 E 17th St, Costa Mesa, CA 92627",
    price: "$$",
    distance: "1.2 mi",
    phone: "(949) 313-6333",
    rating: "rating: 4",
    review: "Yum. Yum. Yum. Yum"},

  { name: "Avila's El Ranchito",
    address: "2101 Placentia Ave, Costa Mesa, CA 92627",
    price: "$$",
    distance: "0.4 mi",
    phone: "(949) 642-1142",
    rating: "rating: 4",
    review: "Bomb old school mexican. I think the whole family works there." },

  { name: "McDonald's",
    address: "2300 Harbor Blvd, Costa Mesa, CA 92626",
    price: "$",
    distance: "2.3 mi",
    phone: "(949) 631-1943",
    rating: "rating: 2",
    review: "There's homeless people outside, stick to the drive-thru."}
]

//disabling searching by zipcode
var zipSearch = document.getElementById("location");
zipSearch.setAttribute("disabled", true);

//loading each object in the businesses array on the search page
//puting it inside a new div called business
for (var i = 0; i < businesses.length; i++) {
  var business = document.createElement("div");
  business.setAttribute("id", "business");

  var businessName = document.createElement("span");
  businessName.setAttribute("id", "name");
  businessName.textContent = businesses[i].name;
  business.appendChild(businessName);

  var rating = document.createElement("span");
  rating.setAttribute("id", "rating");
  rating.textContent = businesses[i].rating;
  business.appendChild(rating);

  var distance = document.createElement("span");
  distance.setAttribute("id", "distance");
  distance.textContent = businesses[i].distance;
  business.appendChild(distance);

  var price = document.createElement("span");
  price.setAttribute("id", "price");
  price.textContent = businesses[i].price;
  business.appendChild(price);

  var address = document.createElement("div");
  address.setAttribute("id", "address");
  address.setAttribute("class", "contact");
  address.textContent = businesses[i].address;
  business.appendChild(address);

  var phone = document.createElement("div");
  phone.setAttribute("id", "phone");
  phone.setAttribute("class", "contact");
  phone.textContent = businesses[i].phone;
  business.appendChild(phone);

  var review = document.createElement("div");
  review.setAttribute("id", "review");
  review.textContent = businesses[i].review;
  business.appendChild(review);

  var list = document.getElementById("list");
  list.appendChild(business);
}

//begin search code
//declare variables that refence DOM elements
var spots = document.getElementById("list");
var term = document.getElementById("biz-search");
var search = document.getElementById("search");
var zip = document.getElementById("zip").textContent;
var changeZipDisplay = document.getElementById("results");

//function to clear the list div when search submit button is fired
function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

//declaring function to search for matching text
function searchItems (allItems, theSearch) {
  var matchingItems = [];
  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];
    var itemText = item.name + item.address + item.phone + item.rating + item.price + item.review + item.distance;
    var isMatch = itemText.toLowerCase().indexOf(theSearch.toLowerCase()) > -1;
    if (isMatch) {
      matchingItems.push(item);
    }
  }
  return matchingItems;
}

//declaring function for capturing search input on search button click, clearing the list div,
//appending item to spots div
function listener () {
  empty(spots);
  var theSearch = term.value;
  if (!theSearch.trim()) return;
  var matchingItems = searchItems (businesses, theSearch);
  if (matchingItems.length === 0) {
    var noMatch = document.createElement("div");
    noMatch.setAttribute("id", "no-match");
    noMatch.textContent = "No results found.";
    spots.appendChild(noMatch);
  }
  for (var i = 0; i < matchingItems.length; i++) {
    var item = renderItem (matchingItems[i]);
    spots.appendChild(item);
    }
  term.select();

  //changing the results list title when submit is fired
  function checkSearch () {
    changeZipDisplay.textContent = "Search results for " + "'" + theSearch + "'" + " in " + zip;
  }
  checkSearch();
}

//setting up listeners for listener function
search.addEventListener("click", listener);

//listener for the enter button
term.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { // 13 is enter
      listener();
    }
  })
term.select();

//assigning ids and classes to all search results
//then appending then to the DOM
function renderItem(item) {

  var biz = document.createElement("div");
  biz.setAttribute("id", "business");

  var businessName = document.createElement("span");
  businessName.setAttribute("id", "name");
  businessName.textContent = item.name;
  biz.appendChild(businessName);

  var rating = document.createElement("span");
  rating.setAttribute("id", "rating");
  rating.textContent = item.rating;
  biz.appendChild(rating);

  var distance = document.createElement("span");
  distance.setAttribute("id", "distance");
  distance.textContent = item.distance;
  biz.appendChild(distance);

  var price = document.createElement("span");
  price.setAttribute("id", "price");
  price.textContent = item.price;
  biz.appendChild(price);

  var address = document.createElement("div");
  address.setAttribute("id", "address");
  address.textContent = item.address;
  biz.appendChild(address);

  var phone = document.createElement("div");
  phone.setAttribute("id", "phone");
  phone.textContent = item.phone;
  biz.appendChild(phone);

  var review = document.createElement("div");
  review.setAttribute("id", "review");
  review.textContent = item.review;
  biz.appendChild(review);

  return biz;
}