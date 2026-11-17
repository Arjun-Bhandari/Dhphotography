/** wa.me needs digits with a country code; a bare 10-digit number is assumed Indian. */
export function whatsappReplyLink(phone: string, name: string) {
  const digits = phone.replace(/\D/g, "");
  const full = digits.length === 10 ? `91${digits}` : digits.replace(/^0+/, "");
  const greeting = `Hi ${name.split(" ")[0]}, this is Puskar from Dh Photography. Thank you for your inquiry!`;
  return `https://wa.me/${full}?text=${encodeURIComponent(greeting)}`;
}
