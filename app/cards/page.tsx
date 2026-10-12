import { Suspense } from "react";
import CardsClient from "@/components/CardsClient";

export default function CardsPage() {
  return (
    <Suspense fallback={null}>
      <CardsClient />
    </Suspense>
  );
}
