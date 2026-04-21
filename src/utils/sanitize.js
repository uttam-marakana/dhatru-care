import DOMPurify from 'dompurify'

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeHtml = (dirty) => {
  if (!dirty) return ''
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
    ALLOWED_ATTR: ['href', 'target']
  })
}

/**
 * Sanitize plain text input
 */
export const sanitizeText = (input) => {
  if (!input) return ''
  return input
    .replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '')
    .replace(/on\\w+\\s*=/gi, '')
    .replace(/javascript\\s*:/gi, '')
    .trim()
}

/**
 * Sanitize search query
 */
export const sanitizeSearch = (query) => {
  if (!query) return ''
  return sanitizeText(query).substring(0, 100)
}

export default { sanitizeHtml, sanitizeText, sanitizeSearch }

