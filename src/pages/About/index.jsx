import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="mx-auto w-3/4 text-center">
        <h1 className="my-5">About Us Page</h1>
        <p className="my-5 text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero,
          ducimus facere nisi illum commodi neque deleniti explicabo a incidunt,
          placeat quae exercitationem quasi laboriosam nam veniam nemo sit dicta
          natus, earum quos obcaecati officia ipsum. Dolor impedit nemo incidunt
          sequi voluptas! Officia nihil earum omnis. Voluptatibus magnam
          eligendi ipsum quod blanditiis necessitatibus quaerat consequuntur
          commodi delectus doloremque quasi quidem, quia sit nesciunt quos culpa
          natus praesentium sequi esse. Ratione magni dignissimos ducimus
          expedita, tenetur odit error eaque, deleniti sed fugiat ea? Fugit esse
          dolore iusto obcaecati nobis, repellendus dolor cum! Nulla nesciunt
          dolorem cumque laborum. Voluptas nesciunt adipisci deleniti voluptates
          nostrum dicta recusandae nam aliquid neque provident, officia a
          voluptatum sequi quibusdam. Sequi dolor labore dignissimos consequatur
          quaerat repudiandae blanditiis. Illum quae dolorum vel sunt quaerat,
          vero maxime. Maxime ab, esse incidunt tempora quo non quis. Quibusdam,
          magnam omnis sunt enim obcaecati at porro fuga dolores sit officia
          blanditiis sequi doloribus eveniet, aliquam tenetur. Ullam, iste
          dolorum veritatis reiciendis beatae nihil perspiciatis deserunt
          voluptatibus fugit explicabo ab earum provident error unde quidem
          vitae nulla. Sit tenetur aperiam nam velit vitae reprehenderit
          officia, totam excepturi exercitationem eaque veritatis laudantium cum
          iure et esse, quidem hic est a maiores voluptates eveniet dicta?
        </p>

        <button
          className="w-30 mb-5 h-8 rounded bg-blue-500 p-1"
          onClick={handleClick}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
