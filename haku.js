
        document.addEventListener("DOMContentLoaded", function() {
            loadItems();
        });

        function loadItems() {
            const storedItems = JSON.parse(localStorage.getItem("ilmoitukset")) || [];
            displayItems(storedItems);
        }

        function filterItems() {
            const searchTerm = document.getElementById("search").value.toLowerCase();
            const category = document.getElementById("category").value;
            const storedItems = JSON.parse(localStorage.getItem("ilmoitukset")) || [];
            
            let filteredItems = storedItems.filter(item => 
                item.title.toLowerCase().includes(searchTerm)
            );

            if (category !== "Kaikki") {
                filteredItems = filteredItems.filter(item => item.category === category);
            }

            displayItems(filteredItems);
        }

        function displayItems(items) {
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML = "";
            
            items.forEach(item => {
                const div = document.createElement("div");
                div.classList.add("item");
                div.innerHTML = `<strong>${item.title}</strong><br><small>${item.category}</small>`;
                resultsContainer.appendChild(div);
            });
        }
