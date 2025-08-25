import { FadeLoader } from "react-spinners";

// app/loading.tsx
export default function Loading() {
  return (
      <FadeLoader className="mx-auto mt-28"
  color="#b31e1e"
  cssOverride={{}}
  height={20}
  loading
  margin={2}
  radius={2}
  speedMultiplier={1}
  width={5}
/>
  )
}
