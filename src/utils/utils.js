export const initPhone = (phone) => {
  return phone = phone.substr(0, 3) + 'XXXX' + phone.substr(phone.length - 4);
};
