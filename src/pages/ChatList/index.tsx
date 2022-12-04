import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { GreenTitle } from "../../components/GreenTitle";
import { NavBar } from "../../components/NavBar";
import { getMatches, IMatch } from "../../services/matchService";
import { defaultTheme } from "../../styles/themes/default";
import { ListItem } from "./components/ListItem";
import { Container, ContainerText, Filter } from "./styles";

export function ChatList() {
  const [list, setList] = useState([] as IMatch[]);
  const [filter, setFilter] = useState("");
  const messageInfoMock = [
    { time: "23 min", counter: 1, message: "amei 😍", yours: false, typing: false },
    { time: "55 min", counter: 2, message: "", yours: false, typing: true },
    { time: "60 min", counter: 0, message: "kkkkk", yours: true, typing: false },
  ];

  useEffect(() => {
    getMatches().then((response) => setList(response));
  }, []);

  return (
    <Container>
      <ContainerText>
        <GreenTitle>Chat</GreenTitle>
      </ContainerText>

      <Filter>
        <label htmlFor="filter">
          <BiSearchAlt size={22} color={defaultTheme.green500} />
        </label>
        <input
          id="filter"
          type="search"
          placeholder="Buscar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Filter>

      {list
        .filter((pet) => pet.name.toLowerCase().includes(filter.toLowerCase()))
        .map((pet, index) => (
          <ListItem
            key={pet.id}
            messageInfo={
              messageInfoMock[index] || {
                time: "03 nov",
                counter: 0,
                message: "",
                yours: false,
                typing: false,
              }
            }
            pet={pet}
          />
        ))}
      <NavBar />
    </Container>
  );
}
