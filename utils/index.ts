type FilterProps = {};

export async function fetchMovies(filters: FilterProps) {
  const {} = filters;

  const rapidApiKey = process.env.X_RapidAPI_Key;

  if (!rapidApiKey) return null;

  const headers = {
    "X-RapidAPI-Key": rapidApiKey,
    "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
  };

  const response = await fetch(
    `https://moviesdatabase.p.rapidapi.com/titles/x/upcoming`,
    { headers }
  );

  const result = await response.json();

  return result;
}
