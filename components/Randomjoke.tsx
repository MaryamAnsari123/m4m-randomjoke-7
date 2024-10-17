"use client"; // Enables client-side rendering for this component

// Import necessary hooks from React
import { useState, useEffect } from "react";

// Import custom Button component from the UI directory
import { Button } from "@/components/ui/button";

// Define a TypeScript interface for the joke response
interface JokeResponse {
  setup: string;
  punchline: string;
}

// Default export of the RandomJokeComponent function
export default function RandomJoke() {
  // State hook for managing the current joke
  const [joke, setJoke] = useState<string>("");

  // Effect hook to fetch a joke when the component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array ensures this runs once on mount

  // Async function to fetch a random joke from the API
  async function fetchJoke(): Promise<void> {
    try {
      // Make a GET request to the joke API
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data: JokeResponse = await response.json();
      // Update state with the fetched joke
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error); // Log any errors
      // Set an error message if the fetch fails
      setJoke("Failed to fetch joke. Please try again.");
    }
  }

  // JSX return statement rendering the random joke UI
  return (
    <div className="flex align-center flex-col items-center justify-center h-screen bg-[url('/img/e1.jpg')] p-4 bg-cover">
      {/* Center the joke card within the screen */}
      <div className="bg-gradient-to-br from-[#a758b9] to-[#e3901af7] rounded-full shadow-lg p-16 w-full max-w-md">
        {/* Header with title */}
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">
          <u>Random Joke</u>&#128526;&#128514;
        </h1>
        {/* Display the joke or a loading message */}
        <div className="bg-amber-100 rounded-lg p-7 mb-7 text-black text-lg">
          {joke || "Loading..."}
        </div>
        {/* Button to fetch a new joke */}
        <Button
          onClick={fetchJoke}
          className="bg-[#4caf50] hover:bg-[#77c4ba] text-white font-bold p-4 rounded-full transition-colors ml-20 duration-300"
        >
          Get New Joke &#129313;
        </Button>
      </div>
    </div>
  );
}