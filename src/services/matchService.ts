import { jsonServer } from "./api";

export interface IMatch {
  id: 1;
  name: "Richard Hendricks";
  url: "./dog.png";
  age: 35;
  race: "Bichon frisé";
  distance: 2;
  like: false;
  match: false;
  updated_at: number;
}

export async function getPetsList(): Promise<IMatch[]> {
  const response = await jsonServer.get("/pets");
  return response.data;
}

export async function getLikes(): Promise<IMatch[]> {
  const response = await jsonServer.get("/pets");
  return response.data.filter((pet: IMatch) => pet.like && !pet.match);
}

export async function getMatches(): Promise<IMatch[]> {
  const response = await jsonServer.get("/pets");
  return response.data
    .filter((pet: IMatch) => pet.like && pet.match)
    .sort((a: IMatch, b: IMatch) => (a.updated_at > b.updated_at ? 1 : -1));
}

export async function removePet(id: number) {
  await jsonServer.delete(`/pets/${id}`);
}

export async function likeBack(id: number) {
  await jsonServer.patch(`/pets/${id}`, {
    match: true,
    updated_at: new Date().getTime(),
  });
}
