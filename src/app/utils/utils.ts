export const uniqueID = (): string => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

export const getBorrowStatusInPolish = (status: string): string => {
  if (status === 'On borrow') {
    return 'Wypożyczona';
  }
  if (status === 'Returned') {
    return 'Zwrócona';
  }
  if (status === 'Overkept') {
    return 'Przetrzymana';
  }
  if (status === 'Reservation') {
    return 'Zarezerwowana';
  }
  return '';
};

export const getCopyStatusInPolish = (status: string): string => {
  if (status === 'Disposed') {
    return 'Usunięta';
  }
  if (status === 'Loaned') {
    return 'Wypożyczona';
  }
  if (status === 'Available') {
    return 'Dostępna';
  }

  return '';
};

export const prepareParams = (
  params: Record<string, any> | undefined
): Record<string, any> => {
  const response: Record<string, any> = {};
  if (params) {
    Object.keys(params).forEach((key: string) => {
      if (
        params[key] !== '' &&
        params[key] !== null &&
        params[key] !== undefined
      ) {
        response[key] = params[key];
      }
    });
  }
  return response;
};
