import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import PokemonDetail from "@/components/PokemonDetail";

interface Props {
  params: { id: string };
}

async function Detail({ params }: Props) {
  return <PokemonDetail params={params} />;
}

export default Detail;
