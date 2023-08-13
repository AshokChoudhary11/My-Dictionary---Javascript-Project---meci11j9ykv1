function homePage() {
    window.location.href = "index.html";
  }
  document.addEventListener("DOMContentLoaded", function() {
    var cards = localStorage.getItem("cards");
    var cardContainer = document.getElementById("card-container");
    var parsedCards = [];
  
    if (cards) {
      parsedCards = JSON.parse(cards);
      displayCards(parsedCards);
    }
  
    var searchInput = document.getElementById("forsearch");
  
    searchInput.addEventListener("input", function() {
      var searchValue = searchInput.value.toLowerCase();
  
      if (searchValue.trim() === "") {
      
        displayCards(parsedCards);
      } else
      {
        var filteredCards = parsedCards.filter(function(card) {
          return card.word.toLowerCase().includes(searchValue);
        });
        displayCards(filteredCards);
      }
    });
    

    var searchcards=document.getElementById('search3rd');
    searchcards.addEventListener("click", function() {
      var searchValue = searchInput.value.toLowerCase();
  
      if (searchValue.trim() === "") {
        // If search input is empty, display all cards
        displayCards(parsedCards);
      } else {
        // Filter and display cards based on search input
        var filteredCards = parsedCards.filter(function(card) {
          return card.word.toLowerCase().includes(searchValue);
        });
        displayCards(filteredCards);
      }
    });
    
    
  
    function displayCards(cards) {
      cardContainer.innerHTML = "";
  
      cards.forEach(function(card, index) {
        var newDiv = document.createElement('div');
        newDiv.classList.add('card');
        newDiv.style.width = "300px";
        newDiv.style.height = "220px";
        // newDiv.style.backgroundColor = "rgb(169, 169, 169)";
        newDiv.style.color = "black";
        newDiv.style.padding = "10px";
        newDiv.style.position = "relative";
  
        var heading = document.createElement('h2');
        heading.textContent = "WORD: " + card.word;
  
        var details = document.createElement("div");
        details.classList.add("details");
        details.style.padding = "10px";
        details.style.fontFamily = "Verdana";
        details.style.fontSize = "14px";
  
        var paragraph = document.createElement('p');
        paragraph.textContent = card.meaning;
  
        var image = document.createElement('img');
        image.src = 'https://png.pngtree.com/png-vector/20190721/ourmid/pngtree-delete--icon-in-trendy-style-isolated-background-png-image_1565807.jpg';
        image.style.width = "40px";
        image.style.height = "40px";
        image.style.position = "absolute";
        image.style.bottom = "10px";
        image.style.right = "10px";
        image.style.cursor = "pointer";
        image.style.borderRadius = "50%";
  
        image.addEventListener("click", function() {
          parsedCards.splice(index, 1);
          localStorage.setItem("cards", JSON.stringify(parsedCards));
          cardContainer.removeChild(newDiv);
        });
  
        details.appendChild(heading);
        details.appendChild(paragraph);
        details.appendChild(image);
        newDiv.appendChild(details);
        cardContainer.appendChild(newDiv);
      });
    }
  });
  