import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Eye, ImageIcon } from "lucide-react";

const TAT_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=400&h=300&fit=crop",
    alt: "Person sitting alone looking out window",
    prompt: "Take a moment to look at this image. What do you think is happening? What might this person be feeling or thinking?"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop",
    alt: "Two people in conversation",
    prompt: "Look at this scene. What story do you see unfolding? What emotions might be present?"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    alt: "Person at desk with papers",
    prompt: "Observe this image carefully. What do you imagine is going through this person's mind? What led to this moment?"
  }
];

export default function TATImage({ imageIndex = 0, onImageLoad }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const image = TAT_IMAGES[imageIndex % TAT_IMAGES.length];

  const handleLoad = () => {
    setIsLoaded(true);
 