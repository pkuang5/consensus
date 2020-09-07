import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import database from "../firebase"

import Card from "./Card";

import "../styles/Deck.css";

// function updateVote(groupCode, id, increment) {
//   database
//     .ref(`groups/${groupCode}/${id}`)
//     .transaction(function (vote) {
//       return (vote || 0) + increment;
//     });
// }

const to = i => ({
  x: 0,
  y: i * -10,
  scale: 1,
  rot: 0,
  delay: i * 100
});
const from = i => ({ rot: 0, scale: 1.5, y: -1000 });

const trans = (r, s) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props) {
  const [gone] = useState(() => new Set());

  const [cards, set] = useSprings(props.data.length, i => ({
    ...to(i),
    from: from(i)
  }));

  const bind = useGesture(
    ({
      args: [index],
      down,
      delta: [xDelta],
      distance,
      direction: [xDir],
      velocity
    }) => {

      const trigger = velocity > 0.2;

      const dir = xDir < 0 ? -1 : 1;

      if (!down && trigger) gone.add(index);

      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);
        
        if (isGone){
          // updateVote(props.groupCode, props.data[index].id, dir)
        }
        const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0;

        const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);

        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 }
        };
      }); 


      if (!down && gone.size === props.data.length)
        setTimeout(() => gone.clear() || set(i => to(i)), 600);
    }
  );

  return(
    <div class="deck">
      {cards.map(({ x, y, rot, scale }, i) => (
        <Card
          key={i}
          i={i}
          x={x}
          y={y}
          rot={rot}
          scale={scale}
          trans={trans}
          data={props.data}
          bind={bind}
        />
      ))}
    </div>
  ) 
}

export default Deck;
