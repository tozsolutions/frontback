export const CONSTANTS = {
  WHATSAPP_NUMBER: "905076561263",
  PHONE: "+90 536 773 14 04",
  EMAIL: "merhaba@tozyapi.com.tr",
};

export const LUNA_WHATSAPP_NUMBER = CONSTANTS.WHATSAPP_NUMBER;
export const LUNA_WHATSAPP_LINK = (message: string) =>
  `https://wa.me/${LUNA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;