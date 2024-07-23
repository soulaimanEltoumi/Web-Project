import * as React from "react";
import MediaCard from "./MediaCard";

export default function ImgMediaCard() {
  const cardData = [
    {
      id: 1,
      image: "/images/url.png",
      name: "Mir",
      description: "dfjaklöfjaölk",
      github: "https://github.com/Mirmahas",
      linkedin: "https://www.linkedin.com/in/mirmahas/",
    },
    {
      id: 2,
      image: "/images/url.png",
      name: "Mirko",
      description: "dfjaklöfjaölk",
      github: "https://github.com/mirkoeffe",
      linkedin: "https://www.linkedin.com/in/mirko-fede/",
    },
    {
      id: 3,
      image: "/images/url.png",
      name: "Soulaiman",
      description: "dfjaklöfjaölk",
      github: "https://github.com/soulaimanEltoumi",
      linkedin: "https://www.linkedin.com/in/soulaiman-eltoumi/",
    },
  ];

  return (
    <div>
      {cardData.map((card, index) => (
        <MediaCard
          key={index}
          image={card.image}
          name={card.name}
          description={card.description}
          github={card.github}
          linkedin={card.linkedin}
        />
      ))}
    </div>
  );
}
