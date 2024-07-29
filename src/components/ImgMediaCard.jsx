import * as React from "react";
import MediaCard from "./MediaCard";

export default function ImgMediaCard() {
  const cardData = [
    {
      id: 1,
      image: "/images/url.png",
      name: "Mir",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus facilis blanditiis amet in, esse cum fugit omnis deserunt repudiandae quisquam porro pariatur vel ab ex. Quam quod quasi pariatur, necessitatibus non nihil illum, dolorum molestiae dolorem reiciendis cupiditate aliquid beatae sit aut sunt, cumque quae quis reprehenderit saepe possimus! Ipsum.",
      github: "https://github.com/Mirmahas",
      linkedin: "https://www.linkedin.com/in/mirmahas/",
    },
    {
      id: 2,
      image: "../src/assets/mirko.jpg",
      name: "Mirko",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus facilis blanditiis amet in, esse cum fugit omnis deserunt repudiandae quisquam porro pariatur vel ab ex. Quam quod quasi pariatur, necessitatibus non nihil illum, dolorum molestiae dolorem reiciendis cupiditate aliquid beatae sit aut sunt, cumque quae quis reprehenderit saepe possimus! Ipsum.",
      github: "https://github.com/mirkoeffe",
      linkedin: "https://www.linkedin.com/in/mirko-fede/",
    },
    {
      id: 3,
      image: "../src/assets/img1.jpg",
      name: "Soulaiman",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus facilis blanditiis amet in, esse cum fugit omnis deserunt repudiandae quisquam porro pariatur vel ab ex. Quam quod quasi pariatur, necessitatibus non nihil illum, dolorum molestiae dolorem reiciendis cupiditate aliquid beatae sit aut sunt, cumque quae quis reprehenderit saepe possimus! Ipsum.",
      github: "https://github.com/soulaimanEltoumi",
      linkedin: "https://www.linkedin.com/in/soulaiman-eltoumi/",
    },
  ];

  return (
    <>
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
    </>
  );
}
