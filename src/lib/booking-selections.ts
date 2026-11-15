export type ElectricityChoice = "yes" | "no" | null;

export const hasElectricityAnswer = (required: boolean, choice: ElectricityChoice): boolean =>
  !required || choice === "yes" || choice === "no";