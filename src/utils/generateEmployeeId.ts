export const generateEmployeeId = (dept: string, count: number): string => {
  const prefix = dept.slice(0, 3).toUpperCase();
  const sequence = String(count + 1).padStart(3, '0');
  return `${prefix}-${sequence}`;
};
