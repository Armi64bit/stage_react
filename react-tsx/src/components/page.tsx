import React, { useEffect } from "react";

const getGames = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

const Home: React.FC = () => {
  useEffect(() => {
    const fetchData = async () => {
      console.log("Before fetching games"); // Add this line

      try {
        const games = await getGames();
        console.log(games);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>hello</h1>
    </main>
  );
};

export default Home;
