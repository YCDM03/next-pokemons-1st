import axios from "axios";
import React from "react";
import Image from "next/image";
import type { Pokemon } from "@/app/_types";
import Link from "next/link";

interface Props {
  params: { id: string };
}

async function PokemonDetail({ params }: Props) {
  const { id } = params;
  let illustrationNum: string = "";
  for (let i = 3; id.length <= i; i--) {
    if (id.length === i) {
      illustrationNum += id;
    } else {
      illustrationNum += 0;
    }
  }

  const loadData = async (): Promise<Pokemon> => {
    const response = await fetch(
      `https://next-pokemons-1st.vercel.app/api/pokemons/${id}`,
      {
        method: "GET",
      }
    );
    return response.json();
  };

  const data = await loadData();

  return (
    <div
      className={
        "bg-white px-10 w-6/12 max-h-5/6 min-w-80 mx-auto gap-2 rounded-xl flex flex-col justify-center items-center text-center box-border"
      }
    >
      <div>
        <h2 className={"mt-8 text-2xl font-semibold"}>{data.korean_name}</h2>
        <h3 className={"text-lg "}>No. {illustrationNum}</h3>
      </div>
      <Image
        src={data.sprites.front_default}
        alt={data.korean_name}
        width={96}
        height={96}
        priority
      />
      <h4 className={"font-semibold"}>이름: {data.korean_name}</h4>

      <h4 className={"font-semibold"}>
        <span>키: {+data.height / 10}m</span>
        <span>무게:{+data.weight / 10}kg</span>
      </h4>

      <h4 className={"font-semibold"}>
        <span>타입: </span>
        {data.types.map((type) => {
          return (
            <span
              className={"mr-1 p-1 rounded bg-orange-500 text-white"}
              key={data.id + type.type.korean_name}
            >
              {type.type.korean_name}
            </span>
          );
        })}
        <span>특성: </span>
        {data.abilities.map((ability) => {
          return (
            <span
              className={"mr-1 p-1 rounded bg-green-500 text-white"}
              key={data.id + ability.ability.korean_name}
            >
              {ability.ability.korean_name}
            </span>
          );
        })}
      </h4>

      <div className={"font-semibold max-h-96 flex flex-wrap overflow-auto"}>
        <h4 className={"w-full"}>기술: </h4>
        {data.moves.map((move) => {
          return (
            <div className={"mr-3"} key={move.move.korean_name}>
              {move.move.korean_name}
            </div>
          );
        })}
      </div>

      <Link
        className={
          "p-2 my-8 bg-blue-500 rounded-md text-white hover:opacity-95"
        }
        href={"/"}
      >
        뒤로 가기
      </Link>
    </div>
  );
}

export default PokemonDetail;
