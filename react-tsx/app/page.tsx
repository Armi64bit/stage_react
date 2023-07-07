import React from 'react';

export default async function Home() {
  const getGames = async () => {
    // const response = await axios.get(`https://api.rawg.io/api/games`);
    const response = await fetch(`https://api.rawg.io/api/games`);
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    return data;
  };

  try {
    const games = await getGames();
    console.log(games);
  } catch (error) {
    console.error(error);
  }

  return (
    <main>
      <h1>hello</h1>
    </main>
  );
}
