function NonRedirectedAuthentication() {
  const isAuthed = true;

  if (!isAuthed) {
    return '<Login />';
  }

  if (!isAuthed) {
    return;
  }

  return '<Outlet />';
}
