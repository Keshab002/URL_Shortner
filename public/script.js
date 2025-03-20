// Event though I am using ejs..
//  A fact to remember is when i use script it is basically the CSR
//  without javascript it is always SSR

// A Point to remember 

// Even though your initial page is server-rendered using EJS, when you use fetch() inside script.js to send a request and handle the response in JavaScript, you are doing Client-Side Rendering (CSR) for the dynamic updates.
// The browser first receives a fully rendered EJS page from the server (SSR ✅).
// But when the user submits a form via JavaScript (fetch API), the request happens without reloading the page (CSR ❌🔄).
// The server responds with JSON, and JavaScript updates the UI dynamically (CSR ✅).

const form = document.querySelector("#url-short-forms")

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:8001/api/url", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.querySelector(".response-text").innerHTML = `The corresponding short url is : http://localhost:8001/api/url/${result.id}`
    document.querySelector(".response-text").style.setProperty("margin-top", "100px", "important");

})