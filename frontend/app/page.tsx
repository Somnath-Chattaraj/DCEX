import Image from "next/image";
import { Hero } from "./components/Hero";
import { Provider } from "./Provider";

export default function Home() {
  return (
    <Provider>

    <main>
      <Hero />
    </main>
    </Provider>
  )
}
