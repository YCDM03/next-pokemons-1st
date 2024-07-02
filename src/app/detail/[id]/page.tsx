import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import PokemonDetail from "@/components/PokemonDetail";

async function Detail({ params }: Params) {
  return <PokemonDetail params={params} />;
}

export default Detail;
