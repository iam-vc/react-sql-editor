export const mockData = () => Array.from({ length: 1000 }, () => ({
  id: Math.floor(Math.random() * 10000),
  name: `User ${Math.floor(Math.random() * 10000)}`,
  age: Math.floor(Math.random() * 60) + 18,
  country: Math.random() > 0.5 ? "USA" : "India",
}));
  
export const mockColumns = ["id", "name", "age", "country"];

export const fetchMockData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData());
    }, 1000); // Simulates a 1-second delay
  });
};