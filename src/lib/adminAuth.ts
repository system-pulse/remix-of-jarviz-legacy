const KEY = "jarviz_admin_session";
const EMAIL = "nawazuddin.nzz@gmail.com";
const PASSWORD = "nz@jarviztech";

export function adminLogin(email: string, password: string): boolean {
  if (email.trim().toLowerCase() === EMAIL && password === PASSWORD) {
    sessionStorage.setItem(KEY, "1");
    return true;
  }
  return false;
}

export function adminIsAuthed(): boolean {
  return sessionStorage.getItem(KEY) === "1";
}

export function adminLogout() {
  sessionStorage.removeItem(KEY);
}
