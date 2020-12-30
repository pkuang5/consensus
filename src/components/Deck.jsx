import React, { useState, useEffect } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import database from "../firebase"

import Card from "./Card";

import "../styles/Deck.css";

const to = i => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100
});

const trans = (r, s) =>
  `perspective(1500px) rotateX(0deg) rotateY(${r /
  10}deg) rotateZ(${r}deg) scale(${s})`;

function Deck(props) {
  const [gone] = useState(() => new Set())
  const [swiping] = useState(() => new Set())

  const updateVote = (groupCode, id, increment) => {
    var lastCard = localStorage.getItem('lastCard'+props.groupCode)
    localStorage.setItem("lastCard"+props.groupCode,parseInt(lastCard) + 1)
    database
    .ref(`groups/${groupCode}/data/${id}/vote`)
    .transaction(function (vote) {
      if (increment == 1) return (vote || 0) + increment;
    });
  }

  const [cards, set] = useSprings(props.data.length, i => ({
    ...to(i),
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

      if (!down && trigger) gone.add(index)


      set(i => {
        if (index !== i) return;
        const isGone = gone.has(index);
        if (!isGone) swiping.add(1)
        if (isGone && swiping.has(1)) {
          swiping.delete(1)
          props.setProgressPercentage((props.data.length + props.progress - index) / (props.data.length + props.progress) * 100)
          updateVote(props.groupCode, props.data[index].id, dir)
          // flash background color to indiciate upvote or downvote ??
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

      if (!down && gone.size === props.data.length) {
        props.setFinished(true)
      }
        
    }
  );

  return (
    <div id="deck" class="deck">
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
