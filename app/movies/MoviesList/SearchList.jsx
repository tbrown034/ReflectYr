// import AddToListButton from "@/app/UI/components/AddToListButton";
// import Link from "next/link";
// import Image from "next/image";

// export default function SearchList({ movies, userList, addToUserList }) {
//   return (
//     <ul className="space-y-4">
//       {movies.map((movie) => {
//         const isInUserList = userList.some((m) => m.id === movie.id);

//         return (
//           <li
//             key={movie.id}
//             className="flex items-center justify-between p-4 transition-all duration-200 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700"
//           >
//             {/* Clickable Movie Link */}
//             <Link
//               href={`/movies/${movie.id}`}
//               className="flex items-center flex-1 gap-4"
//             >
//               {/* Poster and Title */}
//               <div className="flex items-center gap-4">
//                 {/* Poster */}
//                 <Image
//                   src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                   alt={movie.title}
//                   width={80}
//                   height={120}
//                   className="rounded-md shadow-md"
//                 />

//                 {/* Movie Title */}
//                 <p
//                   className={`text-sm sm:text-lg font-semibold transition ${
//                     isInUserList
//                       ? "line-through decoration-[3px] decoration-amber-500"
//                       : "text-gray-900 hover:text-amber-500 dark:text-gray-100 dark:hover:text-amber-400"
//                   }`}
//                 >
//                   {movie.title}
//                 </p>
//               </div>
//             </Link>

//             {/* Add/Added Button */}
//             <AddToListButton
//               movie={movie}
//               onAdd={() => addToUserList(movie)}
//               disabled={isInUserList}
//               className="flex-shrink-0"
//               onClick={(e) => e.stopPropagation()} // Prevents link navigation
//             />
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
