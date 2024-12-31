
export function setCountPage(totalPages: number, currentPage: number) {
  if (!totalPages && !currentPage) return [];

  let pages = []
  let start = currentPage
  if (currentPage == totalPages) {
    start = currentPage - 3
  }
  else if (currentPage == (totalPages-1)) {
    start = currentPage - 2
  }
  else if (currentPage == 2) {
    start = currentPage - 0
  }
  else if (currentPage != 1) {
    start = currentPage - 1
  }
  let max = start + 3
  if (max > totalPages) {
    max = totalPages
  }
  if (start < 1) {
    start = 1
  }

  for(var i=start; i <= max; i++) {
    pages.push(i);
  }
  return pages
}

export const validateEmail = (email: string) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export function fGetDate(data?: string) {
  if (!data) return '';
  const splits = data.split('-');
  return `${splits[2]}-${splits[1]}-${splits[0]}`;
}
