export const getUsernameCriteria = (username: string) => [
  { 
    label: "Length 4–20 Characters", 
    valid: username.length >= 4 && username.length <= 20 
  },
  { 
    label: "Lowercase, numbers, or underscore", 
    valid: username.length > 0 && /^[a-z0-9_]+$/.test(username) 
  },
  { 
    label: "No spaces or special symbols", 
    valid: username.length > 0 && !/[^a-z0-9_]/.test(username) 
  },
  { 
    label: "No uppercase letters", 
    valid: username.length > 0 && !/[A-Z]/.test(username) 
  },
];

export const getCriteria = (password: string) => [
  { label: "Min. 12 Character", valid: password.length >= 12 },
  { label: "Min. 1 Uppercase (A-Z)", valid: /[A-Z]/.test(password) },
  { label: "Min. 1 Lowercase (a-z)", valid: /[a-z]/.test(password) },
  { label: "Min. 1 Number (0-9)", valid: /[0-9]/.test(password) },
  { label: "Min. 1 Symbol (@$!%*?&#_)", valid: /[@$!%*?&#_]/.test(password) },
];