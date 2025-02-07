// Function to validate YouTube URLs
function validateYouTubeUrl(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    return regex.test(url);
}

// Function to summarize video
async function summarizeVideo() {
    const youtubeUrl = document.getElementById("youtubeUrl").value.trim();
    const summaryOutput = document.getElementById("summaryOutput");
    const errorMessage = document.getElementById("error-message");

    // Clear previous messages
    errorMessage.textContent = "";
    summaryOutput.value = "";

    // Check if the URL is valid
    if (!validateYouTubeUrl(youtubeUrl)) {
        errorMessage.textContent = "Please enter a valid YouTube URL.";
        return;
    }

    summaryOutput.value = "Processing...";

    try {
        const response = await fetch("https://your-backend-url.up.railway.app/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: youtubeUrl })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch summary.");
        }

        const data = await response.json();
        summaryOutput.value = data.summary || "No summary available.";
        
        // Clear error message if successful
        errorMessage.textContent = "";
        
   } catch (error) {
       summaryOutput.value = `Error fetching summary. Please try again later.`;
       console.error(error);
       errorMessage.textContent = error.message; // Optional debug message
   }
}

// Theme toggle functionality
const themeToggleButton = document.getElementById("themeToggle");

themeToggleButton.addEventListener("click", () => {
   const body = document.body;

   // Toggle light-theme class on body
   body.classList.toggle("light-theme");

   // Update button text based on current theme
   if (body.classList.contains("light-theme")) {
       themeToggleButton.textContent = "Switch to Dark Theme";
   } else {
       themeToggleButton.textContent = "Switch to Light Theme";
   }
});
