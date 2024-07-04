import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

const TOTAL_POKEMON = 151;
const PAGE_SIZE = 20;

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const offset = (page - 1) * PAGE_SIZE;
  const filterdLength =
    offset + PAGE_SIZE > TOTAL_POKEMON ? TOTAL_POKEMON - offset : PAGE_SIZE;

  try {
    const allPokemonPromises = Array.from(
      {
        length: filterdLength,
      },
      (_, index) => {
        const id = index + 1 + offset;

        return Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
      }
    );

    const allPokemonResponses = await Promise.all(allPokemonPromises);

    const allPokemonData = allPokemonResponses.map(
      ([response, speciesResponse]) => {
        const koreanName = speciesResponse.data.names.find(
          (name: any) => name.language.name === "ko"
        );
        return { ...response.data, korean_name: koreanName?.name || null };
      }
    );

    return NextResponse.json(allPokemonData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
