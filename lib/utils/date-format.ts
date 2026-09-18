export function formatVotingDate(
  date?: string | null
) {

  if (!date) {
    return "N/A";
  }


  return new Intl.DateTimeFormat(
    "en-PH",
    {
      dateStyle: "long",
      timeStyle: "short",
      hour12: true,
      timeZone: "Asia/Manila",
    }
  )
  .format(
    new Date(date)
  );

}