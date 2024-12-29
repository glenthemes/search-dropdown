/*--------------------------------------------------------
    
    searchbar with custom search suggestions
    - version: 2.2.0 (now supports multiple searchbars)
    - written by HT (@glenthemes)
	
    github.com/glenthemes/search-dropdown
    
--------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {

  let searchDropdownSpeed = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--Search-Suggestions-Expand-Speed").trim()) || 400;

  // <form>
  document.querySelectorAll(".searchblock")?.forEach(searchBlock => {
    if(!searchBlock.matches(".initialized")){
      // <input>
      let searchField = searchBlock.querySelector(".searchbar-field");

      // suggestions box wrapper
      let searchPromptsWrap = searchBlock.querySelector(".search-suggestions-wrapper");

      // suggestions box
      let searchPromptsBox = searchBlock.querySelector(".search-suggestions");

      // the suggestions
      let searchPrompts = searchBlock.querySelectorAll(".search-suggestions a");

      let vars = [searchField, searchPromptsWrap, searchPromptsBox, searchPrompts];
      if(vars.every(x => typeof x === "undefined")) return;

      // wrap search suggestions
      if(!searchPromptsBox.closest(".search-suggestions-inner")){
        let n = document.createElement("div");
        n.classList.add("search-suggestions-inner");
        searchPromptsBox.before(n);
        n.append(searchPromptsBox)
      }

      // keep track of suggestion text & urls
      let txtsArr = [];
      let urlsArr = [];

      searchPrompts?.forEach((prompt,i) => {
        // text, urls
        txtsArr.push(prompt.textContent)
        urlsArr.push(prompt.href)

        // add index no. to prompts
        prompt.setAttribute("index",i+1)
      })

      // keep track of typing activity in <input>
      let fieldVal = "";
      searchField.addEventListener("keyup", e => {
        if(![38,40,27].includes(e.keyCode) || !["ArrowUp","ArrowDown","Escape"].includes(e.key)){
          if(searchField.value.trim() !== ""){
            fieldVal = searchField.value;
          }
        }
      })

      // remove all cases of .hov if there's ever more than 1
      let imposters = [];
      searchPromptsBox.addEventListener("mousemove", () => {
        let allAs = searchPromptsBox.querySelectorAll("a.hov");
        if(allAs.length > 1){
          // push imposters into array
          allAs.forEach((eachHov, i) => {
            if(imposters.length < 2){
              imposters.push(i+1)
            }
          })
  
          // get the last imposter and exterminate them
          let lastImposter = imposters[imposters.length-1];
          allAs.forEach((eachHov, i) => {
            if(i+1 == lastImposter){
              eachHov.classList.remove("hov")
            }
          });
  
          // reset imposters array
          imposters = [];
        }
      })

      // temporarily change sidebar text to the suggestion being hovered
      searchPrompts?.forEach(prompt => {
        prompt.addEventListener("mouseenter", () => {
          let promptTxt = prompt.textContent;
          searchField.value = promptTxt;
          prompt.classList.add("hov")
  
          prompt.addEventListener("mouseleave", () => {
            searchField.value = fieldVal;
            prompt.classList.remove("hov")
          })
        })
      })

      // open the box [1/2]
      let openEvts = ["click","focus"];
      for(let evt of openEvts){
        searchField.addEventListener(evt, () => {
          openSearchBox()
        })
      }
      
      // open the box [2/2]
      let openSearchBox = () => {
        if(!searchField.matches(".is-open")){
          searchField.classList.add("opening")
          searchPromptsWrap.classList.add("wrp-open")
          setTimeout(() => {
            searchField.classList.add("is-open")
            searchField.classList.remove("opening")
          },searchDropdownSpeed)
        }
      }

      // close the box [1/2]
      let closeEvts = ["click","keydown"];
      for(let evt of closeEvts){
        document.addEventListener(evt, (e) => {
          if(evt == "click"){
            if(!e.target.closest(".search-suggestions, .searchbar-button button")){
              closeSearchBox.call(e.target, e)
            }
          } else if(evt == "keydown"){
            if(e.keyCode == 27 || e.key == "Escape"){
              closeSearchBox()
            }
          }
        })
      }

      // close the box [2/2]
      let closeSearchBox = () => {
        if(searchField.matches(".is-open:not(.opening)")){
          searchPrompts.forEach(eachA => {
            eachA.matches(".hov") && eachA.classList.remove("hov")
          })
  
          searchField.value = fieldVal;
          searchPromptsWrap.classList.remove("wrp-open");
  
          setTimeout(() => {
            searchPromptsBox.classList.remove("z-entered");
            searchPromptsBox.classList.remove("disb-hov");
            searchField.classList.remove("is-open");
          },searchDropdownSpeed)
        }
      }

      // arrow keys to navigate the suggestions list
      document.addEventListener("keydown", e => {
        // up or down arrow
        if(e.keyCode == 38 || e.key == "ArrowUp" || e.keyCode == 40 || e.key == "ArrowDown"){
          if(searchField == document.activeElement){
            if(!searchField.matches(".is-open")){
              openSearchBox()
            }
          }

          let aHov = searchPromptsBox.querySelector("a.hov");

          // if suggestions box is open, but nothing is highlighted
          if(aHov == null){
            if(searchField.matches(".is-open")){
              if(searchPromptsBox.querySelector("a.hov") == null){
                // down arrow = hover first item
                if(e.keyCode == 40 || e.key == "ArrowDown"){
                  searchPrompts[0].classList.add("hov")
                }
  
                // up arrow = hover last item
                else if(e.keyCode == 38 || e.key == "ArrowUp"){
                  searchPrompts[searchPrompts.length-1].classList.add("hov")
                }
              }
            }
          }

          else {
            let hovIndex = aHov.getAttribute("index");
  
            searchPrompts.forEach((curOpt, i) => {
              i += 1;
              if(i == hovIndex){
  
                /*------- DOWN ARROW KEY -------*/
                if(e.keyCode == 40 || e.key == "ArrowDown"){
                  // if .next() exists
                  if(curOpt.nextElementSibling !== null){
                    curOpt.classList.remove("hov");
  
                    curOpt.nextElementSibling.classList.add("hov");
                    searchField.value = curOpt.nextElementSibling.textContent;
                  }//end: if .next() exists
  
                  // if reached the bottom,
                  // highlight the top (first)
                  else {
                    if(i == searchPrompts.length){
                      searchPrompts[0].classList.add("hov");
                      curOpt.classList.remove("hov");
                      searchField.value = searchPrompts[0].textContent;
                    }
                  }
                }//end: if down arrow key
  
                /*------- UP ARROW KEY -------*/
                else if(e.keyCode == 38 || e.key == "ArrowUp"){
                  // if .prev() exists
                  if(curOpt.previousElementSibling !== null){
                    curOpt.classList.remove("hov");
  
                    curOpt.previousElementSibling.classList.add("hov");
                    searchField.value = curOpt.previousElementSibling.textContent;
                  }//end: if .next() exists
  
                  // if reached the top,
                  // highlight the bottom (last)
                  else {
                    if(i == 1){
                      searchPrompts[searchPrompts.length-1].classList.add("hov");
                      curOpt.classList.remove("hov");
                      searchField.value = searchPrompts[searchPrompts.length-1].textContent;
                    }
                  }
                }//end: if up arrow key
              }//end: if index matches
            })//end: forEach
          }//end: .hov DOES exist
        }//end: up or down arrow
      })//end: keydown event

      /*------- FORM SUBMIT ACTION -------*/
      // differentiate between:
      // A. dropdown suggestions, e.g. /tagged/
      // B. custom search query in the <input>
      searchBlock.addEventListener("submit", (e) => {
        // A.
        if(txtsArr.includes(searchField.value.trim())){
          let gin = txtsArr.findIndex(uwu => {
            return uwu.includes(searchField.value.trim())
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

      searchBlock.classList.add("initialized")
    }//end: only do stuff if searchblock hasn't yet been initialized
  })//end: searchBlock forEach
})//end DOMcontentLoaded