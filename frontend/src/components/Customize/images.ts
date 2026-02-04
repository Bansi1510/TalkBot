import img1 from "../../assets/image1.png";
import img2 from "../../assets/image2.jpg";
import img3 from "../../assets/authBg.png";
import img4 from "../../assets/image4.png";
import img5 from "../../assets/image5.png";
import img6 from "../../assets/image6.jpeg";
import img7 from "../../assets/image7.jpeg";
export interface AppImage {
  id: number;
  src: string;
  alt: string;
}

export const images: AppImage[] = [
  {
    id: 1,
    src: img1,
    alt: "image one",
  },
  {
    id: 2,
    src: img2,
    alt: "image two",
  },
  {
    id: 3,
    src: img3,
    alt: "image three",
  },
  {
    id: 4,
    src: img4,
    alt: "image four",
  },
  {
    id: 5,
    src: img5,
    alt: "image five",
  },
  {
    id: 6,
    src: img6,
    alt: "image six",
  },
  {
    id: 7,
    src: img7,
    alt: "image seven",
  },
];