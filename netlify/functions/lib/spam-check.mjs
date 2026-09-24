// Shared honeypot check for the lead-notification functions. Each public
// booking widget carries a visually-hidden "bot-field" input (real visitors
// never see or fill it); a submission with it filled in is a bot, since
// these widgets post via fetch() rather than a native form submission, so
// Netlify Forms' own honeypot handling never runs for them.
export function isHoneypotFilled(raw) {
  return Boolean(raw?.['bot-field']);
}
