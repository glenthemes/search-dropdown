/*----------------------------------------------
    
    searchbar with custom search suggestions
    - written by HT (@glenthemes)
	
    github.com/glenthemes/search-dropdown
    
----------------------------------------------*/

document.addEventListener("DOMContentLoaded",() => {

let llvlq = Date.now();
let nvtwq = 3000;

let srchSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Search-Suggestions-Expand-Speed").trim());

// <form>
let srchForm = document.querySelector(".searchblock");

// <input>
let srchField = document.querySelector(".searchbar-field");

// <button>
let srchBtn = document.querySelector(".searchbar-button button");

// suggestions box wrapper
let srchSgstnsWrap = document.querySelector(".search-suggestions-wrapper");

// suggestions box
let srchSgstns = document.querySelector(".search-suggestions");

// the suggestions
let srchItems = document.querySelectorAll(".search-suggestions a");

// submit btn
let srchSubmit = srchForm.querySelector("button[type='submit']")

/*----- KEEP TRACK OF SUGGESTION TEXT & URLS -----*/
let txtsArr = [];
let urlsArr = [];

srchItems.forEach(eachItem => {
	txtsArr.push(eachItem.textContent)
	urlsArr.push(eachItem.href)
})

/*----- ADD INDEX NO. TO ITEMS -----*/
srchSgstns.querySelectorAll("a").forEach((wymqj,i) => {
	i += 1;
	wymqj.setAttribute("index",i);
})

/*----- SEARCH SUGGESTIONS HEIGHT -----*/
let lpyxg = setInterval(() => {
	if(Date.now() - llvlq > nvtwq){
		clearInterval(lpyxg);
	} else {
		if(srchSgstns.offsetHeight > 0){
			clearInterval(lpyxg);
			srchSgstns.style.setProperty("--Search-Suggestions-Height",srchSgstns.offsetHeight + "px");
			// console.log(srchSgstns.offsetHeight)
		}
	}
},0);

function hrqnc(){
	if(srchSgstns.offsetHeight > 0){
		srchSgstns.style.setProperty("--Search-Suggestions-Height",srchSgstns.offsetHeight + "px");
		// console.log(srchSgstns.offsetHeight)
	}
}

window.addEventListener("load", () => {
	hrqnc();
})

window.addEventListener("resize", () => {
	hrqnc();
})

/*----- KEEP TRACK OF TYPING IN <INPUT> -----*/
let srchFieldVal = "";
srchField.addEventListener("keyup", (e) => {
	if(![38,40,27].includes(e.keyCode)){
		if(srchField.value.trim() !== ""){
			srchFieldVal = srchField.value;
		}		
	}	
})

// remove all cases of .hov if there's ever more than 1
let imposters = [];
srchSgstns.addEventListener("mousemove", () => {
	let allAs = srchSgstns.querySelectorAll("a.hov");
	if(allAs.length > 1){
		// push imposters into array
		allAs.forEach((eachHov, i) => {
			i += 1;
			if(imposters.length < 2){
				imposters.push(i)
			}			
		})
		
		// get the last imposter and exterminate them
		let lastImposter = imposters[imposters.length-1];
		allAs.forEach((eachHov, i) => {
			i += 1;
			if(i == lastImposter){
				eachHov.classList.remove("hov")
			}
		});
		
		// reset imposters array
		imposters = [];
	}	
});

// temporarily change sidebar text to the suggestion that's currently hovered
srchItems.forEach(senre => {
	senre.addEventListener("mouseenter", () => {
		let senreTxt = senre.textContent;
		srchField.value = senreTxt;
		senre.classList.add("hov")
		
		
		senre.addEventListener("mouseleave", () => {
			srchField.value = srchFieldVal;
			senre.classList.remove("hov")
		});
	})
})

/*-------------------------------------------*/

// open the box [1/2]
srchField.addEventListener("click", () => {
	openSrchBox()
});

srchField.addEventListener("focus", () => {
	openSrchBox()
});

// open the box [2/2]
function openSrchBox(){
	if(!srchField.matches(".is-open")){
		srchSgstnsWrap.style.display = "block";
		srchSgstnsWrap.style.visibility = "visible";
		srchSgstnsWrap.classList.add("wrp-open");
		
		srchSgstns.style.height = 0;
		setTimeout(() => {
			srchSgstns.classList.add("expand")
		},0);
		
		setTimeout(() => {
			srchField.classList.add("is-open");
		},srchSpeed)
	}
}

/*-------------------------------------------*/

// close the box [1/2]
document.addEventListener("click", (e) => {
	if(!e.target.closest(".search-suggestions, .searchbar-button button")){
		closeSrchBox.call(e.target, e);
	}
});

document.addEventListener("keydown", (e) => {
	if(e.keyCode == 27){
		closeSrchBox()
	}
})

// close the box [2/2]
function closeSrchBox(){
	if(srchField.matches(".is-open")){
		srchItems.forEach(eachA => {
			if(eachA.matches(".hov")){
				eachA.classList.remove("hov")
			}
		})
		
		srchField.value = srchFieldVal;
		srchSgstns.classList.remove("expand");

		setTimeout(() => {
			srchSgstns.style.height = 0;
			srchSgstnsWrap.style.display = "";
			srchSgstnsWrap.style.visibility = "";
			srchField.classList.remove("is-open");
			
			srchSgstns.classList.remove("z-entered");
			srchSgstns.classList.remove("disb-hov")
		},srchSpeed)
	}
}

/*-------------------------------------------*/

// arrow keys to navigate the suggestions list
document.addEventListener("keydown", (e) => {
	// if key pressed was up or down arrow
	if(e.keyCode == 40 || e.keyCode == 38){
		if(srchField == document.activeElement){
			if(!srchField.matches(".is-open")){
				openSrchBox()
			}
		}		
		
		let aHov = srchSgstns.querySelector("a.hov");
		
		// ifsuggestions box is open,
		// but nothing has been highlighted
		if(aHov == null){
			if(srchField.matches(".is-open")){
				if(srchSgstns.querySelector("a.hov") == null){
					// down arrow = hover first item
					if(e.keyCode == 40){
						srchItems[0].classList.add("hov")
					}
					
					// up arrow = hover last item
					else if(e.keyCode == 38){
						srchItems[srchItems.length-1].classList.add("hov")
					}
					
				}
			}
		}
		
		// if something HAS been hovered
		else {
			let hovIndex = aHov.getAttribute("index");
			
			srchItems.forEach((curOpt, i) => {
				i += 1;
				if(i == hovIndex){
					
					/*------- DOWN ARROW KEY -------*/
					if(e.keyCode == 40){
						// if .next() exists
						if(curOpt.nextElementSibling !== null){
							curOpt.classList.remove("hov");


							curOpt.nextElementSibling.classList.add("hov");
							srchField.value = curOpt.nextElementSibling.textContent;

						}//end: if .next() exists
						
						// if reached the bottom,
						// highlight the top (first)
						else {
							if(i == srchItems.length){
								srchItems[0].classList.add("hov");
								curOpt.classList.remove("hov");
								srchField.value = srchItems[0].textContent;
							}
						}
					}//end: if down arrow key
					
					/*------- UP ARROW KEY -------*/
					else if(e.keyCode == 38){
						// if .prev() exists
						if(curOpt.previousElementSibling !== null){
							curOpt.classList.remove("hov");


							curOpt.previousElementSibling.classList.add("hov");
							srchField.value = curOpt.previousElementSibling.textContent;

						}//end: if .next() exists
						
						// if reached the bottom,
						// highlight the top (first)
						else {
							if(i == 1){
								srchItems[srchItems.length-1].classList.add("hov");
								curOpt.classList.remove("hov");
								srchField.value = srchItems[srchItems.length-1].textContent;
							}
						}
					}//end: if up arrow key
				}//end: if index matches
			})//end: forEach
		}//end: .hov DOES exist
	}//end: if down key or up key
})//end keydown event


/*------- FORM SUBMIT ACTION -------*/
// differentiate between:
// A. dropdown suggestions, e.g. /tagged/
// B. custom search query in the <input>
srchForm.addEventListener("submit", (e) => {
	// A.
	if(txtsArr.includes(srchField.value.trim())){
		let gin = txtsArr.findIndex(uwu => {
			return uwu.includes(srchField.value.trim())
		})
		
		e.preventDefault();
		//alert(urlsArr[gin])
		window.location.href = urlsArr[gin];
	}
	
	// B.
	else {
		// normal submit
	}
})

});//end DOMcontentloaded
