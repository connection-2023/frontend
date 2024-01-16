import sanitizeHtml from 'sanitize-html';

export const sanitizeHtmlString = (html: string) => {
  const cleanHtml = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'span',
      'img',
      'div',
      'figure',
      'iframe',
    ]),
    allowedAttributes: {
      '*': ['style', 'class'],
      span: ['style'],
      img: [
        'src',
        'alt',
        'data-rotate',
        'data-proportion',
        'data-size',
        'data-align',
        'data-percentage',
        'data-file-name',
        'data-file-size',
        'data-origin',
        'style',
      ],
      iframe: [
        'src',
        'data-proportion',
        'data-percentage',
        'data-size',
        'data-align',
        'data-file-name',
        'data-file-size',
        'data-origin',
        'style',
      ],
    },
  });

  return cleanHtml;
};
