document.addEventListener("DOMContentLoaded", function() {
    var search = document.getElementById("enter");
    const input = document.getElementById("address");
    input.value = '';

    // Event listener for the click event on the "Search" button
    search.addEventListener("click", function() {
        handleSearch();
    });

    // Event listener for the keydown event on the input field
    input.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    });

    function handleSearch() {
        const text = input.value;
    
        const ipRegex = /^(((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4})$/;
    
        if (ipRegex.test(text)) {
            window.location.replace("/result?ip_address=" + text);
        } else {
            alert("Invalid IP Address. Please enter a valid IP address.");
            input.value = '';
        }
    }
    
});
