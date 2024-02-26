const formatDate = (dateString: string, includeTime = false) => {
  const formatTest = includeTime
    ? /^\d{2}\.\d{2}\.\d{2} \d{2}:\d{2}$/
    : /^\d{2}\.\d{2}\.\d{2}$/;

  if (formatTest.test(dateString)) {
    return dateString;
  }

  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.hour12 = false;
  }

  let formattedDate = date
    .toLocaleString('ko-KR', options)
    .replace(/\. /g, '.')
    .replace(/: /g, ':')
    .replace(/\.$/, '');

  if (includeTime) {
    formattedDate = formattedDate.replace(/\.(?=[^\.]*$)/, ' ');
  }

  return formattedDate;
};

export default formatDate;
