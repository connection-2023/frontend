import sanitizeHtml from 'sanitize-html';

export const sanitizeHtmlString = (html: string) => {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    allowedAttributes: {
      span: ['style'],
    },
  });

  return cleanHtml;
};
