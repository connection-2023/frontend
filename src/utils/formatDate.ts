const formatDate = (dateString: string) => {
  if (/^\d{2}\.\d{2}\.\d{2}$/.test(dateString)) {
    return dateString;
  }

  const date = new Date(dateString);
  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
  return formattedDate;
};

export default formatDate;
