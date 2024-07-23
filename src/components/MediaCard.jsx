// MediaCard.jsx
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaGithubSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function MediaCard({
  name,
  image,
  description,
  github,
  linkedin,
}) {
  return (
    <Card sx={{ maxWidth: 345, margin: 5 }}>
      <CardMedia component="img" alt={name} height="140" image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <FaGithubSquare className="h-8" />
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="ml-2 h-8" />
        </a>
      </CardActions>
    </Card>
  );
}
