export default function getGuestUserId() {
  let userId = localStorage.getItem("guestUserId");

  if (!userId) {
    // Generate a random unique guest ID
    userId = `guest-${Math.random().toString(36).substring(2, 12)}`;
    localStorage.setItem("guestUserId", userId);
  }

  return userId;
}
