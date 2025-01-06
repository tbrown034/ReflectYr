// import { auth } from "@/auth";
// import LoggedInList from "./LoggedInList";
// import LoggedOutList from "./LoggedOutList";

// export default async function TemporaryList({ params }) {
//   // Extract userId and listId from route params
//   const { userId, listId } = params;

//   // Check if the user is signed in
//   const session = await auth();

//   // Render either LoggedInList or LoggedOutList based on authentication
//   if (session?.user) {
//     return (
//       <div>
//         <LoggedInList
//           userId={session.user.id} // Use the logged-in user's ID
//           listId={listId}
//         />
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <LoggedOutList userId={userId} listId={listId} />
//       </div>
//     );
//   }
// }
