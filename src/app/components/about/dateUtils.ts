const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

export const formatDateRange = (
  startDate?: string | null,
  endDate?: string | null
): string => {
  if (!startDate) {
    return "";
  }

  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;

  if (Number.isNaN(start.getTime())) {
    return "";
  }

  const startLabel = dateFormatter.format(start);
  const endLabel =
    end && !Number.isNaN(end.getTime()) ? dateFormatter.format(end) : "Present";

  return `${startLabel} — ${endLabel}`;
};
