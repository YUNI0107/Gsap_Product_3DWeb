export const rescale = (
  input: number,
  minInput: number,
  maxInput: number,
  minOutput: number,
  maxOutput: number,
) => {
  if (input < minInput) {
    return minOutput
  }
  return (
    ((input - minInput) / (maxInput - minInput)) * (maxOutput - minOutput) +
    minOutput
  )
}
