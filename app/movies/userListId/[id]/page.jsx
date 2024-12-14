// import { notFound, redirect } from "next/navigation";

// // Mocked function to simulate fetching the list from a backend (or `localStorage`)
// async function fetchFinalizedList(listId) {
//   if (typeof window !== "undefined") {
//     throw new Error("This function must run on the server side.");
//   }

//   // Simulate fetching list from a "mocked" database (replace this with real backend call)
//   const mockLocalStorage = {
//     abc123: [
//       { title: "Dune Part 2" },
//       { title: "Oppenheimer" },
//       { title: "Barbie" },
//     ],
//     xyz789: [
//       { title: "Guardians of the Galaxy Vol. 3" },
//       { title: "Spider-Man: Across the Spider-Verse" },
//     ],
//   };

//   // Check if the list exists
//   const userList = mockLocalStorage[listId];
//   if (!userList) {
//     return null; // Simulate no list found
//   }

//   return userList;
// }

// export default async function FinalizedListPage({ params }) {
//   const { id } = params;

//   // Fetch the user's finalized list using the listId
//   const userList = await fetchFinalizedList(id);

//   // If no list is found, redirect to /movies
//   if (!userList) {
//     redirect("/movies");
//   }

//   return (
//     <div className="p-6">
//       <h1 className="mb-6 text-3xl font-bold">Your Finalized Movie List</h1>
//       <ol className="list-decimal list-inside">
//         {userList.map((movie, index) => (
//           <li key={index} className="mb-2">
//             {movie.title}
//           </li>
//         ))}
//       </ol>
//       <button
//         onClick={() =>
//           navigator.clipboard.writeText(
//             `https://yourdomain.com/movies/userListId/${id}`
//           )
//         }
//         className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-800"
//       >
//         Copy Shareable Link
//       </button>
//     </div>
//   );
// }
