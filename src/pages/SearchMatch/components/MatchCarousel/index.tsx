import { createRef, useEffect, useMemo, useState } from "react";
import TinderCard from "react-tinder-card";
import { MatchButton } from "../../../../components/MatchButton";
import { FcCheckmark } from "react-icons/fc";
import { BsReplyFill } from "react-icons/bs";
import { RiMapPinLine } from "react-icons/ri";

import {
  Card,
  CardContainer,
  Details,
  Race,
  Stamp,
  ContainerButtonMatch,
  ContainerReply,
  CarouselContainer,
  Distance,
} from "./styles";
import { getPetsList, IMatch } from "../../../../services/matchService";

enum DIRECTION_TYPES {
  right = "right",
  left = "left",
  up = "up",
  down = "down",
}

const swipeActions = {
  [DIRECTION_TYPES.left]: () => {
    console.log("left");
  },
  [DIRECTION_TYPES.right]: () => {
    console.log("right");
  },
  [DIRECTION_TYPES.up]: () => {
    console.log("up");
  },
  [DIRECTION_TYPES.down]: () => {
    console.log("down");
  },
};

type directionType = keyof typeof DIRECTION_TYPES;

export function MatchCarousel() {
  const [usersState, setUsersState] = useState([] as IMatch[]);
  const childRefs: any = useMemo(
    () =>
      Array(usersState.length)
        .fill(0)
        .map(() => createRef()),
    [usersState.length],
  );

  useEffect(() => {
    getPetsList().then((response) => setUsersState(response));
  }, []);

  const currentIndex = usersState.length - 1;
  const nextIndex = usersState.length - 2;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: directionType) => {
    const lastUserId = usersState[currentIndex].id;

    setUsersState((state) => state.filter((user) => user.id !== lastUserId));

    swipeActions[direction]();
  };

  const swipe = (dir: string) => {
    if (canSwipe) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  return (
    <CarouselContainer>
      <CardContainer>
        {usersState.map((user, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={user.id}
            onSwipe={(dir) => swiped(dir)}
          >
            <Card
              img={user.url}
              isShowing={index === currentIndex}
              nextToShow={index === nextIndex}
            >
              <img src={user.url} alt="" />
              <Distance isShowing={index === currentIndex}>
                <RiMapPinLine /> {user.distance} km
              </Distance>
              <Details isShowing={index === currentIndex}>
                <div>
                  <h6>{user.name.split(" ")[0]},</h6> <b>{user.age} meses</b>
                  <Race>
                    <span>{user.race}</span>
                  </Race>
                </div>
                <Stamp>
                  <FcCheckmark size={17} />
                </Stamp>
              </Details>
            </Card>
          </TinderCard>
        ))}
      </CardContainer>

      <ContainerButtonMatch>
        <MatchButton onClick={() => swipe(DIRECTION_TYPES.left)} buttonType="deslike" />
        <ContainerReply>
          <BsReplyFill />
          <BsReplyFill />
        </ContainerReply>
        <MatchButton onClick={() => swipe(DIRECTION_TYPES.right)} buttonType="like" />
      </ContainerButtonMatch>
    </CarouselContainer>
  );
}
